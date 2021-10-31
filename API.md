# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### GithubActionsIdentityProvider <a name="@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider"></a>

- *Implements:* [`@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider`](#@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider)

#### Initializers <a name="@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider.Initializer"></a>

```typescript
import { GithubActionsIdentityProvider } from '@aripalo/aws-cdk-github-oidc'

new GithubActionsIdentityProvider(scope: Construct, id: string)
```

##### `scope`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider.parameter.id"></a>

- *Type:* `string`

---


#### Static Functions <a name="Static Functions"></a>

##### `fromLookup` <a name="@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider.fromLookup"></a>

```typescript
import { GithubActionsIdentityProvider } from '@aripalo/aws-cdk-github-oidc'

GithubActionsIdentityProvider.fromLookup(scope: Construct, id: string)
```

###### `scope`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

###### `id`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider.parameter.id"></a>

- *Type:* `string`

---


#### Constants <a name="Constants"></a>

##### `issuer` <a name="@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider.property.issuer"></a>

- *Type:* `string`

---

##### `thumbprint` <a name="@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider.property.thumbprint"></a>

- *Type:* `string`

---

### GithubActionsRole <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRole"></a>

#### Initializers <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRole.Initializer"></a>

```typescript
import { GithubActionsRole } from '@aripalo/aws-cdk-github-oidc'

new GithubActionsRole(scope: Construct, id: string, props: GithubActionsRoleProps)
```

##### `scope`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRole.parameter.scope"></a>

- *Type:* [`@aws-cdk/core.Construct`](#@aws-cdk/core.Construct)

---

##### `id`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRole.parameter.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRole.parameter.props"></a>

- *Type:* [`@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps`](#@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps)

---





## Structs <a name="Structs"></a>

### GithubActionsRoleProps <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { GithubActionsRoleProps } from '@aripalo/aws-cdk-github-oidc'

const githubActionsRoleProps: GithubActionsRoleProps = { ... }
```

##### `owner`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.owner"></a>

```typescript
public readonly owner: string;
```

- *Type:* `string`

---

##### `provider`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.provider"></a>

```typescript
public readonly provider: IGithubActionsIdentityProvider;
```

- *Type:* [`@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider`](#@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider)

---

##### `repo`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.repo"></a>

```typescript
public readonly repo: string;
```

- *Type:* `string`

---

##### `filter`<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.filter"></a>

```typescript
public readonly filter: string;
```

- *Type:* `string`

---

##### `assumedBy`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.assumedBy"></a>

```typescript
public readonly assumedBy: IPrincipal;
```

- *Type:* [`@aws-cdk/aws-iam.IPrincipal`](#@aws-cdk/aws-iam.IPrincipal)

The IAM principal (i.e. `new ServicePrincipal('sns.amazonaws.com')`) which can assume this role.

You can later modify the assume role policy document by accessing it via
the `assumeRolePolicy` property.

---

##### `description`<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* `string`
- *Default:* No description.

A description of the role.

It can be up to 1000 characters long.

---

##### ~~`externalId`~~<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.externalId"></a>

- *Deprecated:* see {@link externalIds}

```typescript
public readonly externalId: string;
```

- *Type:* `string`
- *Default:* No external ID required

ID that the role assumer needs to provide when assuming this role.

If the configured and provided external IDs do not match, the
AssumeRole operation will fail.

---

##### `externalIds`<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.externalIds"></a>

```typescript
public readonly externalIds: string[];
```

- *Type:* `string`[]
- *Default:* No external ID required

List of IDs that the role assumer needs to provide one of when assuming this role.

If the configured and provided external IDs do not match, the
AssumeRole operation will fail.

---

##### `inlinePolicies`<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.inlinePolicies"></a>

```typescript
public readonly inlinePolicies: {[ key: string ]: PolicyDocument};
```

- *Type:* {[ key: string ]: [`@aws-cdk/aws-iam.PolicyDocument`](#@aws-cdk/aws-iam.PolicyDocument)}
- *Default:* No policy is inlined in the Role resource.

A list of named policies to inline into this role.

These policies will be
created with the role, whereas those added by ``addToPolicy`` are added
using a separate CloudFormation resource (allowing a way around circular
dependencies that could otherwise be introduced).

---

##### `managedPolicies`<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.managedPolicies"></a>

```typescript
public readonly managedPolicies: IManagedPolicy[];
```

- *Type:* [`@aws-cdk/aws-iam.IManagedPolicy`](#@aws-cdk/aws-iam.IManagedPolicy)[]
- *Default:* No managed policies.

A list of managed policies associated with this role.

You can add managed policies later using
`addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(policyName))`.

---

##### `maxSessionDuration`<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.maxSessionDuration"></a>

```typescript
public readonly maxSessionDuration: Duration;
```

- *Type:* [`@aws-cdk/core.Duration`](#@aws-cdk/core.Duration)
- *Default:* Duration.hours(1)

The maximum session duration that you want to set for the specified role.

This setting can have a value from 1 hour (3600sec) to 12 (43200sec) hours.

Anyone who assumes the role from the AWS CLI or API can use the
DurationSeconds API parameter or the duration-seconds CLI parameter to
request a longer session. The MaxSessionDuration setting determines the
maximum duration that can be requested using the DurationSeconds
parameter.

If users don't specify a value for the DurationSeconds parameter, their
security credentials are valid for one hour by default. This applies when
you use the AssumeRole* API operations or the assume-role* CLI operations
but does not apply when you use those operations to create a console URL.

> [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html)

---

##### `path`<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* `string`
- *Default:* /

The path associated with this role.

For information about IAM paths, see
Friendly Names and Paths in IAM User Guide.

---

##### `permissionsBoundary`<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: IManagedPolicy;
```

- *Type:* [`@aws-cdk/aws-iam.IManagedPolicy`](#@aws-cdk/aws-iam.IManagedPolicy)
- *Default:* No permissions boundary.

AWS supports permissions boundaries for IAM entities (users or roles).

A permissions boundary is an advanced feature for using a managed policy
to set the maximum permissions that an identity-based policy can grant to
an IAM entity. An entity's permissions boundary allows it to perform only
the actions that are allowed by both its identity-based policies and its
permissions boundaries.

> [https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)

---

##### `roleName`<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* `string`
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID
for the role name.

A name for the IAM role.

For valid values, see the RoleName parameter for
the CreateRole action in the IAM API Reference.

IMPORTANT: If you specify a name, you cannot perform updates that require
replacement of this resource. You can perform updates that require no or
some interruption. If you must replace the resource, specify a new name.

If you specify a name, you must specify the CAPABILITY_NAMED_IAM value to
acknowledge your template's capabilities. For more information, see
Acknowledging IAM Resources in AWS CloudFormation Templates.

---

### GithubConfiguration <a name="@aripalo/aws-cdk-github-oidc.GithubConfiguration"></a>

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { GithubConfiguration } from '@aripalo/aws-cdk-github-oidc'

const githubConfiguration: GithubConfiguration = { ... }
```

##### `owner`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubConfiguration.property.owner"></a>

```typescript
public readonly owner: string;
```

- *Type:* `string`

---

##### `provider`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubConfiguration.property.provider"></a>

```typescript
public readonly provider: IGithubActionsIdentityProvider;
```

- *Type:* [`@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider`](#@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider)

---

##### `repo`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubConfiguration.property.repo"></a>

```typescript
public readonly repo: string;
```

- *Type:* `string`

---

##### `filter`<sup>Optional</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubConfiguration.property.filter"></a>

```typescript
public readonly filter: string;
```

- *Type:* `string`

---


## Protocols <a name="Protocols"></a>

### IGithubActionsIdentityProvider <a name="@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider"></a>

- *Extends:* [`@aws-cdk/aws-iam.IOpenIdConnectProvider`](#@aws-cdk/aws-iam.IOpenIdConnectProvider)

- *Implemented By:* [`@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider`](#@aripalo/aws-cdk-github-oidc.GithubActionsIdentityProvider), [`@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider`](#@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider)


#### Properties <a name="Properties"></a>

##### `node`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.node"></a>

```typescript
public readonly node: ConstructNode;
```

- *Type:* [`@aws-cdk/core.ConstructNode`](#@aws-cdk/core.ConstructNode)

The construct tree node for this construct.

---

##### `env`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* [`@aws-cdk/core.ResourceEnvironment`](#@aws-cdk/core.ResourceEnvironment)

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* [`@aws-cdk/core.Stack`](#@aws-cdk/core.Stack)

The stack in which this resource is defined.

---

##### `openIdConnectProviderArn`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.openIdConnectProviderArn"></a>

```typescript
public readonly openIdConnectProviderArn: string;
```

- *Type:* `string`

The Amazon Resource Name (ARN) of the IAM OpenID Connect provider.

---

##### `openIdConnectProviderIssuer`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.openIdConnectProviderIssuer"></a>

```typescript
public readonly openIdConnectProviderIssuer: string;
```

- *Type:* `string`

The issuer for OIDC Provider.

---

