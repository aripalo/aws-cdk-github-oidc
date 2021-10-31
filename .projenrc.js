const { AwsCdkConstructLibrary } = require('projen');
const project = new AwsCdkConstructLibrary({
  author: 'Ari Palo',
  authorAddress: 'opensource@aripalo.com',
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: 'aws-cdk-github-oidc',
  // description: undefined,          /* The description is just a string that helps people understand the purpose of the package. */
  repositoryUrl: 'https://github.com/ari.palo/aws-cdk-github-oidc.git',

  cdkDependencies: ['@aws-cdk/core', '@aws-cdk/aws-iam'],
  deps: ['github-username-regex'],
  bundledDeps: ['github-username-regex'],
  devDeps: ['@types/github-username-regex', '@aws-cdk/core', '@aws-cdk/aws-iam', 'constructs'],
  packageName: '@aripalo/aws-cdk-github-oidc',
  // release: undefined,              /* Add release management to this project. */
});
project.synth();