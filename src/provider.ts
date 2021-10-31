import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export interface IGithubActionsIdentityProvider extends iam.IOpenIdConnectProvider {}


export class GithubActionsIdentityProvider extends iam.OpenIdConnectProvider implements IGithubActionsIdentityProvider {

  public static readonly issuer: string = 'token.actions.githubusercontent.com';
  public static readonly thumbprint: string = 'a031c46782e6e6c662c2c87c76da9aa62ccabd8e';

  public static fromLookup(scope: cdk.Construct, id: string): IGithubActionsIdentityProvider {
    const accountId = cdk.Stack.of(scope).account;
    const providerArn = `arn:aws:iam::${accountId}:oidc-provider/${GithubActionsIdentityProvider.issuer}`;
    const provider = iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(scope, id, providerArn);
    return provider;
  }

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id, {
      url: `https://${GithubActionsIdentityProvider.issuer}`,
      thumbprints: [GithubActionsIdentityProvider.thumbprint],
      clientIds: ['sts.amazonaws.com'],
    });
  }
}