import { Construct } from "constructs";

const packageName = "aws-cdk-github-oidc";

const featureNames = ["compatibilityV4"] as const;

export type FeatureName = (typeof featureNames)[number];

function contextKey(featureName: FeatureName): string {
  return `${packageName}:${featureName}`;
}

export function is(scope: Construct, featureName: FeatureName): boolean {
  return scope.node.tryGetContext(contextKey(featureName)) === true;
}
