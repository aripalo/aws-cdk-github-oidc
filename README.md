> [!IMPORTANT]
> Migrating **to `v4`**? See [Migration Guide](#migration-guide) at the end of this README.


# AWS CDK Github OpenID Connect

![cdk-support](https://img.shields.io/badge/cdk-%20typescript%20|%20python%20-informational "TypeScript | Python")
[![release](https://github.com/aripalo/aws-cdk-github-oidc/actions/workflows/release.yml/badge.svg)](https://github.com/aripalo/aws-cdk-github-oidc/actions/workflows/release.yml)
[![codecov](https://codecov.io/gh/aripalo/aws-cdk-github-oidc/branch/main/graph/badge.svg?token=5X44RM6J17)](https://codecov.io/gh/aripalo/aws-cdk-github-oidc)

---

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
pnpm add -D aws-cdk-github-oidc
```

<br/>

### OpenID Connect Identity Provider trust for AWS IAM

To create a new Github OIDC provider configuration into AWS IAM:

```ts
import { GithubActionsIdentityProvider } from "aws-cdk-github-oidc";

const provider = new GithubActionsIdentityProvider(scope, "GithubProvider");
```

In the background this creates an OIDC provider trust configuration into AWS IAM with an [issuer URL of `https://token.actions.githubusercontent.com`](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-the-identity-provider-to-aws) and audiences (client IDs) configured as `['sts.amazonaws.com']` (which matches the [`aws-actions/configure-aws-credentials`](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-the-identity-provider-to-aws) implementation).

<br/>

### Retrieving a reference to an existing Github OIDC provider configuration

Remember, **there can be only one (Github OIDC provider per AWS Account)**, so to retrieve a reference to existing Github OIDC provider use `fromAccount` static method:

```ts
import { GithubActionsIdentityProvider } from "aws-cdk-github-oidc";

const provider = GithubActionsIdentityProvider.fromAccount(
  scope,
  "GithubProvider"
);
```

<br/>

### Defining a role for Github Actions workflow to assume

```ts
import { GithubActionsRole } from "aws-cdk-github-oidc";

const uploadRole = new GithubActionsRole(scope, "UploadRole", {
  provider: provider, // reference into the OIDC provider
  owner: "octo-org", // your repository owner (organization or user) name
  repo: "octo-repo", // your repository name (without the owner name)
  filter: "ref:refs/tags/v*", // JWT sub suffix filter, defaults to '*'
});

// use it like any other role, for example grant S3 bucket write access:
myBucket.grantWrite(uploadRole);
```

You may pass in any `iam.RoleProps` into the construct's props, except `assumedBy` which will be defined by this construct (CDK will fail if you do):

```ts
const deployRole = new GithubActionsRole(scope, "DeployRole", {
  provider: provider,
  owner: "octo-org",
  repo: "octo-repo",
  roleName: "MyDeployRole",
  description: "This role deploys stuff to AWS",
  maxSessionDuration: cdk.Duration.hours(2),
});

// You may also use various "add*" policy methods!
// "AdministratorAccess" not really a good idea, just for an example here:
deployRole.addManagedPolicy(
  iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess")
);
```

<br/>

#### Subject Filter

By default the value of `filter` property will be `'*'` which means any workflow (from given repository) from any branch, tag, environment or pull request can assume this role. To further stricten the OIDC trust policy on the role, you may adjust the subject filter as seen on the [examples in Github Docs](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#configuring-the-oidc-trust-with-the-cloud); For example:

| `filter` value                 | Descrition                               |
| :----------------------------- | :--------------------------------------- |
| `'ref:refs/tags/v*'`           | Allow only tags with prefix of `v`       |
| `'ref:refs/heads/demo-branch'` | Allow only from branch `demo-branch`     |
| `'pull_request'`               | Allow only from pull request             |
| `'environment:Production'`     | Allow only from `Production` environment |

<br/>

### Github Actions Workflow

To actually utilize this in your Github Actions workflow, use [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials) to [assume a role](https://github.com/aws-actions/configure-aws-credentials#assuming-a-role).

```yaml
jobs:
  whoami:
    name: Who Am I
    runs-on: ubuntu-latest
    permissions:
      id-token: write # needed to interact with GitHub's OIDC Token endpoint.
    steps:
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@d979d5b3a71173a29b74b5b88418bfda9437d885 # v6.1.1
        with:
          role-to-assume: arn:aws:iam::123456789012:role/MyUploadRole
          #role-session-name: MySessionName # Optional
          aws-region: us-east-1
      - name: Get Caller Identity
        run: |
          aws sts get-caller-identity
```

<br/>


## Migration Guide

- [v2→v3](#v2v3)
- [v3→v4](#v3v4)

### v2→v3

1. Install AWS CDK version [`v2.237.0`](https://github.com/aws/aws-cdk/releases/tag/v2.237.0) or newer required (due to support of [OIDC provider removal policy support](https://github.com/aws/aws-cdk/commit/09383cbad28336441f0fb405c9d8a190135620dc)):
    
    ```sh
    pnpm add -D aws-cdk-lib@^2.237.0
    ```

2. Install `v3.1.0` (or newer v3 release) of this library:

    ```sh
    pnpm add -D aws-cdk-github-oidc@^3.1
    ```

3. No additional steps required, as the v3 major version does not introduce any breaking changes (just a lot of internal tooling changes).

### v3→v4

> [!CAUTION]
> The following steps describe a _**no-downtime** migration path_. 
> It is the recommended approach, but somewhat _involved_: Hence some users may decide to use "destroy + redeploy" strategy instead, which causes downtime to authenticating from GitHub Actions to AWS using OIDC.

1. Ensure you are running `v3.1.0` (or newer v3 release) of this library, see [v2→v3](#v2v3).

2. Configure `RETAIN` removal policy for the provider:

    ```diff
    const provider = new GithubActionsIdentityProvider(this, "GithubProvider", {
    +  removalPolicy: cdk.RemovalPolicy.RETAIN,
    });
    ```

3. Run `pnpm exec cdk diff`, which will show an output similar to:

    ```sh
    Resources
    [~] Custom::AWSCDKOpenIdConnectProvider GithubProvider/Resource GithubProvider1CDE27EB
    ├─ [~] DeletionPolicy
    │   ├─ [-] Delete
    │   └─ [+] Retain
    └─ [~] UpdateReplacePolicy
        ├─ [-] Delete
        └─ [+] Retain
    ```


4. Deploy the changes `pnpm exec cdk deploy`

5. Once the `RETAIN` removal policy has been successfully deployed, upgrade this library to `v4.2` (or newer v4 release):

    ```sh
    pnpm add -D aws-cdk-github-oidc@^4.2
    ```

6. Temporarily change from provider initializion to provider lookup:

    ```diff
    - const provider = new GithubActionsIdentityProvider(this, "GithubProvider", {
    -  removalPolicy: cdk.RemovalPolicy.RETAIN,
    - });
    + const provider = GithubActionsIdentityProvider.fromAccount(this, "GithubProviderReference");
    ```
    
    > [!IMPORTANT]
    > Notice the different construct ID (in the example `GithubProviderReference` instead of ~~`GithubProvider`~~). This is required so that the CDK treats the GitHub OIDC provider lookup as a different "thing" and does not try to change the type of existing construct.

7. Check `pnpm exec cdk diff` which should look similar to:
    ```sh
    Resources
    [-] Custom::AWSCDKOpenIdConnectProvider GithubProvider/Resource GithubProvider1CDE27EB orphan
    [-] AWS::IAM::Role Custom::AWSCDKOpenIdConnectProviderCustomResourceProvider/Role CustomAWSCDKOpenIdConnectProviderCustomResourceProviderRole517FED65 destroy
    [-] AWS::Lambda::Function Custom::AWSCDKOpenIdConnectProviderCustomResourceProvider/Handler CustomAWSCDKOpenIdConnectProviderCustomResourceProviderHandlerF2C543E0 destroy
    ```

8. Deploy the changes with `pnpm exec cdk deploy`

9. Once the deployment has succeeded, remove the provider lookup and replace it with the original provider initialization:

    ```diff
    - const provider = GithubActionsIdentityProvider.fromAccount(this, "GithubProviderReference");
    + const provider = new GithubActionsIdentityProvider(this, "GithubProvider", {
    +  removalPolicy: cdk.RemovalPolicy.RETAIN,
    + });
    ```
  
10. Copy the ARN of the existing OIDC provider, it will be in the format of: 

    ```
    arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com # REPLACE with your account ID
    ```

11. Use [cdk import](https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-import.html):

    ```sh
    pnpm exec cdk import <YOUR_STACK_NAME> 
    ```

    ... and when asked, input the provider ARN you copied in step 10:
    ```sh
    <YOUR_STACK_NAME>/GithubProvider/Resource (AWS::IAM::OIDCProvider): enter Arn (empty to skip)
    ```

12. You should be done now, but you may want to **perform manual verification** in addition to [drift detection](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/detect-drift-stack.html) and/or `cdk diff`` to verify.



