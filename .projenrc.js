const { AwsCdkConstructLibrary } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Ari Palo',
  authorAddress: 'opensource@aripalo.com',
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  stability: 'experimental',
  name: 'aws-cdk-github-oidc',
  description: 'CDK constructs to use OpenID Connect for authenticating your Github Action workflow with AWS IAM',
  repositoryUrl: 'https://github.com/aripalo/aws-cdk-github-oidc.git',
  keywords: ['cdk', 'aws-cdk', 'awscdk', 'aws', 'iam', 'github', 'github-actions', 'oidc', 'openid-connect'],

  cdkDependencies: ['@aws-cdk/core', '@aws-cdk/aws-iam'],
  devDeps: ['@types/github-username-regex', '@aws-cdk/core', '@aws-cdk/aws-iam', 'constructs'],
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
});
project.synth();
