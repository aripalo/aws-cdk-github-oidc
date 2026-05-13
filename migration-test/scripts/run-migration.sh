#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJECT_DIR}"

AUTO_TEARDOWN="false"

usage() {
  cat <<EOF
Usage: ./scripts/run-migration.sh [--teardown[=true|false]]

Options:
  --teardown            Perform teardown automatically without asking.
  --teardown=true       Same as --teardown.
  --teardown=false      Skip automatic teardown and ask at the end.
  -h, --help            Show this help message.
EOF
}

while (($# > 0)); do
  case "$1" in
    --teardown)
      if (($# > 1)) && [[ "$2" =~ ^(true|false)$ ]]; then
        AUTO_TEARDOWN="$2"
        shift 2
      else
        AUTO_TEARDOWN="true"
        shift
      fi
      ;;
    --teardown=*)
      AUTO_TEARDOWN="${1#*=}"
      if [[ "${AUTO_TEARDOWN}" != "true" && "${AUTO_TEARDOWN}" != "false" ]]; then
        echo "Invalid value for --teardown: ${AUTO_TEARDOWN} (expected true|false)" >&2
        exit 1
      fi
      shift
      ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

STACK_NAME="${MIGRATION_STACK_NAME:-AwsCdkGithubOidcMigrationTest}"
TMP_DIR="${PROJECT_DIR}/.tmp"
RESOURCE_MAPPING_PATH="${TMP_DIR}/resource-mapping.json"
OIDC_ISSUER="token.actions.githubusercontent.com"
ACCOUNT_ID="$(aws sts get-caller-identity --query "Account" --output text)"
CALLER_ARN="$(aws sts get-caller-identity --query "Arn" --output text)"
AWS_PARTITION="$(echo "${CALLER_ARN}" | cut -d: -f2)"
OIDC_PROVIDER_ARN="arn:${AWS_PARTITION}:iam::${ACCOUNT_ID}:oidc-provider/${OIDC_ISSUER}"

cleanup_tmp_artifacts() {
  rm -f "${RESOURCE_MAPPING_PATH}"
}

trap cleanup_tmp_artifacts EXIT

verify_stack_status() {
  local context="$1"
  shift
  local status
  status="$(aws cloudformation describe-stacks --stack-name "${STACK_NAME}" --query "Stacks[0].StackStatus" --output text)"

  for expected in "$@"; do
    if [[ "${status}" == "${expected}" ]]; then
      echo "Verified stack status after ${context}: ${status}"
      return 0
    fi
  done

  echo "Unexpected stack status after ${context}: ${status}" >&2
  echo "Expected one of: $*" >&2
  exit 1
}

verify_oidc_provider_present() {
  local context="$1"
  local listed_arn
  listed_arn="$(
    aws iam list-open-id-connect-providers \
      --query "OpenIDConnectProviderList[?Arn=='${OIDC_PROVIDER_ARN}'].Arn | [0]" \
      --output text
  )"

  if [[ "${listed_arn}" != "${OIDC_PROVIDER_ARN}" ]]; then
    echo "OIDC provider not found after ${context}: ${OIDC_PROVIDER_ARN}" >&2
    exit 1
  fi

  local provider_url
  provider_url="$(
    aws iam get-open-id-connect-provider \
      --open-id-connect-provider-arn "${OIDC_PROVIDER_ARN}" \
      --query "Url" \
      --output text
  )"

  if [[ "${provider_url}" != "${OIDC_ISSUER}" ]]; then
    echo "OIDC provider URL mismatch after ${context}: expected ${OIDC_ISSUER}, got ${provider_url}" >&2
    exit 1
  fi

  echo "Verified OIDC provider after ${context}: ${OIDC_PROVIDER_ARN}"
}

teardown_stack() {
  echo "==> Teardown: Destroying stack ${STACK_NAME}"
  MIGRATION_PHASE=v4-import MIGRATION_STACK_NAME="${STACK_NAME}" pnpm exec cdk destroy "${STACK_NAME}" --force
}

