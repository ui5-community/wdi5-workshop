const { wdi5 } = require("wdio-ui5-service")

describe("FE basics", () => {
    let FioriElementsFacade
    before(async () => {
        FioriElementsFacade = await browser.fe.initialize({
            onTheMainPage: {
                ListReport: {
                    appId: "sap.fe.demo.incidents",
                    componentId: "IncidentsList",
                    entitySet: "Incidents"
                }
            },
            onTheDetailPage: {
                ObjectPage: {
                    appId: "sap.fe.demo.incidents",
                    componentId: "IncidentsObjectPage",
                    entitySet: "Incidents"
                }
            },
            onTheShell: {
                Shell: {}
            }
        })
    })

    it("should trigger search on ListReport page and navigate to the Object Page", async () => {
        await FioriElementsFacade.execute((Given, When, Then) => {
            Given.onTheMainPage.onFilterBar().iExecuteSearch()
            Then.onTheMainPage.onTable().iCheckRows(12)
            Then.onTheMainPage.onTable().iCheckRows({ identifier: "inc_0002", title: "Password Reset" })
            When.onTheMainPage.onTable().iPressRow({ identifier: "inc_0002" })
            Then.onTheDetailPage.iSeeThisPage()
            Then.onTheDetailPage.onHeader().iCheckEdit().and.iCheckTitle("Password Reset")
        })
    })
})
