import * as cdk from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";
import * as iam from "aws-cdk-lib/aws-iam";
import { ArtifactMetadataEntryType } from "aws-cdk-lib/cloud-assembly-schema";
import { GithubActionsIdentityProvider } from "../src/provider";
import { GithubActionsRole } from "../src/role";

const ANNOTATION_TYPES: string[] = [
  ArtifactMetadataEntryType.ERROR,
  ArtifactMetadataEntryType.WARN,
  ArtifactMetadataEntryType.INFO,
];

/**
 * CDK core attaches other kinds of metadata to construct nodes (such as
 * `aws:cdk:creationStack`), so narrow it down to just the annotations.
 */
function annotationsOf(stack: cdk.Stack) {
  return stack.node.metadata.filter((entry) =>
    ANNOTATION_TYPES.includes(entry.type),
  );
}

test("Role with defaults", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(
    stack,
    "GithubProvider",
  );

  new GithubActionsRole(stack, "TestRole", {
    provider,
    owner: "octo-org",
    repo: "octo-repo",
  });

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::IAM::Role", {
    AssumeRolePolicyDocument: Match.objectLike({
      Statement: Match.arrayWith([
        Match.objectLike({
          Action: "sts:AssumeRoleWithWebIdentity",
          Effect: "Allow",
          Condition: {
            StringLike: {
              "token.actions.githubusercontent.com:sub":
                "repo:octo-org/octo-repo:*",
            },
            StringEquals: {
              "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
            },
          },
          Principal: {
            Federated: {
              "Fn::Join": [
                "",
                [
                  "arn:aws:iam::",
                  {
                    Ref: "AWS::AccountId",
                  },
                  ":oidc-provider/token.actions.githubusercontent.com",
                ],
              ],
            },
          },
        }),
      ]),
    }),
  });
});

test("Role with custom props", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(
    stack,
    "GithubProvider",
  );

  const role = new GithubActionsRole(stack, "TestRole", {
    provider,
    owner: "octo-org",
    repo: "octo-repo",
    filter: "ref:refs/tags/v*",
    roleName: "MyTestRole",
    description: "This role deploys stuff to AWS",
    maxSessionDuration: cdk.Duration.hours(2),
    managedPolicies: [
      iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
    ],
  });

  const stmt = new iam.PolicyStatement();
  stmt.addActions("s3:PutObject");
  stmt.addResources("arn:aws:s3:::mybucket/*");
  stmt.effect = iam.Effect.DENY;
  role.addToPolicy(stmt);

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::IAM::Role", {
    RoleName: "MyTestRole",
    Description: "This role deploys stuff to AWS",
    MaxSessionDuration: 7200,
    AssumeRolePolicyDocument: Match.objectLike({
      Statement: Match.arrayWith([
        Match.objectLike({
          Action: "sts:AssumeRoleWithWebIdentity",
          Effect: "Allow",
          Condition: {
            StringLike: {
              "token.actions.githubusercontent.com:sub":
                "repo:octo-org/octo-repo:ref:refs/tags/v*",
            },
            StringEquals: {
              "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
            },
          },
          Principal: {
            Federated: {
              "Fn::Join": [
                "",
                [
                  "arn:aws:iam::",
                  {
                    Ref: "AWS::AccountId",
                  },
                  ":oidc-provider/token.actions.githubusercontent.com",
                ],
              ],
            },
          },
        }),
      ]),
    }),
    ManagedPolicyArns: [
      {
        "Fn::Join": [
          "",
          [
            "arn:",
            {
              Ref: "AWS::Partition",
            },
            ":iam::aws:policy/AdministratorAccess",
          ],
        ],
      },
    ],
  });

  template.hasResourceProperties("AWS::IAM::Policy", {
    PolicyDocument: {
      Statement: [
        {
          Action: "s3:PutObject",
          Effect: "Deny",
          Resource: "arn:aws:s3:::mybucket/*",
        },
      ],
      Version: "2012-10-17",
    },
    PolicyName: Match.stringLikeRegexp("TestRoleDefaultPolicy*"),
    Roles: [
      {
        Ref: Match.stringLikeRegexp("TestRole*"),
      },
    ],
  });
});

