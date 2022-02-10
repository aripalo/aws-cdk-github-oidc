import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as iam from 'aws-cdk-lib/aws-iam';
import { GithubActionsIdentityProvider } from '../src/provider';
import { GithubActionsRole } from '../src/role';


test('Role with defaults', () => {

  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(stack, 'GithubProvider');

  new GithubActionsRole(stack, 'TestRole', {
    provider,
    owner: 'octo-org',
    repo: 'octo-repo',
  });

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: Match.objectLike({
      Statement: Match.arrayWith([
        Match.objectLike({
          Action: 'sts:AssumeRoleWithWebIdentity',
          Effect: 'Allow',
          Condition: {
            StringLike: {
              'token.actions.githubusercontent.com:sub': 'repo:octo-org/octo-repo:*',
            },
            StringEquals: {
              'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
            },
          },
          Principal: {
            Federated: {
              'Fn::Join': [
                '',
                [
                  'arn:aws:iam::',
                  {
                    Ref: 'AWS::AccountId',
                  },
                  ':oidc-provider/token.actions.githubusercontent.com',
                ],
              ],
            },
          },
        }),
      ]),
    }),
  });
});

test('Role with custom props', () => {

  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(stack, 'GithubProvider');

  const role = new GithubActionsRole(stack, 'TestRole', {
    provider,
    owner: 'octo-org',
    repo: 'octo-repo',
    filter: 'ref:refs/tags/v*',
    roleName: 'MyTestRole',
    description: 'This role deploys stuff to AWS',
    maxSessionDuration: cdk.Duration.hours(2),
    managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
  });

  const stmt = new iam.PolicyStatement();
  stmt.addActions('s3:PutObject');
  stmt.addResources('arn:aws:s3:::mybucket/*');
  stmt.effect = iam.Effect.DENY;
  role.addToPolicy(stmt);

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::IAM::Role', {
    RoleName: 'MyTestRole',
    Description: 'This role deploys stuff to AWS',
    MaxSessionDuration: 7200,
    AssumeRolePolicyDocument: Match.objectLike({
      Statement: Match.arrayWith([
        Match.objectLike({
          Action: 'sts:AssumeRoleWithWebIdentity',
          Effect: 'Allow',
          Condition: {
            StringLike: {
              'token.actions.githubusercontent.com:sub': 'repo:octo-org/octo-repo:ref:refs/tags/v*',
            },
            StringEquals: {
              'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
            },
          },
          Principal: {
            Federated: {
              'Fn::Join': [
                '',
                [
                  'arn:aws:iam::',
                  {
                    Ref: 'AWS::AccountId',
                  },
                  ':oidc-provider/token.actions.githubusercontent.com',
                ],
              ],
            },
          },
        }),
      ]),
    }),
    ManagedPolicyArns: [
      {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':iam::aws:policy/AdministratorAccess',
          ],
        ],
      },
    ],
  });


  template.hasResourceProperties('AWS::IAM::Policy', {
    PolicyDocument: {
      Statement: [
        {
          Action: 's3:PutObject',
          Effect: 'Deny',
          Resource: 'arn:aws:s3:::mybucket/*',
        },
      ],
      Version: '2012-10-17',
    },
    PolicyName: Match.stringLikeRegexp('TestRoleDefaultPolicy*'),
    Roles: [
      {
        Ref: Match.stringLikeRegexp('TestRole*'),
      },
    ],

  });

});


test('Role with invalid owner', () => {

  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(stack, 'GithubProvider');

  new GithubActionsRole(stack, 'TestRole', {
    provider,
    owner: 'invalid/@owner--',
    repo: 'octo-repo',
  });

  expect(stack.node.metadata).toHaveLength(1);
  expect(stack.node.metadata[0].data).toBe(
    'Invalid Github Repository Owner "invalid/@owner--". Must only contain alphanumeric characters or hyphens, cannot have multiple consecutive hyphens, cannot begin or end with a hypen and maximum lenght is 39 characters.',
  );
});

test('Role with invalid repo', () => {

  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(stack, 'GithubProvider');

  new GithubActionsRole(stack, 'TestRole', {
    provider,
    owner: 'octo-org',
    repo: '',
  });

  expect(stack.node.metadata).toHaveLength(1);
  expect(stack.node.metadata[0].data).toBe(
    'Invalid Github Repository Name "". May not be empty string.',
  );
});
