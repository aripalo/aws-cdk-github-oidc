# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### GithubActionsIdentityProvider <a name="GithubActionsIdentityProvider" id="aws-cdk-github-oidc.GithubActionsIdentityProvider"></a>

- *Implements:* <a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider">IGithubActionsIdentityProvider</a>

Github Actions as OpenID Connect Identity Provider for AWS IAM. There can be only one (per AWS Account).

Use `fromAccount` to retrieve a reference to existing Github OIDC provider.

Uses the native CloudFormation resource AWS::IAM::OIDCProvider (no Lambda functions).

> [https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)

#### Initializers <a name="Initializers" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.Initializer"></a>

```typescript
import { GithubActionsIdentityProvider } from 'aws-cdk-github-oidc'

new GithubActionsIdentityProvider(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | CDK Stack or Construct to which the provider is assigned to. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.Initializer.parameter.id">id</a></code> | <code>string</code> | CDK Construct ID given to the construct. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

CDK Stack or Construct to which the provider is assigned to.

---

##### `id`<sup>Required</sup> <a name="id" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.Initializer.parameter.id"></a>

- *Type:* string

CDK Construct ID given to the construct.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |

---

##### `toString` <a name="toString" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.fromOidcProviderArn">fromOidcProviderArn</a></code> | Imports an Open ID connect provider from an ARN. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.fromAccount">fromAccount</a></code> | Retrieve a reference to existing Github OIDC provider in your AWS account. |

---

##### `isConstruct` <a name="isConstruct" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.isConstruct"></a>

```typescript
import { GithubActionsIdentityProvider } from 'aws-cdk-github-oidc'

GithubActionsIdentityProvider.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.isOwnedResource"></a>

```typescript
import { GithubActionsIdentityProvider } from 'aws-cdk-github-oidc'

GithubActionsIdentityProvider.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.isResource"></a>

```typescript
import { GithubActionsIdentityProvider } from 'aws-cdk-github-oidc'

GithubActionsIdentityProvider.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromOidcProviderArn` <a name="fromOidcProviderArn" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.fromOidcProviderArn"></a>

```typescript
import { GithubActionsIdentityProvider } from 'aws-cdk-github-oidc'

GithubActionsIdentityProvider.fromOidcProviderArn(scope: Construct, id: string, oidcProviderArn: string)
```

Imports an Open ID connect provider from an ARN.

###### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.fromOidcProviderArn.parameter.scope"></a>

- *Type:* constructs.Construct

The definition scope.

---

###### `id`<sup>Required</sup> <a name="id" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.fromOidcProviderArn.parameter.id"></a>

- *Type:* string

ID of the construct.

---

###### `oidcProviderArn`<sup>Required</sup> <a name="oidcProviderArn" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.fromOidcProviderArn.parameter.oidcProviderArn"></a>

- *Type:* string

the ARN to import.

---

##### `fromAccount` <a name="fromAccount" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.fromAccount"></a>

```typescript
import { GithubActionsIdentityProvider } from 'aws-cdk-github-oidc'

GithubActionsIdentityProvider.fromAccount(scope: Construct, id: string)
```

Retrieve a reference to existing Github OIDC provider in your AWS account.

An AWS account can only have single Github OIDC provider configured into it,
so internally the reference is made by constructing the ARN from AWS
Account ID & Github issuer URL.

*Example*

```typescript
GithubActionsIdentityProvider.fromAccount(scope, "GithubProvider");
```


###### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.fromAccount.parameter.scope"></a>

- *Type:* constructs.Construct

CDK Stack or Construct to which the provider is assigned to.

---

###### `id`<sup>Required</sup> <a name="id" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.fromAccount.parameter.id"></a>

- *Type:* string

CDK Construct ID given to the construct.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.property.oidcProviderArn">oidcProviderArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of the Native IAM OpenID Connect provider. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.property.oidcProviderIssuer">oidcProviderIssuer</a></code> | <code>string</code> | The issuer for the Native OIDC Provider. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.property.oidcProviderRef">oidcProviderRef</a></code> | <code>aws-cdk-lib.aws_iam.OIDCProviderReference</code> | A reference to a OIDCProvider resource. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.property.oidcProviderThumbprints">oidcProviderThumbprints</a></code> | <code>string</code> | The thumbprints configured for this provider. |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `oidcProviderArn`<sup>Required</sup> <a name="oidcProviderArn" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.property.oidcProviderArn"></a>

```typescript
public readonly oidcProviderArn: string;
```

- *Type:* string

The Amazon Resource Name (ARN) of the Native IAM OpenID Connect provider.

---

##### `oidcProviderIssuer`<sup>Required</sup> <a name="oidcProviderIssuer" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.property.oidcProviderIssuer"></a>

```typescript
public readonly oidcProviderIssuer: string;
```

- *Type:* string

The issuer for the Native OIDC Provider.

---

##### `oidcProviderRef`<sup>Required</sup> <a name="oidcProviderRef" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.property.oidcProviderRef"></a>

```typescript
public readonly oidcProviderRef: OIDCProviderReference;
```

- *Type:* aws-cdk-lib.aws_iam.OIDCProviderReference

A reference to a OIDCProvider resource.

---

##### `oidcProviderThumbprints`<sup>Required</sup> <a name="oidcProviderThumbprints" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.property.oidcProviderThumbprints"></a>

```typescript
public readonly oidcProviderThumbprints: string;
```

- *Type:* string

The thumbprints configured for this provider.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.property.PROPERTY_INJECTION_ID">PROPERTY_INJECTION_ID</a></code> | <code>string</code> | Uniquely identifies this class. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider.property.issuer">issuer</a></code> | <code>string</code> | *No description.* |

---

##### `PROPERTY_INJECTION_ID`<sup>Required</sup> <a name="PROPERTY_INJECTION_ID" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.property.PROPERTY_INJECTION_ID"></a>

```typescript
public readonly PROPERTY_INJECTION_ID: string;
```

- *Type:* string

Uniquely identifies this class.

---

##### `issuer`<sup>Required</sup> <a name="issuer" id="aws-cdk-github-oidc.GithubActionsIdentityProvider.property.issuer"></a>

```typescript
public readonly issuer: string;
```

- *Type:* string

---

### GithubActionsRole <a name="GithubActionsRole" id="aws-cdk-github-oidc.GithubActionsRole"></a>

Define an IAM Role that can be assumed by Github Actions workflow via Github OpenID Connect Identity Provider.

Besides `GithubConfiguration`, you may pass in any `iam.RoleProps` except `assumedBy`
which will be defined by this construct (CDK will fail if you do).

*Example*

```typescript
const uploadRole = new GithubActionsRole(scope, "UploadRole", {
  provider: GithubActionsIdentityProvider.fromAccount(scope, "GithubProvider"),
  owner: 'octo-org',
  repo: 'octo-repo',
  filter: 'ref:refs/tags/v*',
  roleName: 'MyUploadRole',
});

