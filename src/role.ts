import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import { test as testUserName } from 'github-username-regex';
import { GithubActionsIdentityProvider, IGithubActionsIdentityProvider } from './provider';


export interface GithubConfiguration {
  readonly provider: IGithubActionsIdentityProvider;
  readonly owner: string;
  readonly repo: string;

  // https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#examples
  readonly filter?: string;
}

export interface GithubActionsRoleProps extends GithubConfiguration, iam.RoleProps {}

export class GithubActionsRole extends iam.Role {

  private static extractRoleProps(props: GithubActionsRoleProps): iam.RoleProps {
    const extractProps = <any>props;
    delete extractProps.provider;
    delete extractProps.owner;
    delete extractProps.repo;
    delete extractProps.filter;
    return extractProps;
  }

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

  private static validateRoleProps(scope: cdk.Construct, props: iam.RoleProps): void {
    if (props.assumedBy) {
      cdk.Annotations.of(scope).addError('Do not provide "assumedBy" property yourself. It will be defined by GithubActionsRole automatically.');
    }
  }

  private static formatSubject(props: GithubConfiguration): string {
    const { owner, repo, filter = '*' } = props;
    return `repo:${owner}/${repo}:${filter}`;
  }


  constructor(scope: cdk.Construct, id: string, props: GithubActionsRoleProps) {

    const { provider, owner, repo } = props;

    GithubActionsRole.validateOwner(scope, owner);
    GithubActionsRole.validateRepo(scope, repo);
    GithubActionsRole.validateRoleProps(scope, props);

    const subject = GithubActionsRole.formatSubject(props);
    const roleProps = GithubActionsRole.extractRoleProps(props);

    super(scope, id, {
      ...roleProps,
      assumedBy: new iam.WebIdentityPrincipal(provider.openIdConnectProviderArn, {
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

