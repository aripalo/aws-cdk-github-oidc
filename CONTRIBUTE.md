# Contributing

## Setup


1. Active correct NodeJS version using your Node Version Manager of choice. Example with [fnm](https://github.com/Schniz/fnm):
    ```sh
    fnm use
    ```

2. Ensure [pnpm](https://pnpm.io/) is installed. Example with Corepack:
    ```sh
    corepack enable pnpm
    ```

3. Install dependencies:
    ```sh
    pnpm install --frozen-lockfile
    ```

4. Setup pre-commit hooks
    ```sh
    pnpm run prepare
    ```

5. Run Projen:
    ```sh
    pnpm exec projen
    ```


## Checking for secrets

```sh
pnpm run gitleaks:dir
```

```sh
pnpm run gitleaks:history
```
