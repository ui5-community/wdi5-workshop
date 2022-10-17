# Devtoberfest 2022

https://groups.community.sap.com/t5/devtoberfest/testing-ui5-apps-with-wdi5-zero-to-hero-to-continuous/ec-p/8833#M2

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
