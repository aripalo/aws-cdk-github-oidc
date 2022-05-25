const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Ari Palo',
  authorAddress: 'opensource@aripalo.com',
  cdkVersion: '2.12.0',


  /**
   * we default release the main branch(cdkv2) with major version 2.
   */
  majorVersion: 2,
  defaultReleaseBranch: 'main',
  /**
   * we also release the cdkv1 branch with major version 1.
   */
  releaseBranches: {
    cdkv1: { npmDistTag: 'cdkv1', majorVersion: 1 },
  },

  stability: 'experimental',
  name: 'aws-cdk-github-oidc',
  description: 'CDK constructs to use OpenID Connect for authenticating your Github Action workflow with AWS IAM',
  repositoryUrl: 'https://github.com/aripalo/aws-cdk-github-oidc.git',
  keywords: ['cdk', 'aws-cdk', 'awscdk', 'aws', 'iam', 'github', 'github-actions', 'oidc', 'openid-connect'],

  devDeps: ['@types/github-username-regex', 'constructs'],
  // release: undefined,              /* Add release management to this project. */

  gitignore: ['.DS_Store'],

  tsconfig: {
    compilerOptions: {
      esModuleInterop: true, // required for github-username-regex
    },
  },

  publishToPypi: {
    distName: 'aws-cdk-github-oidc',
    module: 'aws_cdk_github_oidc',
  },

  publishToGo: {
    moduleName: 'github.com/aripalo/aws-cdk-github-oidc-go',
  },

  codeCov: true,
});
project.synth();
