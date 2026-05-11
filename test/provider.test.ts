import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { GithubActionsIdentityProvider } from "../src/provider";

const providerArnRegexp =
  /^arn:aws:iam::\$\{Token\[.+\]\}:oidc-provider\/token\.actions\.githubusercontent\.com$/i;
const legacyLogicalId = "GithubProvider1CDE27EB";
const nativeLogicalId = `Native${legacyLogicalId}`;

test("New Provider", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new GithubActionsIdentityProvider(stack, "GithubProvider");
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::IAM::OIDCProvider", {
    ClientIdList: ["sts.amazonaws.com"],
    Url: "https://token.actions.githubusercontent.com",
  });

  expect(template.toJSON().Resources[nativeLogicalId]).toBeDefined();
  expect(template.toJSON().Resources[legacyLogicalId]).toBeUndefined();
});

test("New Provider keeps legacy logical id when feature flag is enabled", () => {
  const app = new cdk.App({
    context: {
      "aws-cdk-github-oidc:compatibilityV4": true,
    },
  });
  const stack = new cdk.Stack(app);
  new GithubActionsIdentityProvider(stack, "GithubProvider");
  const template = Template.fromStack(stack);

  expect(template.toJSON().Resources[legacyLogicalId]).toBeDefined();
  expect(template.toJSON().Resources[nativeLogicalId]).toBeUndefined();
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