myBucket.grantWrite(uploadRole);
```


#### Initializers <a name="Initializers" id="aws-cdk-github-oidc.GithubActionsRole.Initializer"></a>

```typescript
import { GithubActionsRole } from 'aws-cdk-github-oidc'

new GithubActionsRole(scope: Construct, id: string, props: GithubActionsRoleProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.Initializer.parameter.props">props</a></code> | <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps">GithubActionsRoleProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-github-oidc.GithubActionsRole.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="aws-cdk-github-oidc.GithubActionsRole.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="aws-cdk-github-oidc.GithubActionsRole.Initializer.parameter.props"></a>

- *Type:* <a href="#aws-cdk-github-oidc.GithubActionsRoleProps">GithubActionsRoleProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.applyRemovalPolicy">applyRemovalPolicy</a></code> | Skip applyRemovalPolicy if role synthesis is prevented by customizeRoles. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.addManagedPolicy">addManagedPolicy</a></code> | Attaches a managed policy to this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.addToPolicy">addToPolicy</a></code> | Add to the policy of this principal. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.addToPrincipalPolicy">addToPrincipalPolicy</a></code> | Adds a permission to the role's default policy document. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.attachInlinePolicy">attachInlinePolicy</a></code> | Attaches a policy to this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.grant">grant</a></code> | Grant the actions defined in actions to the identity Principal on this resource. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.grantAssumeRole">grantAssumeRole</a></code> | Grant permissions to the given principal to assume this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.grantPassRole">grantPassRole</a></code> | Grant permissions to the given principal to pass this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.withoutPolicyUpdates">withoutPolicyUpdates</a></code> | Return a copy of this Role object whose Policies will not be updated. |

---

##### `toString` <a name="toString" id="aws-cdk-github-oidc.GithubActionsRole.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="aws-cdk-github-oidc.GithubActionsRole.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Skip applyRemovalPolicy if role synthesis is prevented by customizeRoles.

Because in this case, this construct does not have a CfnResource in the tree.

###### `policy`<sup>Required</sup> <a name="policy" id="aws-cdk-github-oidc.GithubActionsRole.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

RemovalPolicy.

---

##### `addManagedPolicy` <a name="addManagedPolicy" id="aws-cdk-github-oidc.GithubActionsRole.addManagedPolicy"></a>

```typescript
public addManagedPolicy(policy: IManagedPolicy): void
```

Attaches a managed policy to this role.

###### `policy`<sup>Required</sup> <a name="policy" id="aws-cdk-github-oidc.GithubActionsRole.addManagedPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

The the managed policy to attach.

---

##### `addToPolicy` <a name="addToPolicy" id="aws-cdk-github-oidc.GithubActionsRole.addToPolicy"></a>

```typescript
public addToPolicy(statement: PolicyStatement): boolean
```

Add to the policy of this principal.

###### `statement`<sup>Required</sup> <a name="statement" id="aws-cdk-github-oidc.GithubActionsRole.addToPolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

---

##### `addToPrincipalPolicy` <a name="addToPrincipalPolicy" id="aws-cdk-github-oidc.GithubActionsRole.addToPrincipalPolicy"></a>

```typescript
public addToPrincipalPolicy(statement: PolicyStatement): AddToPrincipalPolicyResult
```

Adds a permission to the role's default policy document.

If there is no default policy attached to this role, it will be created.

###### `statement`<sup>Required</sup> <a name="statement" id="aws-cdk-github-oidc.GithubActionsRole.addToPrincipalPolicy.parameter.statement"></a>

- *Type:* aws-cdk-lib.aws_iam.PolicyStatement

The permission statement to add to the policy document.

---

##### `attachInlinePolicy` <a name="attachInlinePolicy" id="aws-cdk-github-oidc.GithubActionsRole.attachInlinePolicy"></a>

```typescript
public attachInlinePolicy(policy: Policy): void
```

Attaches a policy to this role.

###### `policy`<sup>Required</sup> <a name="policy" id="aws-cdk-github-oidc.GithubActionsRole.attachInlinePolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.aws_iam.Policy

The policy to attach.

---

##### `grant` <a name="grant" id="aws-cdk-github-oidc.GithubActionsRole.grant"></a>

```typescript
public grant(grantee: IPrincipal, actions: ...string[]): Grant
```

Grant the actions defined in actions to the identity Principal on this resource.

###### `grantee`<sup>Required</sup> <a name="grantee" id="aws-cdk-github-oidc.GithubActionsRole.grant.parameter.grantee"></a>

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

---

###### `actions`<sup>Required</sup> <a name="actions" id="aws-cdk-github-oidc.GithubActionsRole.grant.parameter.actions"></a>

- *Type:* ...string[]

---

##### `grantAssumeRole` <a name="grantAssumeRole" id="aws-cdk-github-oidc.GithubActionsRole.grantAssumeRole"></a>

```typescript
public grantAssumeRole(identity: IPrincipal): Grant
```

Grant permissions to the given principal to assume this role.

###### `identity`<sup>Required</sup> <a name="identity" id="aws-cdk-github-oidc.GithubActionsRole.grantAssumeRole.parameter.identity"></a>

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

---

##### `grantPassRole` <a name="grantPassRole" id="aws-cdk-github-oidc.GithubActionsRole.grantPassRole"></a>

```typescript
public grantPassRole(identity: IPrincipal): Grant
```

Grant permissions to the given principal to pass this role.

###### `identity`<sup>Required</sup> <a name="identity" id="aws-cdk-github-oidc.GithubActionsRole.grantPassRole.parameter.identity"></a>

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

---

##### `withoutPolicyUpdates` <a name="withoutPolicyUpdates" id="aws-cdk-github-oidc.GithubActionsRole.withoutPolicyUpdates"></a>

```typescript
public withoutPolicyUpdates(options?: WithoutPolicyUpdatesOptions): IRole
```

Return a copy of this Role object whose Policies will not be updated.

Use the object returned by this method if you want this Role to be used by
a construct without it automatically updating the Role's Policies.

If you do, you are responsible for adding the correct statements to the
Role's policies yourself.

###### `options`<sup>Optional</sup> <a name="options" id="aws-cdk-github-oidc.GithubActionsRole.withoutPolicyUpdates.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_iam.WithoutPolicyUpdatesOptions

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.customizeRoles">customizeRoles</a></code> | Customize the creation of IAM roles within the given scope. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.fromLookup">fromLookup</a></code> | Lookup an existing Role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.fromRoleArn">fromRoleArn</a></code> | Import an external role by ARN. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.fromRoleName">fromRoleName</a></code> | Import an external role by name. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.isRole">isRole</a></code> | Return whether the given object is a Role. |

---

##### `isConstruct` <a name="isConstruct" id="aws-cdk-github-oidc.GithubActionsRole.isConstruct"></a>

```typescript
import { GithubActionsRole } from 'aws-cdk-github-oidc'

GithubActionsRole.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="aws-cdk-github-oidc.GithubActionsRole.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="aws-cdk-github-oidc.GithubActionsRole.isOwnedResource"></a>

```typescript
import { GithubActionsRole } from 'aws-cdk-github-oidc'

GithubActionsRole.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="aws-cdk-github-oidc.GithubActionsRole.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="aws-cdk-github-oidc.GithubActionsRole.isResource"></a>

```typescript
import { GithubActionsRole } from 'aws-cdk-github-oidc'

GithubActionsRole.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="aws-cdk-github-oidc.GithubActionsRole.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `customizeRoles` <a name="customizeRoles" id="aws-cdk-github-oidc.GithubActionsRole.customizeRoles"></a>

```typescript
import { GithubActionsRole } from 'aws-cdk-github-oidc'

GithubActionsRole.customizeRoles(scope: Construct, options?: CustomizeRolesOptions)
```

Customize the creation of IAM roles within the given scope.

It is recommended that you **do not** use this method and instead allow
CDK to manage role creation. This should only be used
in environments where CDK applications are not allowed to created IAM roles.

This can be used to prevent the CDK application from creating roles
within the given scope and instead replace the references to the roles with
precreated role names. A report will be synthesized in the cloud assembly (i.e. cdk.out)
that will contain the list of IAM roles that would have been created along with the
IAM policy statements that the role should contain. This report can then be used
to create the IAM roles outside of CDK and then the created role names can be provided
in `usePrecreatedRoles`.

*Example*

```typescript
declare const app: App;
iam.Role.customizeRoles(app, {
  usePrecreatedRoles: {
    'ConstructPath/To/Role': 'my-precreated-role-name',
  },
});
```


###### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-github-oidc.GithubActionsRole.customizeRoles.parameter.scope"></a>

- *Type:* constructs.Construct

construct scope to customize role creation.

---

###### `options`<sup>Optional</sup> <a name="options" id="aws-cdk-github-oidc.GithubActionsRole.customizeRoles.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_iam.CustomizeRolesOptions

options for configuring role creation.

---

##### `fromLookup` <a name="fromLookup" id="aws-cdk-github-oidc.GithubActionsRole.fromLookup"></a>

```typescript
import { GithubActionsRole } from 'aws-cdk-github-oidc'

GithubActionsRole.fromLookup(scope: Construct, id: string, options: RoleLookupOptions)
```

Lookup an existing Role.

###### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-github-oidc.GithubActionsRole.fromLookup.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="aws-cdk-github-oidc.GithubActionsRole.fromLookup.parameter.id"></a>

- *Type:* string

---

###### `options`<sup>Required</sup> <a name="options" id="aws-cdk-github-oidc.GithubActionsRole.fromLookup.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_iam.RoleLookupOptions

---

##### `fromRoleArn` <a name="fromRoleArn" id="aws-cdk-github-oidc.GithubActionsRole.fromRoleArn"></a>

```typescript
import { GithubActionsRole } from 'aws-cdk-github-oidc'

GithubActionsRole.fromRoleArn(scope: Construct, id: string, roleArn: string, options?: FromRoleArnOptions)
```

Import an external role by ARN.

If the imported Role ARN is a Token (such as a
`CfnParameter.valueAsString` or a `Fn.importValue()`) *and* the referenced
role has a `path` (like `arn:...:role/AdminRoles/Alice`), the
`roleName` property will not resolve to the correct value. Instead it
will resolve to the first path component. We unfortunately cannot express
the correct calculation of the full path name as a CloudFormation
expression. In this scenario the Role ARN should be supplied without the
`path` in order to resolve the correct role resource.

###### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-github-oidc.GithubActionsRole.fromRoleArn.parameter.scope"></a>

- *Type:* constructs.Construct

construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="aws-cdk-github-oidc.GithubActionsRole.fromRoleArn.parameter.id"></a>

- *Type:* string

construct id.

---

###### `roleArn`<sup>Required</sup> <a name="roleArn" id="aws-cdk-github-oidc.GithubActionsRole.fromRoleArn.parameter.roleArn"></a>

- *Type:* string

the ARN of the role to import.

---

###### `options`<sup>Optional</sup> <a name="options" id="aws-cdk-github-oidc.GithubActionsRole.fromRoleArn.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_iam.FromRoleArnOptions

allow customizing the behavior of the returned role.

---

##### `fromRoleName` <a name="fromRoleName" id="aws-cdk-github-oidc.GithubActionsRole.fromRoleName"></a>

```typescript
import { GithubActionsRole } from 'aws-cdk-github-oidc'

GithubActionsRole.fromRoleName(scope: Construct, id: string, roleName: string, options?: FromRoleNameOptions)
```

Import an external role by name.

The imported role is assumed to exist in the same account as the account
the scope's containing Stack is being deployed to.

###### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-github-oidc.GithubActionsRole.fromRoleName.parameter.scope"></a>

- *Type:* constructs.Construct

construct scope.

---

###### `id`<sup>Required</sup> <a name="id" id="aws-cdk-github-oidc.GithubActionsRole.fromRoleName.parameter.id"></a>

- *Type:* string

construct id.

---

###### `roleName`<sup>Required</sup> <a name="roleName" id="aws-cdk-github-oidc.GithubActionsRole.fromRoleName.parameter.roleName"></a>

- *Type:* string

the name of the role to import.

---

###### `options`<sup>Optional</sup> <a name="options" id="aws-cdk-github-oidc.GithubActionsRole.fromRoleName.parameter.options"></a>

- *Type:* aws-cdk-lib.aws_iam.FromRoleNameOptions

allow customizing the behavior of the returned role.

---

##### `isRole` <a name="isRole" id="aws-cdk-github-oidc.GithubActionsRole.isRole"></a>

```typescript
import { GithubActionsRole } from 'aws-cdk-github-oidc'

GithubActionsRole.isRole(x: any)
```

Return whether the given object is a Role.

###### `x`<sup>Required</sup> <a name="x" id="aws-cdk-github-oidc.GithubActionsRole.isRole.parameter.x"></a>

- *Type:* any

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.assumeRoleAction">assumeRoleAction</a></code> | <code>string</code> | When this Principal is used in an AssumeRole policy, the action to use. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.grantPrincipal">grantPrincipal</a></code> | <code>aws-cdk-lib.aws_iam.IPrincipal</code> | The principal to grant permissions to. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.policyFragment">policyFragment</a></code> | <code>aws-cdk-lib.aws_iam.PrincipalPolicyFragment</code> | Returns the role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.roleArn">roleArn</a></code> | <code>string</code> | Returns the ARN of this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.roleId">roleId</a></code> | <code>string</code> | Returns the stable and unique string identifying the role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.roleName">roleName</a></code> | <code>string</code> | Returns the name of the role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.roleRef">roleRef</a></code> | <code>aws-cdk-lib.aws_iam.RoleReference</code> | A reference to a Role resource. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.assumeRolePolicy">assumeRolePolicy</a></code> | <code>aws-cdk-lib.aws_iam.PolicyDocument</code> | The assume role policy document associated with this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | Returns the permissions boundary attached to this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.principalAccount">principalAccount</a></code> | <code>string</code> | The AWS account ID of this principal. |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-cdk-github-oidc.GithubActionsRole.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="aws-cdk-github-oidc.GithubActionsRole.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="aws-cdk-github-oidc.GithubActionsRole.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `assumeRoleAction`<sup>Required</sup> <a name="assumeRoleAction" id="aws-cdk-github-oidc.GithubActionsRole.property.assumeRoleAction"></a>

```typescript
public readonly assumeRoleAction: string;
```

- *Type:* string

When this Principal is used in an AssumeRole policy, the action to use.

---

##### `grantPrincipal`<sup>Required</sup> <a name="grantPrincipal" id="aws-cdk-github-oidc.GithubActionsRole.property.grantPrincipal"></a>

```typescript
public readonly grantPrincipal: IPrincipal;
```

- *Type:* aws-cdk-lib.aws_iam.IPrincipal

The principal to grant permissions to.

---

##### `policyFragment`<sup>Required</sup> <a name="policyFragment" id="aws-cdk-github-oidc.GithubActionsRole.property.policyFragment"></a>

```typescript
public readonly policyFragment: PrincipalPolicyFragment;
```

- *Type:* aws-cdk-lib.aws_iam.PrincipalPolicyFragment

Returns the role.

---

##### `roleArn`<sup>Required</sup> <a name="roleArn" id="aws-cdk-github-oidc.GithubActionsRole.property.roleArn"></a>

```typescript
public readonly roleArn: string;
```

- *Type:* string

Returns the ARN of this role.

---

##### `roleId`<sup>Required</sup> <a name="roleId" id="aws-cdk-github-oidc.GithubActionsRole.property.roleId"></a>

```typescript
public readonly roleId: string;
```

- *Type:* string

Returns the stable and unique string identifying the role.

For example,
AIDAJQABLZS4A3QDU576Q.

---

##### `roleName`<sup>Required</sup> <a name="roleName" id="aws-cdk-github-oidc.GithubActionsRole.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string

Returns the name of the role.

---

##### `roleRef`<sup>Required</sup> <a name="roleRef" id="aws-cdk-github-oidc.GithubActionsRole.property.roleRef"></a>

```typescript
public readonly roleRef: RoleReference;
```

- *Type:* aws-cdk-lib.aws_iam.RoleReference

A reference to a Role resource.

---

##### `assumeRolePolicy`<sup>Optional</sup> <a name="assumeRolePolicy" id="aws-cdk-github-oidc.GithubActionsRole.property.assumeRolePolicy"></a>

```typescript
public readonly assumeRolePolicy: PolicyDocument;
```

- *Type:* aws-cdk-lib.aws_iam.PolicyDocument

The assume role policy document associated with this role.

---

##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="aws-cdk-github-oidc.GithubActionsRole.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy

Returns the permissions boundary attached to this role.

---

##### `principalAccount`<sup>Optional</sup> <a name="principalAccount" id="aws-cdk-github-oidc.GithubActionsRole.property.principalAccount"></a>

```typescript
public readonly principalAccount: string;
```

- *Type:* string

The AWS account ID of this principal.

Can be undefined when the account is not known
(for example, for service principals).
Can be a Token - in that case,
it's assumed to be AWS::AccountId.

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRole.property.PROPERTY_INJECTION_ID">PROPERTY_INJECTION_ID</a></code> | <code>string</code> | Uniquely identifies this class. |

---

##### `PROPERTY_INJECTION_ID`<sup>Required</sup> <a name="PROPERTY_INJECTION_ID" id="aws-cdk-github-oidc.GithubActionsRole.property.PROPERTY_INJECTION_ID"></a>

```typescript
public readonly PROPERTY_INJECTION_ID: string;
```

- *Type:* string

Uniquely identifies this class.

---

## Structs <a name="Structs" id="Structs"></a>

### GithubActionsRoleProps <a name="GithubActionsRoleProps" id="aws-cdk-github-oidc.GithubActionsRoleProps"></a>

Props that define the IAM Role that can be assumed by Github Actions workflow via Github OpenID Connect Identity Provider.

Besides `GithubConfiguration`, you may pass in any `iam.RoleProps` except `assumedBy`
which will be defined by this construct (CDK will fail if you do).

*Example*

```typescript
{
  provider: GithubActionsIdentityProvider.fromAccount(scope, "GithubProvider"),
  owner: 'octo-org',
  repo: 'octo-repo',
  filter: 'ref:refs/tags/v*',
  roleName: 'MyDeployRole',
}
```


#### Initializer <a name="Initializer" id="aws-cdk-github-oidc.GithubActionsRoleProps.Initializer"></a>

```typescript
import { GithubActionsRoleProps } from 'aws-cdk-github-oidc'

const githubActionsRoleProps: GithubActionsRoleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.owner">owner</a></code> | <code>string</code> | Repository owner (organization or username). |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.provider">provider</a></code> | <code><a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider">IGithubActionsIdentityProvider</a></code> | Reference to Github OpenID Connect Provider configured in AWS IAM. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.repo">repo</a></code> | <code>string</code> | Repository name (slug) without the owner. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.filter">filter</a></code> | <code>string</code> | Subject condition filter, appended after `repo:${owner}/${repo}:` string in IAM Role trust relationship. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.description">description</a></code> | <code>string</code> | A description of the role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.externalIds">externalIds</a></code> | <code>string[]</code> | List of IDs that the role assumer needs to provide one of when assuming this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.inlinePolicies">inlinePolicies</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_iam.PolicyDocument}</code> | A list of named policies to inline into this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.managedPolicies">managedPolicies</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy[]</code> | A list of managed policies associated with this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.maxSessionDuration">maxSessionDuration</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum session duration that you want to set for the specified role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.path">path</a></code> | <code>string</code> | The path associated with this role. |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | AWS supports permissions boundaries for IAM entities (users or roles). |
| <code><a href="#aws-cdk-github-oidc.GithubActionsRoleProps.property.roleName">roleName</a></code> | <code>string</code> | A name for the IAM role. |

