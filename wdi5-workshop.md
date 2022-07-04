# UI5con 2022: wdi5 workshop

focus: DevX, CI, on-boarding

<https://github.com/ui5-community/wdi5-workshop>

---

## wdi5

### what

---

## wdi5

### how

---

## DevX

### dev time - "out of the way", yet "safety net"

- install & config `wdi5`
  - `npm init wdi5` || `npx wdio config`
  - docker image
- a first test
  - OPA5-compatible "matcher"
  - test recorder `wdi5` dialect
  - UI5 API for controls
  - fluent async api
- "your friendly neighborhood UI5 e2e test tool"
  - code completion
  - headless/`--headless`
  - `--watch`
  - `.skip` && `.only`
  - debug
    - VS Code debug
    - `browser.debug()`
    - `--debug` -> auto dev tools
  - wdio REPL
  - `browser.screenshot()`

---

## DevX

### dev time - breakout topics

- js-app (@The_dominiK) -> page objects, test structuring
- ts-app (@vobu) -> one abstraction level more
- fe-app (@scoen) -> FE OData v4 test library

---

## CI

- identical code local + in pipeline
- docker image in pipeline
  - gh
  - (gitlab)
  - (bitbucket)
  - jenkins

---

## wdi5: come aboard!

`/src` -> Node.js-scoped "core" (TS, compiles to `/dist`)

`/client-side-js` -> browser-scoped "core" (gets used "as is")

`/docs` -> [`Docsify`](https://docsify.js.org/#/)-based documentation

`npm run build:watch`

mono repo -> use current dev soures in `/examples/**/*`
