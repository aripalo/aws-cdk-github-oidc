# Migration Test Harness

This folder contains an isolated CDK app that exercises a real migration flow for `aws-cdk-github-oidc`:

1. `aws-cdk-github-oidc@^2` with `aws-cdk-lib@2.220.0`
2. `aws-cdk-github-oidc@^3.1` with exact `aws-cdk-lib@2.237.0`
3. `aws-cdk-github-oidc@^4.2` with `aws-cdk-lib@^2.237.0`

All CDK commands are executed with `pnpm exec cdk ...`.
`pnpm-workspace.yaml` in this folder mirrors the root workspace policy values.

## Stack behavior by phase

The app reads `MIGRATION_PHASE` and switches provider implementation:

- `v2`: `new GithubActionsIdentityProvider(this, "GithubProvider")`
- `v3-retain`: same as `v2`, but with `removalPolicy: cdk.RemovalPolicy.RETAIN`
- `v4-lookup`: `GithubActionsIdentityProvider.fromAccount(this, "GithubProviderReference")`
- `v4-import`: switch back to `new GithubActionsIdentityProvider(this, "GithubProvider", { removalPolicy: RETAIN })`

## Setup

From this directory:

```sh
corepack use pnpm@10.19.0
pnpm install
```

## Run full migration flow

```sh
pnpm run test-migration
```

Optional environment variable:

- `MIGRATION_STACK_NAME` (default: `AwsCdkGithubOidcMigrationTest`)

## What the script does

`scripts/run-migration.sh` performs the full sequence with deploy boundaries:

1. Install v2 + `aws-cdk-lib@2.220.0`, deploy `MIGRATION_PHASE=v2`
2. Upgrade to v3.1 + `aws-cdk-lib@2.237.0`, diff and deploy `MIGRATION_PHASE=v3-retain`
3. Upgrade to v4.2 + `aws-cdk-lib@^2.237.0`, diff and deploy `MIGRATION_PHASE=v4-lookup`
4. Set `MIGRATION_PHASE=v4-import`, dynamically fetch account id via:
   - `aws sts get-caller-identity --query "Account" --output text`
5. Generate `./.tmp/resource-mapping.json` (not committed) and run:
   - `pnpm exec cdk import <STACK_NAME> --resource-mapping ./.tmp/resource-mapping.json`
6. Run `pnpm exec cdk diff` for verification

## Resource mapping

No AWS account IDs are stored in source control.

- Template file: `config/resource-mapping.template.json`
- Runtime file: `./.tmp/resource-mapping.json`

The generated ARN format is:

`arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com`

## Reference

- [AWS CDK `cdk import` docs](https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-import.html)
