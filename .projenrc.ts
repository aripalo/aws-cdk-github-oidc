import { AlmaCdkConstructLibrary } from "@alma-cdk/construct-library";
import { cdk } from "projen";

const project = new AlmaCdkConstructLibrary({
  name: "aws-cdk-github-oidc",
  author: "Ari Palo",
  authorOrganization: false,
  authorAddress: "opensource@aripalo.com",
  description:
    "CDK constructs to use OpenID Connect for authenticating your Github Action workflow with AWS IAM",
  repositoryUrl: "https://github.com/aripalo/aws-cdk-github-oidc.git",
  keywords: [
    "cdk",
    "aws-cdk",
    "awscdk",
    "aws",
    "iam",
    "github",
    "github-actions",
    "oidc",
    "openid-connect",
  ],
  stability: cdk.Stability.EXPERIMENTAL, // or STABLE or DEPRECATED
  majorVersion: 3,
  releaseEnvironment: "production",
  pnpmSettings: {
    trustPolicyExclude: ["jsii@5.9.35"],
    onlyBuiltDependencies: ["lefthook", "esbuild"],
  },
  releaseBranches: {
    v3: {
      majorVersion: 3,
      environment: "production",
      npmDistTag: "v3",
    },
  },
  codeCov: true,
  cdkVersion: "v2.237.0", // https://github.com/aws/aws-cdk/releases/tag/v2.237.0 & https://github.com/aws/aws-cdk/commit/09383cbad28336441f0fb405c9d8a190135620dc
});

project.addDevDeps(
  "tsx",
  "@aws-cdk/integ-runner",
  "@aws-cdk/integ-tests-alpha",
  "@aws-cdk/cloud-assembly-schema",
  "lefthook",
  "semver",
);

project.synth();
