const { ProjenStruct, Struct } = require('@mrgrain/jsii-struct-builder');
const { awscdk, github, TextFile, javascript } = require('projen');

const nodejsVersion = '16.20.0';

const project = new awscdk.AwsCdkConstructLibrary({

  // Metadata
  stability: 'experimental',
  authorName: 'Ari Palo',
  authorOrganization: false,
  authorAddress: 'opensource@aripalo.com',
  name: 'aws-cdk-github-oidc',
  description: 'CDK constructs to use OpenID Connect for authenticating your Github Action workflow with AWS IAM',
  repositoryUrl: 'https://github.com/aripalo/aws-cdk-github-oidc.git',
  keywords: ['cdk', 'aws-cdk', 'awscdk', 'aws', 'iam', 'github', 'github-actions', 'oidc', 'openid-connect'],

  // Publish configuration
  defaultReleaseBranch: 'main',
  majorVersion: 2, // we default release the main branch(cdkv2) with major version 2.
  packageManager: javascript.NodePackageManager.NPM,
  npmAccess: javascript.NpmAccess.PUBLIC,
  publishToPypi: {
    distName: 'aws-cdk-github-oidc',
    module: 'aws_cdk_github_oidc',
  },
  publishToGo: {
    moduleName: 'github.com/aripalo/aws-cdk-github-oidc-go',
  },

  // Dependencies
  minNodeVersion: nodejsVersion,
  cdkVersion: '2.89.0',
  constructsVersion: '10.0.0',
  peerDeps: ['constructs', 'aws-cdk-lib'],
  devDeps: ['@types/github-username-regex', 'constructs', '@mrgrain/jsii-struct-builder'],
  bundledDeps: [],

  // Gitignore
  gitignore: [
    '.DS_Store',
    '/examples/**/cdk.context.json',
    '/examples/**/node_modules',
    '/examples/**/cdk.out',
    '/examples/**/.git',
    '**/*.drawio.bkp',
  ],

  tsconfig: {
    compilerOptions: {
      esModuleInterop: true, // required for github-username-regex
    },
  },

  eslintOptions: {
    ignorePatterns: ['src/generated/*.ts'], // ignore generated files
  },
  codeCov: true,
});

new TextFile(project, '.nvmrc', {
  lines: [nodejsVersion],
});

new ProjenStruct(project, { name: 'RoleProps', filePath: 'src/generated/iam-role-props.ts' }).mixin(
  Struct.fromFqn('aws-cdk-lib.aws_iam.RoleProps')
    .omit('assumedBy')
    .withoutDeprecated(),
);

project.synth();
