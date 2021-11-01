import * as iam from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';
import githubUsernameRegex from './owner-regexp';
import { GithubActionsIdentityProvider, IGithubActionsIdentityProvider } from './provider';

/**
 * Github related configuration that forms the trust policy for this IAM Role.
 */
export interface GithubConfiguration {

  /**
   * Reference to Github OpenID Connect Provider configured in AWS IAM.
   *
   * Either pass an construct defined by `new GithubActionsIdentityProvider`
   * or a retrieved reference from `GithubActionsIdentityProvider.fromAccount`.
   * There can be only one (per AWS Account).
   */
  readonly provider: IGithubActionsIdentityProvider;

  /**
   * Repository owner (organization or username).
   *
   * @example
   * 'octo-org'
   */
  readonly owner: string;

  /**
   * Repository name (slug) without the owner.
   *
   * @example
   * 'octo-repo'
   */
  readonly repo: string;

  /**
   * Subject condition filter, appended after `repo:${owner}/${repo}:` string in IAM Role trust relationship.
   *
   * @default
   * '*'
   *
   * You may use this value to only allow Github to assume the role on specific branches, tags, environments, pull requests etc.
   * @example
   * 'ref:refs/tags/v*'
   * 'ref:refs/heads/demo-branch'
   * 'pull_request'
   * 'environment:Production'
   *
   * @see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#examples
   */
  readonly filter?: string;
}

/**
 * Props that define the IAM Role that can be assumed by Github Actions workflow
 * via Github OpenID Connect Identity Provider.
 *
 * Besides `GithubConfiguration`, you may pass in any `iam.RoleProps` except `assumedBy`
 * which will be defined by this construct (CDK will fail if you do).
 *
 * @example
 * {
 *   provider: GithubActionsIdentityProvider.fromAccount(scope, "GithubProvider"),
 *   owner: 'octo-org',
 *   repo: 'octo-repo',
 *   filter: 'ref:refs/tags/v*',
 *   roleName: 'MyDeployRole',
 * }
 */
export interface GithubActionsRoleProps extends GithubConfiguration, Partial<iam.RoleProps> {}

/**
 * Define an IAM Role that can be assumed by Github Actions workflow
 * via Github OpenID Connect Identity Provider.
 *
 * Besides `GithubConfiguration`, you may pass in any `iam.RoleProps` except `assumedBy`
 * which will be defined by this construct (CDK will fail if you do).
 *
 * @example
 * const uploadRole = new GithubActionsRole(scope, "UploadRole", {
 *   provider: GithubActionsIdentityProvider.fromAccount(scope, "GithubProvider"),
 *   owner: 'octo-org',
 *   repo: 'octo-repo',
 *   filter: 'ref:refs/tags/v*',
 *   roleName: 'MyUploadRole',
 * });
 *
 * myBucket.grantWrite(uploadRole);
 */
export class GithubActionsRole extends iam.Role {

  /**
   * Extracts props given for the created IAM Role Construct.
   * @param props for the GithubActionsRole
   * @returns for the IAM Role
   */
  private static extractRoleProps(props: GithubActionsRoleProps): iam.RoleProps {
    const extractProps = <any>props;
    delete extractProps.provider;
    delete extractProps.owner;
    delete extractProps.repo;
    delete extractProps.filter;
    return extractProps;
  }

  /** Validates the Github owner (organization or user) name. */
  private static validateOwner(scope: cdk.Construct, owner: string): void {
    if (githubUsernameRegex.test(owner) !== true) {
      cdk.Annotations.of(scope).addError(`Invalid Github Repository Owner "${owner}". Must only contain alphanumeric characters or hyphens, cannot have multiple consecutive hyphens, cannot begin or end with a hypen and maximum lenght is 39 characters.`);
    }
  }

  /** Validates the Github repository name (without owner). */
  private static validateRepo(scope: cdk.Construct, repo: string): void {
    if (repo === '') {
      cdk.Annotations.of(scope).addError(`Invalid Github Repository Name "${repo}". May not be empty string.`);
    }
  }

  /** Validate IAM Role related props: I.e. ensure no `assumedBy` was given. */
  private static validateRoleProps(scope: cdk.Construct, props: Partial<iam.RoleProps>): void {
    if (props.assumedBy) {
      cdk.Annotations.of(scope).addError('Do not provide "assumedBy" property yourself. It will be defined by GithubActionsRole automatically.');
    }
  }

  /** Formats the `sub` value used in trust policy. */
  private static formatSubject(props: GithubConfiguration): string {
    const { owner, repo, filter = '*' } = props;
    return `repo:${owner}/${repo}:${filter}`;
  }


  /**
   * Define an IAM Role that can be assumed by Github Actions workflow
   * via Github OpenID Connect Identity Provider.
   *
   * Besides `GithubConfiguration`, you may pass in any `iam.RoleProps` except `assumedBy`
   * which will be defined by this construct (CDK will fail if you do).
   *
   * @example
   * const uploadRole = new GithubActionsRole(scope, "UploadRole", {
   *   provider: GithubActionsIdentityProvider.fromAccount(scope, "GithubProvider"),
   *   owner: 'octo-org',
   *   repo: 'octo-repo',
   *   filter: 'ref:refs/tags/v*',
   *   roleName: 'MyUploadRole',
   * });
   *
   * myBucket.grantWrite(uploadRole);
   */
  constructor(scope: cdk.Construct, id: string, props: GithubActionsRoleProps) {

    const { provider, owner, repo } = props;

    // Perform validations
    GithubActionsRole.validateOwner(scope, owner);
    GithubActionsRole.validateRepo(scope, repo);
    GithubActionsRole.validateRoleProps(scope, props);

    // Prepare values
    const subject = GithubActionsRole.formatSubject(props);
    const roleProps = GithubActionsRole.extractRoleProps(props);

    // The actual IAM Role creation
    super(scope, id, {
      ...roleProps,
      assumedBy: new iam.WebIdentityPrincipal(provider.openIdConnectProviderArn, {
        StringLike: {
          // Only allow specified subjects to assume this role
          [`${GithubActionsIdentityProvider.issuer}:sub`]: subject,
        },
        StringEquals: {
          // Audience is always sts.amazonaws.com with AWS official Github Action
          // https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-the-identity-provider-to-aws
          [`${GithubActionsIdentityProvider.issuer}:aud`]: 'sts.amazonaws.com',
        },
      }),
    });

  }
}

