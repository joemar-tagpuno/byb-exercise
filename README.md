# Running the exercise demo GraphQL API
1. Run `pnpm install`
2. nex run `pnpm build`
3. then start the API with `pnpm api:build && pnpm api:start`

**The GraphQL API endpoint:** http://localhost:3000/graphql

**The test user ID:** `913a6046-9959-4190-bd12-48cc6e8d8563`

**The test file ID:** `d04729db-62a0-4c39-b05f-ae25ee0c076f`

**The secure file download query**:
```shell
# with a success result
query CustomerSecureFileDownload($fileId: GUID!, $userId: GUID!) {
  customerSecureFileDownload(fileId: $fileId, userId: $userId) {
    file
    filename
    filetype
    filesize
  }
}

# with the unauthorized error result
query CustomerSecureFileDownload($fileId: GUID!, $userId: GUID!) {
  unauthorizedCustomerSecureFileDownload(fileId: $fileId, userId: $userId) {
    file
    filename
    filetype
    filesize
  }
}
```

# Note

This demo exercise utilises [the clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) design pattern and [IoC](https://en.wikipedia.org/wiki/Inversion_of_control) with [DI](https://en.wikipedia.org/wiki/Dependency_injection) in its most straightforward way.

---

# pnpm-monorepo-template

[![Github Actions](https://github.com/joemar-tagpuno/byb-exercise/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/joemar-tagpuno/byb-exercise/actions/workflows/ci.yaml)

> Pragmatic template for a `TypeScript` monorepo with [`pnpm`](https://pnpm.io), [`turborepo`](https://turborepo.org), and [`vitest`](https://vitest.dev/).

Tested with:
- **Node.js v20.11.0**
- **pnpm v9.15.3**
- **vitest v2.1.8**

---------------------------------------------

## Table of Contents

- [What's Included](#whats-included)
- [Available Scripts](#available-scripts)
- [Test Structure](#test-structure)
- [FAQ](#faq)
- [Author](#-author)
- [Show your support](#-show-your-support)
- [License](#-license)

## What's Included

- `pnpm` workspace, whose configuration is stored in [`pnpm-workspace.yaml`](/pnpm-workspace.yaml). All local packages are decorated with a `@byb/*` scope (you may want to substitute these instances in the `name` entries of any `package.json` with yours or your company's name).
- `tsup` bundler, whose configuration is stored in [`tsup.config.ts`](./tsup.config.ts).
- `turborepo`, whose configuration is stored in [`turbo.json`](./turbo.json)
- an example [`Dockerfile`](./Dockerfile.pnpm) that can be built and used as a base image for your Node.js Docker containers.
- the `vitest` test engine, whose configuration is stored in [`vitest.workspace.ts`](./vitest.workspace.ts).
- opinionated linting setups via [`biome`](https://biomejs.dev/), whose configuration is defined in the [`biome.jsonc`](./biome.jsonc) file.

## Available Scripts

- `pnpm install`: install the dependencies needed for each package.
- `pnpm build`: transpile the local TypeScript packages to JavaScript.
- `pnpm build:watch`: transpile the local TypeScript packages to JavaScript, and watch for changes.
- `pnpm check:exports`: check that the `exports` field in the `package.json` files of each exported package is correctly set, using [`@arethetypeswrong/cli`](https://www.npmjs.com/package/@arethetypeswrong/cli).
- `pnpm lint:ci`: check that the code follows the `biome` guidelines.
- `pnpm lint`: check that the code follows the `biome` guidelines, and override it to follow them if possible.
- `pnpm test:unit`: run unit tests.
- `pnpm test:integration`: run integration tests.
- `pnpm test`: run all tests.

## Test Structure

We follow an opinionated convention for storing an running tests.
All tests should be written in the `__tests__` directory of a local package.
Moreover, unit tests should be placed in the `__tests__/unit` folder; similarly, integration tests should be placed in the `__tests__/integration` folder.
This allows for easily running groups of tests (for instance, you might want to run unit tests locally, while deferring integration tests - that will probably need access to external services like Docker containers - to the CI only).

## FAQ

1. How do I add a new package to the local workspace?

- Create a new folder `$packageName` in [`packages/`](packages/). Initialize it with a `tsconfig.json` file (which will reference the [`tsconfig.base.node.json`](./tsconfig.base.node.json) file at the root level) and a `package.json` file similarly to how it's done in the  [`common-utils`](packages/common-utils) package.

2. How do I add a new dependency that should be available to each package in the local workspace?

> `pnpm add -w $dependencyName`

## 👤 Author

Hi, I'm **Alberto Schiabel**, you can follow me on:

- Github: [@jkomyno](https://github.com/jkomyno)
- Twitter: [@jkomyno](https://twitter.com/jkomyno)

## 🦄 Show your support

Give a ⭐️ if this project helped or inspired you!

## 📝 License

Built with ❤️ by [Alberto Schiabel](https://github.com/jkomyno).<br />
This project is [MIT](https://github.com/jkomyno/pnpm-monorepo-example/blob/main/LICENSE) licensed.
