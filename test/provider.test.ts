import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { GithubActionsIdentityProvider } from '../src/provider';

const providerArnRegexp = /^arn:aws:iam::\$\{Token\[.+\]\}:oidc-provider\/token\.actions\.githubusercontent\.com$/i;

test('New Provider', () => {

  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  new GithubActionsIdentityProvider(stack, 'GithubProvider');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('Custom::AWSCDKOpenIdConnectProvider', {
    ClientIDList: [
      'sts.amazonaws.com',
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
