# V5 Migration Guide

This guide documents how to migrate to `aws-cdk-github-oidc` v5.


## Changes coming in v5

Switching from [custom resource based `iam.OpenIdConnectProvider`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.OpenIdConnectProvider.html) to [CloudFormation native `iam.OidcProviderNative`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.OidcProviderNative.html) in `v4` resulted to a following error when migrating from `v2`/`v3`:
```
Update of resource type is not permitted. The new template modifies resource type of the following resources: [GithubProvider1CDE27EB]
```

To avoid this, `v5` **prefixes** the `AWS::IAM::OIDCProvider` resource logical ID with string `Native`:
```diff
- <CdkGeneratedLogicalId>
+ Native<CdkGeneratedLogicalId>
```
so for example:
```diff
- GithubProvider1CDE27EB
+ NativeGithubProvider1CDE27EB
```

… resulting in a new resource being created (_instead_ of trying – and failing – to change the type of existing one).

## Migration Summary

- From `v3` and older, the migration is straightforward: the old custom-resource-based provider is removed and replaced with the native CloudFormation OIDC provider resource.
- From `v4`, you have two migration options:
  - recreate the provider by accepting the new logical ID in v5
  - or keep the v4 logical ID by enabling the compatibility feature flag

## Migrating From V3 And Older

In `v3` and older, the GitHub OIDC provider was created using a custom resource. In `v5`, it is created using the native CloudFormation resource type `AWS::IAM::OIDCProvider`.

The CDK CloudFormation diff is expected to look like this:

```diff
Resources
- Custom::AWSCDKOpenIdConnectProvider GithubProvider/Resource GithubProvider1CDE27EB destroy
- AWS::IAM::Role Custom::AWSCDKOpenIdConnectProviderCustomResourceProvider/Role CustomAWSCDKOpenIdConnectProviderCustomResourceProviderRole517FED65 destroy
- AWS::Lambda::Function Custom::AWSCDKOpenIdConnectProviderCustomResourceProvider/Handler CustomAWSCDKOpenIdConnectProviderCustomResourceProviderHandlerF2C543E0 destroy
+ AWS::IAM::OIDCProvider GithubProvider NativeGithubProvider1CDE27EB
```

This means:

- the legacy custom resource is removed
- the Lambda-backed custom resource provider is removed
- a new native `AWS::IAM::OIDCProvider` resource is created

> [!IMPORTANT]
> During deployment there is a very brief moment when the OIDC provider is being recreated. During that short window, GitHub OIDC authentication to AWS will not work.

## Migrating From V4

From `v4` to `v5`, there are two supported approaches.

### Approach A: Recreate The Provider

By default, `v5` prefixes the generated provider logical ID with `Native`. That changes the underlying CloudFormation logical ID and results in provider recreation.

This produces a migration similar in effect to the `v3` and older migration path:

- the old provider resource is replaced
- the new native provider is created under a different logical ID

> [!IMPORTANT]
> During deployment there is a very brief moment when the OIDC provider is being recreated. During that short window, GitHub OIDC authentication to AWS will not work.

Choose this approach if you want to move fully to the new default v5 behavior without additional compatibility settings.

### Approach B: Keep The V4 Logical ID With A Feature Flag

If you want to avoid any CloudFormation diff for the provider resource when moving from `v4` to `v5`, enable the compatibility feature flag in your CDK context:

```json
{
  "aws-cdk-github-oidc:compatibilityV4": true
}
```

With that flag enabled:

- v5 keeps the same provider logical ID style as v4
- no provider recreation is triggered by the logical ID change
- the deployment should produce no provider diff related to this logical ID change

Choose this approach if you want the no-diff-migration-path from `v4` to `v5`.

