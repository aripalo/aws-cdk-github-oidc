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
  devDeps: [
    "@types/github-username-regex",
    "constructs",
    "@alma-cdk/construct-library",
  ],
  pnpmSettings: {
    trustPolicyExclude: ["jsii@5.9.35"],
  },
  // codeCov: true,

  // tsconfig: {
  //   compilerOptions: {
  //     esModuleInterop: true, // required for github-username-regex
  //   },
  // },
});

// publishToPypi: {
//   distName: 'aws-cdk-github-oidc',
//   module: 'aws_cdk_github_oidc',
// },
// publishToGo: {
//   moduleName: 'github.com/aripalo/aws-cdk-github-oidc-go',
// },

project.synth();
