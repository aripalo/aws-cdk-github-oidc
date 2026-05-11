import * as cdk from "aws-cdk-lib";
import { is } from "../src/feature-flags";

const featureFlagKey = "aws-cdk-github-oidc:compatibilityV4";

test("Feature flags default to false when missing", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);

  expect(is(stack, "compatibilityV4")).toBe(false);
});

test("Feature flags resolve true only for explicit true", () => {
  const app = new cdk.App({
    context: {
      [featureFlagKey]: true,
    },
  });
  const stack = new cdk.Stack(app);

  expect(is(stack, "compatibilityV4")).toBe(true);
});

test("Feature flags resolve false for explicit false", () => {
  const app = new cdk.App({
    context: {
      [featureFlagKey]: false,
    },
  });
  const stack = new cdk.Stack(app);

  expect(is(stack, "compatibilityV4")).toBe(false);
});

test("Feature flags resolve false for non-true values", () => {
  const app = new cdk.App({
    context: {
      [featureFlagKey]: "true",
    },
  });
  const stack = new cdk.Stack(app);

  expect(is(stack, "compatibilityV4")).toBe(false);
});
