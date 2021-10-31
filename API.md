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

##### `github`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.github"></a>

```typescript
public readonly github: GithubConfiguration;
```

- *Type:* [`@aripalo/aws-cdk-github-oidc.GithubConfiguration`](#@aripalo/aws-cdk-github-oidc.GithubConfiguration)

---

##### `role`<sup>Required</sup> <a name="@aripalo/aws-cdk-github-oidc.GithubActionsRoleProps.property.role"></a>

```typescript
public readonly role: RoleProps;
```

- *Type:* [`@aws-cdk/aws-iam.RoleProps`](#@aws-cdk/aws-iam.RoleProps)

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

