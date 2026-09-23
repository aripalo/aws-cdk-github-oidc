/// !cdk-integ STACK GithubOidcIntegStack

import { RequireApproval } from "@aws-cdk/cloud-assembly-schema/lib/integ-tests/commands/common";
import { ExpectedResult, IntegTest, Match } from "@aws-cdk/integ-tests-alpha";
import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { GithubActionsIdentityProvider, GithubActionsRole } from "../src";

const region = "us-east-1";
const roleName = "github-oidc-integ-role";
const roleDescription = "Integration test role for GitHub Actions OIDC";
const providerArn = `arn:${cdk.Aws.PARTITION}:iam::${cdk.Aws.ACCOUNT_ID}:oidc-provider/${GithubActionsIdentityProvider.issuer}`;
const roleArn = `arn:${cdk.Aws.PARTITION}:iam::${cdk.Aws.ACCOUNT_ID}:role/${roleName}`;

class GithubOidcIntegStack extends cdk.Stack {
  public readonly provider: GithubActionsIdentityProvider;
  public readonly role: GithubActionsRole;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.provider = new GithubActionsIdentityProvider(this, "GithubProvider");
    this.role = new GithubActionsRole(this, "GithubActionsRole", {
      provider: this.provider,
      owner: "octo-org",
      repo: "octo-repo",
      filter: "ref:refs/heads/main",
      roleName,
      description: roleDescription,
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("ReadOnlyAccess"),
      ],
    });
  }
}

const app = new cdk.App();
const stack = new GithubOidcIntegStack(app, "GithubOidcIntegStack");
const assertionStack = new cdk.Stack(app, "GithubOidcAssertionsStack");

const integ = new IntegTest(app, "GithubOidcInteg", {
  testCases: [stack],
  assertionStack,
  regions: [region],
  cdkCommandOptions: {
    deploy: {
      args: {
        requireApproval: RequireApproval.NEVER,
      },
    },
    destroy: {
      args: {
        force: true,
      },
    },
  },
});

integ.assertions
  .awsApiCall("IAM", "getOpenIDConnectProvider", {
    OpenIDConnectProviderArn: providerArn,
  })
  .expect(
    ExpectedResult.objectLike({
      Url: GithubActionsIdentityProvider.issuer,
      ClientIDList: Match.arrayWith(["sts.amazonaws.com"]),
    }),
  )
  .next(
    integ.assertions
      .awsApiCall("IAM", "getRole", {
        RoleName: roleName,
      })
      .expect(
        ExpectedResult.objectLike({
          Role: Match.objectLike({
            Arn: roleArn,
            Description: roleDescription,
          }),
        }),
      ),
  )
  .next(
    integ.assertions
      .awsApiCall("IAM", "listAttachedRolePolicies", {
        RoleName: roleName,
      })
      .expect(
        ExpectedResult.objectLike({
          AttachedPolicies: Match.arrayWith([
            Match.objectLike({
              PolicyName: "ReadOnlyAccess",
            }),
          ]),
        }),
      ),
  );