echo "Using stack: ${STACK_NAME}"
echo "Working directory: ${PROJECT_DIR}"
echo "Using account: ${ACCOUNT_ID}"
echo "Using OIDC provider ARN: ${OIDC_PROVIDER_ARN}"
echo "Auto teardown: ${AUTO_TEARDOWN}"

mkdir -p "${TMP_DIR}"

echo "==> Phase 1: Install v2 + aws-cdk-lib@2.220.0"
pnpm add aws-cdk-github-oidc@^2 aws-cdk-lib@2.220.0
MIGRATION_PHASE=v2 MIGRATION_STACK_NAME="${STACK_NAME}" pnpm exec cdk deploy "${STACK_NAME}" --require-approval never
verify_stack_status "phase 1 deploy" CREATE_COMPLETE UPDATE_COMPLETE
verify_oidc_provider_present "phase 1 deploy"

echo "==> Phase 2: Upgrade to v3.1 + aws-cdk-lib@2.237.0 with RETAIN"
pnpm add aws-cdk-github-oidc@^3.1 aws-cdk-lib@2.237.0
MIGRATION_PHASE=v3-retain MIGRATION_STACK_NAME="${STACK_NAME}" pnpm exec cdk diff "${STACK_NAME}"
MIGRATION_PHASE=v3-retain MIGRATION_STACK_NAME="${STACK_NAME}" pnpm exec cdk deploy "${STACK_NAME}" --require-approval never
verify_stack_status "phase 2 deploy" CREATE_COMPLETE UPDATE_COMPLETE
verify_oidc_provider_present "phase 2 deploy"

echo "==> Phase 3: Upgrade to v4.2 + aws-cdk-lib@^2.237.0 and lookup provider"
pnpm add aws-cdk-github-oidc@^4.2 aws-cdk-lib@^2.237.0
MIGRATION_PHASE=v4-lookup MIGRATION_STACK_NAME="${STACK_NAME}" pnpm exec cdk diff "${STACK_NAME}"
MIGRATION_PHASE=v4-lookup MIGRATION_STACK_NAME="${STACK_NAME}" pnpm exec cdk deploy "${STACK_NAME}" --require-approval never
verify_stack_status "phase 3 deploy" CREATE_COMPLETE UPDATE_COMPLETE
verify_oidc_provider_present "phase 3 deploy"

echo "==> Phase 4: Switch back to managed provider and import"
cat > "${RESOURCE_MAPPING_PATH}" <<EOF
{
  "GithubProvider1CDE27EB": {
    "Arn": "${OIDC_PROVIDER_ARN}"
  }
}
EOF

echo "Running non-interactive import..."
printf "y\ny\n" | MIGRATION_PHASE=v4-import MIGRATION_STACK_NAME="${STACK_NAME}" pnpm exec cdk import "${STACK_NAME}" --resource-mapping "${RESOURCE_MAPPING_PATH}" --force --execute true --require-approval never
verify_stack_status "phase 4 import" IMPORT_COMPLETE
verify_oidc_provider_present "phase 4 import"

echo "==> Phase 5: Post-import verification"
MIGRATION_PHASE=v4-import MIGRATION_STACK_NAME="${STACK_NAME}" pnpm exec cdk diff "${STACK_NAME}"
verify_oidc_provider_present "phase 5 post-import diff"

echo "Migration test flow completed successfully."

if [[ "${AUTO_TEARDOWN}" == "true" ]]; then
  teardown_stack
else
  read -r -p "Teardown test stack now? (y/n) " teardown_answer
  teardown_answer="${teardown_answer,,}"
  if [[ "${teardown_answer}" == "y" || "${teardown_answer}" == "yes" ]]; then
    teardown_stack
  else
    echo "Skipping teardown. Stack remains deployed: ${STACK_NAME}"
  fi
fi