---

##### `owner`<sup>Required</sup> <a name="owner" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.owner"></a>

```typescript
public readonly owner: string;
```

- *Type:* string

Repository owner (organization or username).

---

*Example*

```typescript
'octo-org'
```


##### `provider`<sup>Required</sup> <a name="provider" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.provider"></a>

```typescript
public readonly provider: IGithubActionsIdentityProvider;
```

- *Type:* <a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider">IGithubActionsIdentityProvider</a>

Reference to Github OpenID Connect Provider configured in AWS IAM.

Either pass an construct defined by `new GithubActionsIdentityProvider`
or a retrieved reference from `GithubActionsIdentityProvider.fromAccount`.
There can be only one (per AWS Account).

---

##### `repo`<sup>Required</sup> <a name="repo" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.repo"></a>

```typescript
public readonly repo: string;
```

- *Type:* string

Repository name (slug) without the owner.

---

*Example*

```typescript
'octo-repo'
```


##### `filter`<sup>Optional</sup> <a name="filter" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.filter"></a>

```typescript
public readonly filter: string;
```

- *Type:* string
- *Default:* '*'  You may use this value to only allow Github to assume the role on specific branches, tags, environments, pull requests etc.

Subject condition filter, appended after `repo:${owner}/${repo}:` string in IAM Role trust relationship.

