import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import {
  GithubActionsIdentityProvider,
  GithubActionsRole,
} from "../src";

class GithubOidcProviderStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const provider = new GithubActionsIdentityProvider(this, "GithubProvider");
    const resource = provider.node.defaultChild as cdk.CfnResource;

    new cdk.CfnOutput(this, "OidcProviderName", {
      value: GithubActionsIdentityProvider.issuer,
    });

    new cdk.CfnOutput(this, "OidcProviderLogicalId", {
      value: this.getLogicalId(resource),
    });
  }
}

class GithubOidcRoleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const provider = GithubActionsIdentityProvider.fromAccount(
      this,
      "GithubProvider",
    );

    new GithubActionsRole(this, "GithubActionsRole", {
      provider,
      owner: "octo-org",
      repo: "octo-repo",
      filter: "ref:refs/heads/main",
      roleName: "github-oidc-example-role",
      description: "Example role assumed by GitHub Actions via OIDC",
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("ReadOnlyAccess"),
      ],
    });
  }
}

const app = new cdk.App();
const providerStack = new GithubOidcProviderStack(app, "GithubOidcProviderStack");
const roleStack = new GithubOidcRoleStack(app, "GithubOidcRoleStack");

roleStack.addDependency(providerStack);
