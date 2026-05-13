import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { GithubActionsIdentityProvider } from "../src/provider";

const providerArnRegexp =
  /^arn:aws:iam::\$\{Token\[.+\]\}:oidc-provider\/token\.actions\.githubusercontent\.com$/i;

test("New Provider", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new GithubActionsIdentityProvider(stack, "GithubProvider");
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::IAM::OIDCProvider", {
    ClientIdList: ["sts.amazonaws.com"],
    Url: "https://token.actions.githubusercontent.com",
  });
});

test("Provider honors removalPolicy prop", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new GithubActionsIdentityProvider(stack, "GithubProvider", {
    removalPolicy: cdk.RemovalPolicy.RETAIN,
  });
  const template = Template.fromStack(stack);

  template.hasResource("AWS::IAM::OIDCProvider", {
    DeletionPolicy: "Retain",
    UpdateReplacePolicy: "Retain",
  });
});

test("Existing Provider", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(
    stack,
    "GithubProvider",
  );

  expect(provider.oidcProviderIssuer).toBe(
    "token.actions.githubusercontent.com",
  );
  expect(provider.oidcProviderArn).toMatch(providerArnRegexp);
});
