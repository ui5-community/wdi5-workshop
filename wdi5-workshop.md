# UI5con 2022: wdi5 workshop

<https://github.com/ui5-community/wdi5-workshop>

focus: DevX, CI, on-boarding

1. DevX w/ `wdi5`
2. Breakout Sessions
    - js-app (@The_dominiK) -> page objects, test structuring
    - ts-app (@vobu) -> one abstraction layer more
    - fe-app (@scoen) -> FE OData v4 test library
3. walk through `wdi5` codebase

---

## wdi5

### what

```
              Node.js                │        browser
                                     │
       ┌────────────────────┐        │  ┌─────────────────────┐
       │                    ├────────┼─►│        UI5          │
       │       wdi5         │        │  │  RecordReplay API   │
       │                    │◄───────┼──┤                     │
       │ (wdio-ui5-service) │        │  └─────────────────────┘
┌──────┼────────────────────┼──────┐ │
│      │                    │      │ │
│      └────────────────────┘      │ │
│           WebdriverIO            │ │
│                                  │ │
│                                  │ │
└──────────────────────────────────┘ │
                                     │
                                     │
```

---

## wdi5

### how

```
        ┌─────  you  ──────┐
        │                  │
        ▼                  ▼
┌──────────────┐    ┌────────────────┐
│              │    │                │
│ ui5-tooling  │    │                │
│ (webserver)  │◄───┤     wdi5       │
│              │    │                │
│   UI5 app    │    │ test execution │
│              │    │                │
└──────────────┘    └────────────────┘
```

---

## DevX

- install & config `wdi5`
  - `npm init wdi5`
  - `npx wdio config`
  - docker image

&rarr; ui5 tooling, mocha, spec reporter

---

## DevX

### a first test

- OPA5-compatible "matcher"
- test recorder `wdi5` dialect
- UI5 API for controls
- fluent async api
<!-- - $shorthand shotcuts `.getItems(true)` -->

---

## DevX

### "your friendly neighborhood UI5 e2e test tool"

- code completion
- headless/`--headless`
- `--watch`
- `.skip` && `.only`
- debug
  - `await browser.debug()`
  - VS Code debug
  - `--debug` -> auto dev tools
- `await browser.screenshot()`
<!-- - wdio REPL -->

---

## DevX

### dev time - breakout topics

- js-app (@The_dominiK) -> page objects, test structuring
- ts-app (@vobu) -> one abstraction layer more
- fe-app (@scoen) -> FE OData v4 test library

---

## CI

- use the docker image locally + in pipeline
- hook up to Browerstack

---

## wdi5: come aboard!

`/src` -> Node.js-scoped "core" (TS, compiles to `/dist`)

`/client-side-js` -> browser-scoped "core" (gets used "as is")

`/docs` -> [`Docsify`](https://docsify.js.org/#/)-based documentation

`npm run build:watch`

mono repo -> use current dev soures in `/examples/**/*`
