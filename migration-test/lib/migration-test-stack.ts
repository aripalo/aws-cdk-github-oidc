import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import {
  GithubActionsIdentityProvider,
  GithubActionsRole,
  IGithubActionsIdentityProvider,
} from "aws-cdk-github-oidc";
import { Construct } from "constructs";

type MigrationPhase = "v2" | "v3-retain" | "v4-lookup" | "v4-import";

function isMigrationPhase(value: string): value is MigrationPhase {
  return (
    value === "v2" ||
    value === "v3-retain" ||
    value === "v4-lookup" ||
    value === "v4-import"
  );
}

function resolvePhase(): MigrationPhase {
  const phase = process.env.MIGRATION_PHASE ?? "v2";
  if (isMigrationPhase(phase)) {
    return phase;
  }
  throw new Error(
    `Invalid MIGRATION_PHASE="${phase}". Valid values: v2, v3-retain, v4-lookup, v4-import.`,
  );
}

function createProvider(
  scope: Construct,
  phase: MigrationPhase,
): IGithubActionsIdentityProvider {
  if (phase === "v4-lookup") {
    return GithubActionsIdentityProvider.fromAccount(
      scope,
      "GithubProviderReference",
    );
  }

  const shouldRetain = phase === "v3-retain" || phase === "v4-import";
  const ProviderCtor = GithubActionsIdentityProvider as unknown as new (
    scope: Construct,
    id: string,
    props?: { removalPolicy?: cdk.RemovalPolicy },
  ) => IGithubActionsIdentityProvider;
  return new ProviderCtor(scope, "GithubProvider", {
    removalPolicy: shouldRetain ? cdk.RemovalPolicy.RETAIN : undefined,
  });
}

export class MigrationTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const phase = resolvePhase();
    const provider = createProvider(this, phase);

    new GithubActionsRole(this, "GithubActionsRole", {
      provider,
      owner: "octo-org",
      repo: "octo-repo",
      filter: "ref:refs/heads/main",
      roleName: "migration-test-github-actions-role",
      description: "Role for validating aws-cdk-github-oidc migration flow",
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("ReadOnlyAccess"),
      ],
    });

    new cdk.CfnOutput(this, "MigrationPhase", { value: phase });
    new cdk.CfnOutput(this, "ProviderArn", {
      value: `arn:${cdk.Aws.PARTITION}:iam::${cdk.Aws.ACCOUNT_ID}:oidc-provider/${GithubActionsIdentityProvider.issuer}`,
    });
  }
}
