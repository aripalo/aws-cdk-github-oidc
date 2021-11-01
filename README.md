# AWS CDK Github OpenID Connect

![cdk-support](https://img.shields.io/badge/cdk-%20typescript%20|%20python%20-informational "TypeScript | Python")

AWS [CDK](https://aws.amazon.com/cdk/) constructs that define:
- Github Actions as OpenID Connect Identity Provider into AWS IAM
- IAM Roles that can be assumed by Github Actions workflows

These constructs allows you to harden your AWS deployment security by removing the need to create long-term access keys for Github Actions and instead use OpenID Connect to Authenticate your Github Action workflow with AWS IAM.

## Background information

![github-aws-oidc](/assets/github-aws-oidc.svg "Github OIDC with AWS")

- [GitHub Actions: Secure cloud deployments with OpenID Connect](https://github.blog/changelog/2021-10-27-github-actions-secure-cloud-deployments-with-openid-connect/) on Github Changelog Blog.
- [Security hardening your deployments](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments) on Github Docs.
- [Assuming a role with `aws-actions/configure-aws-credentials`](https://github.com/aws-actions/configure-aws-credentials#assuming-a-role).
- Shout-out to [Richard H. Boyd](https://twitter.com/rchrdbyd) for helping me to debug Github OIDC setup with AWS IAM and his [Deploying to AWS with Github Actions](https://www.githubuniverse.com/2021/session/692586/deploying-to-aws-with-github-actions)-talk.
- Shout-out to [Aidan W Steele](https://twitter.com/__steele) and his blog post [AWS federation comes to GitHub Actions](https://awsteele.com/blog/2021/09/15/aws-federation-comes-to-github-actions.html) for being the original inspiration for this.


<br/>

## Getting started

```shell
npm i -D aws-cdk-github-oidc
```

<br/>

### OpenID Connect Identity Provider trust for AWS IAM

To create a new Github OIDC provider configuration into AWS IAM:
```ts
import { GithubActionsIdentityProvider } from 'aws-cdk-github-oidc';

const provider = new GithubActionsIdentityProvider(scope, 'GithubProvider');
```

In the background this creates an OIDC provider trust configuration into AWS IAM with an [issuer URL of `https://token.actions.githubusercontent.com`](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-the-identity-provider-to-aws), audiences (client IDs) configured as `['sts.amazonaws.com']` (which matches the [`aws-actions/configure-aws-credentials`](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-the-identity-provider-to-aws) implementation) and the thumbprint as Github's `a031c46782e6e6c662c2c87c76da9aa62ccabd8e`

<br/>

### Retrieving a reference to an existing Github OIDC provider configuration

Remember, **there can be only one (Github OIDC provider per AWS Account)**, so to retrieve a reference to existing Github OIDC provider use `fromAccount` static method:
```ts
import { GithubActionsIdentityProvider } from 'aws-cdk-github-oidc';

const provider = GithubActionsIdentityProvider.fromAccount(scope, 'GithubProvider');
```

<br/>

### Defining a role for Github Actions workflow to assume

```ts
import { GithubActionsRole } from 'aws-cdk-github-oidc';

const uploadRole = new GithubActionsRole(scope, 'UploadRole', {
  provider: provider,           // reference into the OIDC provider
  owner: 'octo-org',            // your repository owner (organization or user) name
  repo: 'octo-repo',            // your repository name (without the owner name)
  filter: 'ref:refs/tags/v*',   // JWT sub suffix filter, defaults to '*'
});

// use it like any other role, for example grant S3 bucket write access:
myBucket.grantWrite(uploadRole);
```

You may pass in any `iam.RoleProps` into the construct's props, except `assumedBy` which will be defined by this construct (CDK will fail if you do):
```ts
const deployRole = new GithubActionsRole(scope, 'DeployRole', {
  provider: provider,
  owner: 'octo-org',
  repo: 'octo-repo',
  roleName: 'MyDeployRole',
  description: 'This role deploys stuff to AWS',
  maxSessionDuration: cdk.Duration.hours(2),
});

// You may also use various "add*" policy methods!
// "AdministratorAccess" not really a good idea, just for an example here:
deployRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));
```

<br/>

#### Subject Filter

By default the value of `filter` property will be `'*'` which means any workflow (from given repository) from any branch, tag, environment or pull request can assume this role. To further stricten the OIDC trust policy on the role, you may adjust the subject filter as seen on the [examples in Github Docs](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#configuring-the-oidc-trust-with-the-cloud); For example:

|         `filter` value         |                Descrition                |
| :----------------------------- | :--------------------------------------- |
| `'ref:refs/tags/v*'`           | Allow only tags with prefix of `v`       |
| `'ref:refs/heads/demo-branch'` | Allow only from branch `demo-branch`     |
| `'pull_request'`               | Allow only from pull request             |
| `'environment:Production'`     | Allow only from `Production` environment |

<br/>

### Github Actions Workflow

To actually utilize this in your Github Actions workflow, use [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials) to [assume a role](https://github.com/aws-actions/configure-aws-credentials#assuming-a-role).

At the moment you must use the `master` version (until AWS releases a new tag):

```yaml
jobs:
  deploy:
    name: Upload to Amazon S3
    runs-on: ubuntu-latest
    permissions:
      id-token: write # needed to interact with GitHub's OIDC Token endpoint.
      contents: read
    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@master
      with:
        role-to-assume: arn:aws:iam::123456789012:role/MyUploadRole
        #role-session-name: MySessionName # Optional
        aws-region: us-east-1

    - name: Sync files to S3
      run: |
        aws s3 sync . s3://my-example-bucket
```

<br/>

### Development Status

These constructs are fresh out from the oven, since [Github just announced](https://github.blog/changelog/2021-10-27-github-actions-secure-cloud-deployments-with-openid-connect/) the OpenID Connect feature as generally available. I've been playing around with the feature for some time, but the construct itself haven't yet been widely used.

These constructs will stay in `v0.x.x` for a while, to allow easier bug fixing & breaking changes _if absolutely needed_. Once bugs are fixed (if any), the constructs will be published with `v1` major version and will be marked as stable.

Currently only TypeScript and Python versions provided, but before going to stable, I'll probably others (supported by JSII) depending on the amount of work required - so no promises!
