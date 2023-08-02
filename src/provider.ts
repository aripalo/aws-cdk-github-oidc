import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/**
 * Describes a Github OpenID Connect Identity Provider for AWS IAM.
 */
export interface IGithubActionsIdentityProvider extends iam.IOpenIdConnectProvider { }

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
  public static fromAccount(scope: Construct, id: string): IGithubActionsIdentityProvider {
    const accountId = cdk.Stack.of(scope).account;
    const providerArn = `arn:aws:iam::${accountId}:oidc-provider/${GithubActionsIdentityProvider.issuer}`;
    return iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(scope, id, providerArn);
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
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      url: `https://${GithubActionsIdentityProvider.issuer}`,
      clientIds: ['sts.amazonaws.com'],
    });
  }
}
