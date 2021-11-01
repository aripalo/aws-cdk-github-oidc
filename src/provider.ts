import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

/**
 * Describes a Github OpenID Connect Identity Provider for AWS IAM.
 */
export interface IGithubActionsIdentityProvider extends iam.IOpenIdConnectProvider {}

/**
 * Github Actions as OpenID Connect Identity Provider for AWS IAM.
 * There can be only one (per AWS Account).
 *
 * Use `fromAccount` to retrieve a reference to existing Github OIDC provider.
 *
 * @see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
 */
export class GithubActionsIdentityProvider extends iam.OpenIdConnectProvider implements IGithubActionsIdentityProvider {

  public static readonly issuer: string = 'token.actions.githubusercontent.com';
  public static readonly thumbprint: string = 'a031c46782e6e6c662c2c87c76da9aa62ccabd8e';

  /**
   * Retrieve a reference to existing Github OIDC provider in your AWS account.
   * An AWS account can only have single Github OIDC provider configured into it,
   * so internally the reference is made by constructing the ARN from AWS
   * Account ID & Github issuer URL.
   *
   * @param scope CDK Stack or Construct to which the provider is assigned to
   * @param id CDK Construct ID given to the construct
   * @returns a CDK Construct representing the Github OIDC provider
   *
   * @example
   * GithubActionsIdentityProvider.fromAccount(scope, "GithubProvider");
   */
  public static fromAccount(scope: cdk.Construct, id: string): IGithubActionsIdentityProvider {
    const accountId = cdk.Stack.of(scope).account;
    const providerArn = `arn:aws:iam::${accountId}:oidc-provider/${GithubActionsIdentityProvider.issuer}`;
    const provider = iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(scope, id, providerArn);
    return provider;
  }

  /**
   * Define a new Github OpenID Connect Identity PRovider for AWS IAM.
   * There can be only one (per AWS Account).
   *
   * @param scope CDK Stack or Construct to which the provider is assigned to
   * @param id CDK Construct ID given to the construct
   *
   * @example
   * new GithubActionsIdentityProvider(scope, "GithubProvider");
   */
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id, {
      url: `https://${GithubActionsIdentityProvider.issuer}`,
      thumbprints: [GithubActionsIdentityProvider.thumbprint],
      clientIds: ['sts.amazonaws.com'],
    });
  }
}
