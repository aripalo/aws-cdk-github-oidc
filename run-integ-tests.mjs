import { spawnSync } from "node:child_process";

const defaultRegion = "us-east-1";

const forwardedArgs = process.argv.slice(2).filter((arg) => {
  if (arg === "--") {
    return false;
  }
  return true;
});

function resolveDefaultAccount() {
  if (process.env.CDK_DEFAULT_ACCOUNT) {
    return process.env.CDK_DEFAULT_ACCOUNT;
  }

  const result = spawnSync(
    "aws",
    ["sts", "get-caller-identity", "--query", "Account", "--output", "text"],
    {
      encoding: "utf8",
      env: process.env,
    },
  );

  if (result.status !== 0) {
    return undefined;
  }

  return result.stdout.trim() || undefined;
}

const defaultAccount = resolveDefaultAccount();

const result = spawnSync(
  "pnpm",
  [
    "exec",
    "integ-runner",
    "--update-on-failed",
    "--directory",
    "test",
    "--test-regex",
    "integ\\.[^/]+\\.(js|ts)$",
    "--parallel-regions",
    defaultRegion,
    "--app",
    "pnpm exec ts-node --project tsconfig.dev.json {filePath}",
    ...forwardedArgs,
  ],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      ...(defaultAccount ? { CDK_DEFAULT_ACCOUNT: defaultAccount } : {}),
    },
  },
);

process.exit(result.status ?? 1);
