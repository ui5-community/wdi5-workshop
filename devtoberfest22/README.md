# Devtoberfest 2022

this is the showcase for the Devtoberfest 22 presenation  
"Testing UI5 Apps with wdi5 - Zero to Hero to Continuous Integration"

https://www.youtube.com/watch?v=f-0ztSnb2-c

https://groups.community.sap.com/t5/devtoberfest/testing-ui5-apps-with-wdi5-zero-to-hero-to-continuous/ec-p/8833#M2

This repo holds a UI5 TypeScript app and  
wdi5 tests for it in TypeScript flavor

## install + run

```bash
$> npm install

# in Terminal 1
$> npm run start # builds and runs the ui5 ts app

# in Terminal 2
$> npm run wdi5 # runs wdi5 tests with chrome locally
$> npm run wdi5:browserstack # runs wdi5 tests against browserstack cloud testing service

```

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
