import * as cdk from "aws-cdk-lib";
import { MigrationTestStack } from "../lib/migration-test-stack";

const app = new cdk.App();
const stackName =
  process.env.MIGRATION_STACK_NAME ?? "AwsCdkGithubOidcMigrationTest";

new MigrationTestStack(app, stackName);
