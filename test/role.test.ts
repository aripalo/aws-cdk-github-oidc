import * as cdk from '@aws-cdk/core';
import '@aws-cdk/assert/jest';
import { GithubActionsIdentityProvider } from '../src/provider';
import { GithubActionsRole } from '../src/role';


test('Role', () => {

  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(stack, 'GithubProvider');

  new GithubActionsRole(stack, 'TestRole', {
    provider,
    owner: 'octo-org',
    repo: 'octo-repo',
  });

});