> [https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#examples](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#examples)

---

*Example*

```typescript
'ref:refs/tags/v*'
'ref:refs/heads/demo-branch'
'pull_request'
'environment:Production'
```


##### `description`<sup>Optional</sup> <a name="description" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the role.

It can be up to 1000 characters long.

---

##### `externalIds`<sup>Optional</sup> <a name="externalIds" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.externalIds"></a>

```typescript
public readonly externalIds: string[];
```

- *Type:* string[]
- *Default:* No external ID required

List of IDs that the role assumer needs to provide one of when assuming this role.

If the configured and provided external IDs do not match, the
AssumeRole operation will fail.

---

##### `inlinePolicies`<sup>Optional</sup> <a name="inlinePolicies" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.inlinePolicies"></a>

```typescript
public readonly inlinePolicies: {[ key: string ]: PolicyDocument};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_iam.PolicyDocument}
- *Default:* No policy is inlined in the Role resource.

A list of named policies to inline into this role.

These policies will be
created with the role, whereas those added by ``addToPolicy`` are added
using a separate CloudFormation resource (allowing a way around circular
dependencies that could otherwise be introduced).

---

##### `managedPolicies`<sup>Optional</sup> <a name="managedPolicies" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.managedPolicies"></a>

```typescript
public readonly managedPolicies: IManagedPolicy[];
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy[]
- *Default:* No managed policies.

A list of managed policies associated with this role.

You can add managed policies later using
`addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(policyName))`.

---

##### `maxSessionDuration`<sup>Optional</sup> <a name="maxSessionDuration" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.maxSessionDuration"></a>

```typescript
public readonly maxSessionDuration: Duration;
```

- *Type:* aws-cdk-lib.Duration
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

##### `path`<sup>Optional</sup> <a name="path" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string
- *Default:* /

The path associated with this role.

For information about IAM paths, see
Friendly Names and Paths in IAM User Guide.

---

##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy
- *Default:* No permissions boundary.

AWS supports permissions boundaries for IAM entities (users or roles).

A permissions boundary is an advanced feature for using a managed policy
to set the maximum permissions that an identity-based policy can grant to
an IAM entity. An entity's permissions boundary allows it to perform only
the actions that are allowed by both its identity-based policies and its
permissions boundaries.

> [https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)

---

##### `roleName`<sup>Optional</sup> <a name="roleName" id="aws-cdk-github-oidc.GithubActionsRoleProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID for the role name.

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

### GithubConfiguration <a name="GithubConfiguration" id="aws-cdk-github-oidc.GithubConfiguration"></a>

Github related configuration that forms the trust policy for this IAM Role.

#### Initializer <a name="Initializer" id="aws-cdk-github-oidc.GithubConfiguration.Initializer"></a>

```typescript
import { GithubConfiguration } from 'aws-cdk-github-oidc'

const githubConfiguration: GithubConfiguration = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-github-oidc.GithubConfiguration.property.owner">owner</a></code> | <code>string</code> | Repository owner (organization or username). |
| <code><a href="#aws-cdk-github-oidc.GithubConfiguration.property.provider">provider</a></code> | <code><a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider">IGithubActionsIdentityProvider</a></code> | Reference to Github OpenID Connect Provider configured in AWS IAM. |
| <code><a href="#aws-cdk-github-oidc.GithubConfiguration.property.repo">repo</a></code> | <code>string</code> | Repository name (slug) without the owner. |
| <code><a href="#aws-cdk-github-oidc.GithubConfiguration.property.filter">filter</a></code> | <code>string</code> | Subject condition filter, appended after `repo:${owner}/${repo}:` string in IAM Role trust relationship. |

---

##### `owner`<sup>Required</sup> <a name="owner" id="aws-cdk-github-oidc.GithubConfiguration.property.owner"></a>

```typescript
public readonly owner: string;
```

- *Type:* string

Repository owner (organization or username).

---

*Example*

```typescript
'octo-org'
```


##### `provider`<sup>Required</sup> <a name="provider" id="aws-cdk-github-oidc.GithubConfiguration.property.provider"></a>

```typescript
public readonly provider: IGithubActionsIdentityProvider;
```

- *Type:* <a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider">IGithubActionsIdentityProvider</a>

Reference to Github OpenID Connect Provider configured in AWS IAM.

Either pass an construct defined by `new GithubActionsIdentityProvider`
or a retrieved reference from `GithubActionsIdentityProvider.fromAccount`.
There can be only one (per AWS Account).

---

##### `repo`<sup>Required</sup> <a name="repo" id="aws-cdk-github-oidc.GithubConfiguration.property.repo"></a>

```typescript
public readonly repo: string;
```

- *Type:* string

Repository name (slug) without the owner.

---

*Example*

```typescript
'octo-repo'
```


##### `filter`<sup>Optional</sup> <a name="filter" id="aws-cdk-github-oidc.GithubConfiguration.property.filter"></a>

```typescript
public readonly filter: string;
```

- *Type:* string
- *Default:* '*'  You may use this value to only allow Github to assume the role on specific branches, tags, environments, pull requests etc.

Subject condition filter, appended after `repo:${owner}/${repo}:` string in IAM Role trust relationship.

> [https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#examples](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#examples)

---

*Example*

```typescript
'ref:refs/tags/v*'
'ref:refs/heads/demo-branch'
'pull_request'
'environment:Production'
```


### RoleProps <a name="RoleProps" id="aws-cdk-github-oidc.RoleProps"></a>

Properties for defining an IAM Role.

These are copied fron

#### Initializer <a name="Initializer" id="aws-cdk-github-oidc.RoleProps.Initializer"></a>

```typescript
import { RoleProps } from 'aws-cdk-github-oidc'

const roleProps: RoleProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-github-oidc.RoleProps.property.description">description</a></code> | <code>string</code> | A description of the role. |
| <code><a href="#aws-cdk-github-oidc.RoleProps.property.externalIds">externalIds</a></code> | <code>string[]</code> | List of IDs that the role assumer needs to provide one of when assuming this role. |
| <code><a href="#aws-cdk-github-oidc.RoleProps.property.inlinePolicies">inlinePolicies</a></code> | <code>{[ key: string ]: aws-cdk-lib.aws_iam.PolicyDocument}</code> | A list of named policies to inline into this role. |
| <code><a href="#aws-cdk-github-oidc.RoleProps.property.managedPolicies">managedPolicies</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy[]</code> | A list of managed policies associated with this role. |
| <code><a href="#aws-cdk-github-oidc.RoleProps.property.maxSessionDuration">maxSessionDuration</a></code> | <code>aws-cdk-lib.Duration</code> | The maximum session duration that you want to set for the specified role. |
| <code><a href="#aws-cdk-github-oidc.RoleProps.property.path">path</a></code> | <code>string</code> | The path associated with this role. |
| <code><a href="#aws-cdk-github-oidc.RoleProps.property.permissionsBoundary">permissionsBoundary</a></code> | <code>aws-cdk-lib.aws_iam.IManagedPolicy</code> | AWS supports permissions boundaries for IAM entities (users or roles). |
| <code><a href="#aws-cdk-github-oidc.RoleProps.property.roleName">roleName</a></code> | <code>string</code> | A name for the IAM role. |

---

##### `description`<sup>Optional</sup> <a name="description" id="aws-cdk-github-oidc.RoleProps.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string
- *Default:* No description.

A description of the role.

It can be up to 1000 characters long.

---

##### `externalIds`<sup>Optional</sup> <a name="externalIds" id="aws-cdk-github-oidc.RoleProps.property.externalIds"></a>

```typescript
public readonly externalIds: string[];
```

- *Type:* string[]
- *Default:* No external ID required

List of IDs that the role assumer needs to provide one of when assuming this role.

If the configured and provided external IDs do not match, the
AssumeRole operation will fail.

---

##### `inlinePolicies`<sup>Optional</sup> <a name="inlinePolicies" id="aws-cdk-github-oidc.RoleProps.property.inlinePolicies"></a>

```typescript
public readonly inlinePolicies: {[ key: string ]: PolicyDocument};
```

- *Type:* {[ key: string ]: aws-cdk-lib.aws_iam.PolicyDocument}
- *Default:* No policy is inlined in the Role resource.

A list of named policies to inline into this role.

These policies will be
created with the role, whereas those added by ``addToPolicy`` are added
using a separate CloudFormation resource (allowing a way around circular
dependencies that could otherwise be introduced).

---

##### `managedPolicies`<sup>Optional</sup> <a name="managedPolicies" id="aws-cdk-github-oidc.RoleProps.property.managedPolicies"></a>

```typescript
public readonly managedPolicies: IManagedPolicy[];
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy[]
- *Default:* No managed policies.

A list of managed policies associated with this role.

You can add managed policies later using
`addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName(policyName))`.

---

##### `maxSessionDuration`<sup>Optional</sup> <a name="maxSessionDuration" id="aws-cdk-github-oidc.RoleProps.property.maxSessionDuration"></a>

```typescript
public readonly maxSessionDuration: Duration;
```

- *Type:* aws-cdk-lib.Duration
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

##### `path`<sup>Optional</sup> <a name="path" id="aws-cdk-github-oidc.RoleProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string
- *Default:* /

The path associated with this role.

For information about IAM paths, see
Friendly Names and Paths in IAM User Guide.

---

##### `permissionsBoundary`<sup>Optional</sup> <a name="permissionsBoundary" id="aws-cdk-github-oidc.RoleProps.property.permissionsBoundary"></a>

```typescript
public readonly permissionsBoundary: IManagedPolicy;
```

- *Type:* aws-cdk-lib.aws_iam.IManagedPolicy
- *Default:* No permissions boundary.

AWS supports permissions boundaries for IAM entities (users or roles).

A permissions boundary is an advanced feature for using a managed policy
to set the maximum permissions that an identity-based policy can grant to
an IAM entity. An entity's permissions boundary allows it to perform only
the actions that are allowed by both its identity-based policies and its
permissions boundaries.

> [https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)

---

##### `roleName`<sup>Optional</sup> <a name="roleName" id="aws-cdk-github-oidc.RoleProps.property.roleName"></a>

```typescript
public readonly roleName: string;
```

- *Type:* string
- *Default:* AWS CloudFormation generates a unique physical ID and uses that ID for the role name.

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


## Protocols <a name="Protocols" id="Protocols"></a>

### IGithubActionsIdentityProvider <a name="IGithubActionsIdentityProvider" id="aws-cdk-github-oidc.IGithubActionsIdentityProvider"></a>

- *Extends:* aws-cdk-lib.aws_iam.IOidcProvider

- *Implemented By:* <a href="#aws-cdk-github-oidc.GithubActionsIdentityProvider">GithubActionsIdentityProvider</a>, <a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider">IGithubActionsIdentityProvider</a>

Describes a Github OpenID Connect Identity Provider for AWS IAM.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.oidcProviderRef">oidcProviderRef</a></code> | <code>aws-cdk-lib.aws_iam.OIDCProviderReference</code> | A reference to a OIDCProvider resource. |
| <code><a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.oidcProviderArn">oidcProviderArn</a></code> | <code>string</code> | The Amazon Resource Name (ARN) of the IAM OpenID Connect provider. |
| <code><a href="#aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.oidcProviderIssuer">oidcProviderIssuer</a></code> | <code>string</code> | The issuer for OIDC Provider. |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `oidcProviderRef`<sup>Required</sup> <a name="oidcProviderRef" id="aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.oidcProviderRef"></a>

```typescript
public readonly oidcProviderRef: OIDCProviderReference;
```

- *Type:* aws-cdk-lib.aws_iam.OIDCProviderReference

A reference to a OIDCProvider resource.

---

##### `oidcProviderArn`<sup>Required</sup> <a name="oidcProviderArn" id="aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.oidcProviderArn"></a>

```typescript
public readonly oidcProviderArn: string;
```

- *Type:* string

The Amazon Resource Name (ARN) of the IAM OpenID Connect provider.

---

##### `oidcProviderIssuer`<sup>Required</sup> <a name="oidcProviderIssuer" id="aws-cdk-github-oidc.IGithubActionsIdentityProvider.property.oidcProviderIssuer"></a>

```typescript
public readonly oidcProviderIssuer: string;
```

- *Type:* string

The issuer for OIDC Provider.

---

