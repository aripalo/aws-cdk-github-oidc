import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import { test as testUserName } from 'github-username-regex';
import { GithubActionsIdentityProvider, IGithubActionsIdentityProvider } from './provider';


//export type RoleProps = Omit<iam.RoleProps, 'assumedBy'>

export interface GithubConfiguration {
  readonly provider: IGithubActionsIdentityProvider;
  readonly owner: string;
  readonly repo: string;

  // https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#examples
  readonly filter?: string;
}

export interface GithubActionsRoleProps {
  readonly github: GithubConfiguration;
  readonly role: iam.RoleProps;
}

export class GithubActionsRole extends iam.Role {

  private static validateOwner(scope: cdk.Construct, owner: string): void {
    if (testUserName(owner) !== true) {
      cdk.Annotations.of(scope).addError(`Invalid Github Repository Owner "${owner}". Must only contain alphanumeric characters or hyphens, cannot have multiple consecutive hyphens, cannot begin or end with a hypen and maximum lenght is 39 characters.`);
    }
  }

  private static validateRepo(scope: cdk.Construct, repo: string): void {
    if (repo === '') {
      cdk.Annotations.of(scope).addError(`Invalid Github Repository Name "${repo}". May not be empty string.`);
    }
  }

  private static formatSubject(props: GithubConfiguration): string {
    const { owner, repo, filter = '*' } = props;
    return `repo:${owner}/${repo}:${filter}`;
  }

  constructor(scope: cdk.Construct, id: string, props: GithubActionsRoleProps) {

    const { github, role: roleProps } = props;

    GithubActionsRole.validateOwner(scope, github.owner);
    GithubActionsRole.validateRepo(scope, github.repo);

    const subject = GithubActionsRole.formatSubject(props.github);
    //const roleProps = GithubActionsRole.extractRoleProps(props);

    super(scope, id, {
      ...roleProps,
      assumedBy: new iam.WebIdentityPrincipal(github.provider.openIdConnectProviderArn, {
        StringLike: {
          [`${GithubActionsIdentityProvider.issuer}:sub`]: subject,
        },
        StringEquals: {
          [`${GithubActionsIdentityProvider.issuer}:aud`]: 'sts.amazonaws.com',
        },
      }),
    });

  }
}

