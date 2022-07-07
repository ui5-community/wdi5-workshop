exports.config = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    wdi5: {
        url: "#",
        screenshotPath: "webapp/test/__screenshots__",
        screenshotsDisabled: false, // [optional] {boolean}, default: false; if set to true, screenshots won't be taken and not written to file system
        logLevel: "error", // [optional] error | verbose | silent, default: "error"
        skipInjectUI5OnStart: false, // [optional] {boolean}, default: false; true when UI5 is not on the start page, you need to later call <wdioUI5service>.injectUI5() manually
        waitForUI5Timeout: 15000 // [optional] {number}, default: 15000; maximum waiting time in milliseconds while checking for UI5 availability
    },
    maxInstances: 1,
    baseUrl:
        "https://davinci.cpp.cfapps.eu10.hana.ondemand.com/474a7c0c-c364-4075-b53e-983472d76120.basicservice.testSample-1.0.0/index.html",
    specs: ["./webapp/test/**/basic.test.js"],
    capabilities: [
        {
            browserName: "Chrome",
            browserVersion: "latest",
            "bstack:options": {
                os: "OS X",
                osVersion: "Monterey"
            }
        }
    ],
    logLevel: "error",
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [["browserstack", { browserstackLocal: true }], "ui5"],
    framework: "mocha",
    reporters: ["spec"],
    mochaOpts: {
        ui: "bdd",
        timeout: 60000
    }
}
