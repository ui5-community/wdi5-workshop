exports.config = {
    wdi5: {
        url: "index.html",
    },
    baseUrl: "http://localhost:8080",
    maxInstances: 1,
    capabilities: [
        {
            maxInstances: 1,
            browserName: "chrome",
            "goog:chromeOptions": {
                args: [
                    /* This skips the --headless startup option if the envvar
                     * HEADFUL is defined. In its place, --dummy is used which
                     * is ignored by chrome. */
                    process.env.HEADFUL === undefined ? "--headless" : "--dummy",
                    "--no-sandbox",
                    "--disable-gpu",
                    "--disable-dev-shm-usage",
                    "--window-size=1920,1080"
                ]
            }
        }
    ],
    services: ["chromedriver", "ui5"],
    framework: "mocha",
    specs: ["webapp/test/e2e/*.test.js"],
    logLevel: "error",
}
