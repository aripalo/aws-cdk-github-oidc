import * as cdk from '@aws-cdk/core';
import '@aws-cdk/assert/jest';
import { GithubActionsIdentityProvider } from '../src/provider';

const providerArnRegexp = /^arn:aws:iam::\$\{Token\[.+\]\}:oidc-provider\/token\.actions\.githubusercontent\.com$/i;

test('New Provider', () => {

  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new GithubActionsIdentityProvider(stack, 'GithubProvider');

  expect(stack).toHaveResource('Custom::AWSCDKOpenIdConnectProvider', {
    ClientIDList: [
      'sts.amazonaws.com',
    ],
    ThumbprintList: [
      'a031c46782e6e6c662c2c87c76da9aa62ccabd8e',
      '6938fd4d98bab03faadb97b34396831e3780aea1',
    ],
    Url: 'https://token.actions.githubusercontent.com',
  });
});

test('Existing Provider', () => {

  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(stack, 'GithubProvider');

  expect(provider.openIdConnectProviderIssuer).toBe('token.actions.githubusercontent.com');
  expect(provider.openIdConnectProviderArn).toMatch(providerArnRegexp);
});