test("Role with immutable subject", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(
    stack,
    "GithubProvider",
  );

  new GithubActionsRole(stack, "TestRole", {
    provider,
    owner: "octo-org",
    repo: "octo-repo",
    ownerId: "123456",
    repoId: "456789",
    filter: "ref:refs/tags/v*",
  });

  expect(annotationsOf(stack)).toHaveLength(0);

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::IAM::Role", {
    AssumeRolePolicyDocument: Match.objectLike({
      Statement: Match.arrayWith([
        Match.objectLike({
          Action: "sts:AssumeRoleWithWebIdentity",
          Effect: "Allow",
          Condition: {
            StringLike: {
              "token.actions.githubusercontent.com:sub":
                "repo:octo-org@123456/octo-repo@456789:ref:refs/tags/v*",
            },
            StringEquals: {
              "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
            },
          },
        }),
      ]),
    }),
  });
});

test("Role with immutable subject and default filter", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(
    stack,
    "GithubProvider",
  );

  new GithubActionsRole(stack, "TestRole", {
    provider,
    owner: "octo-org",
    repo: "octo-repo",
    ownerId: "123456",
    repoId: "456789",
  });

  Template.fromStack(stack).hasResourceProperties("AWS::IAM::Role", {
    AssumeRolePolicyDocument: Match.objectLike({
      Statement: Match.arrayWith([
        Match.objectLike({
          Condition: Match.objectLike({
            StringLike: {
              "token.actions.githubusercontent.com:sub":
                "repo:octo-org@123456/octo-repo@456789:*",
            },
          }),
        }),
      ]),
    }),
  });
});

test.each([
  ["ownerId", { ownerId: "123456" }],
  ["repoId", { repoId: "456789" }],
])("Role with only %s given", (_name, ids) => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(
    stack,
    "GithubProvider",
  );

  new GithubActionsRole(stack, "TestRole", {
    provider,
    owner: "octo-org",
    repo: "octo-repo",
    ...ids,
  });

  const annotations = annotationsOf(stack);

  expect(annotations).toHaveLength(1);
  expect(annotations[0].type).toBe(ArtifactMetadataEntryType.ERROR);
  expect(annotations[0].data).toBe(
    'Incomplete Github IDs. Both "ownerId" and "repoId" must be given to use an immutable subject, or neither of them.',
  );

  // Falls back to referring by name instead of a half-formed immutable subject.
  Template.fromStack(stack).hasResourceProperties("AWS::IAM::Role", {
    AssumeRolePolicyDocument: Match.objectLike({
      Statement: Match.arrayWith([
        Match.objectLike({
          Condition: Match.objectLike({
            StringLike: {
              "token.actions.githubusercontent.com:sub":
                "repo:octo-org/octo-repo:*",
            },
          }),
        }),
      ]),
    }),
  });
});

test("Role with invalid owner", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(
    stack,
    "GithubProvider",
  );

  new GithubActionsRole(stack, "TestRole", {
    provider,
    owner: "invalid/@owner--",
    repo: "octo-repo",
  });

  const annotations = annotationsOf(stack);

  expect(annotations).toHaveLength(1);
  expect(annotations[0].type).toBe(ArtifactMetadataEntryType.ERROR);
  expect(annotations[0].data).toBe(
    'Invalid Github Repository Owner "invalid/@owner--". Must only contain alphanumeric characters or hyphens, cannot have multiple consecutive hyphens, cannot begin or end with a hypen and maximum lenght is 39 characters.',
  );
});

test("Role with invalid repo", () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app);
  const provider = GithubActionsIdentityProvider.fromAccount(
    stack,
    "GithubProvider",
  );

  new GithubActionsRole(stack, "TestRole", {
    provider,
    owner: "octo-org",
    repo: "",
  });

  const annotations = annotationsOf(stack);

  expect(annotations).toHaveLength(1);
  expect(annotations[0].type).toBe(ArtifactMetadataEntryType.ERROR);
  expect(annotations[0].data).toBe(
    'Invalid Github Repository Name "". May not be empty string.',
  );
});
