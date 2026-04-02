import { AlmaCdkConstructLibrary } from "@alma-cdk/construct-library";
import { cdk, github } from "projen";

const project = new AlmaCdkConstructLibrary({
  name: "aws-cdk-github-oidc",
  author: "Ari Palo",
  authorOrganization: false,
  authorAddress: "opensource@aripalo.com",
  description:
    "CDK constructs to use OpenID Connect for authenticating your Github Action workflow with AWS IAM",
  repositoryUrl: "https://github.com/aripalo/aws-cdk-github-oidc.git",
  keywords: [
    "cdk",
    "aws-cdk",
    "awscdk",
    "aws",
    "iam",
    "github",
    "github-actions",
    "oidc",
    "openid-connect",
  ],
  stability: cdk.Stability.EXPERIMENTAL, // or STABLE or DEPRECATED
  majorVersion: 4,
  releaseEnvironment: "production",
  pnpmSettings: {
    trustPolicyExclude: ["jsii@5.9.35"],
    onlyBuiltDependencies: ["lefthook"],
  },
  codeCov: true,
});

project.addDevDeps(
  "@aws-cdk/integ-runner",
  "@aws-cdk/integ-tests-alpha",
  "@aws-cdk/cloud-assembly-schema",
  "lefthook",
);

/**
 * Run with AWS_PROFILE=<YOUR_PROFILE> pnpm run integ:test
 */
project.setScript("integ:test", "node ./run-integ-tests.mjs");

project.setScript("prepare", "lefthook install");

project.setScript(
  "gitleaks:history",
  'docker run --rm -v "$PWD:/repo" -w /repo ghcr.io/gitleaks/gitleaks:latest git --verbose --config /repo/.gitleaks.toml',
);
project.setScript(
  "gitleaks:dir",
  'docker run --rm -v "$PWD:/repo" -w /repo ghcr.io/gitleaks/gitleaks:latest dir --verbose --config /repo/.gitleaks.toml',
);

const gitleaksWorkflow = project.github!.addWorkflow("gitleaks");
gitleaksWorkflow.on({
  push: {},
});
gitleaksWorkflow.addJobs({
  gitleaks: {
    runsOn: ["ubuntu-latest"],
    permissions: {
      contents: github.workflows.JobPermission.READ,
    },
    steps: [
      {
        name: "Checkout",
        uses: "actions/checkout@v5",
        with: {
          fetchDepth: 0,
        },
      },
      {
        name: "Run gitleaks",
        uses: "gitleaks/gitleaks-action@v2",
        env: {
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}",
          GITLEAKS_CONFIG: ".gitleaks.toml",
        },
      },
    ],
  },
});

project.synth();
