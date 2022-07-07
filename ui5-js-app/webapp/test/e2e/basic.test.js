const Main = require("./pageObjects/Main")
const marky = require("marky")
const { wdi5 } = require("wdio-ui5-service")

const selectors = require("./selectors/main")

describe("ui5 basic", () => {
    before(async () => {
        await Main.open()
    })

    it("should have the right title", async () => {
        const title = await browser.getTitle()
        expect(title).toEqual("Sample UI5 Application")
    })

    it("should use a control selector with dots and colons (wdi5)", async () => {
        const selector = {
            selector: {
                id: "Title::NoAction.h1",
                viewName: "test.Sample.view.Main"
            }
        }

        // ui5
        const titleWUi5 = await browser.asControl(selector).getText()
        expect(titleWUi5).toEqual("UI5 demo")
    })

    it("check for invalid control selector", async () => {
        const selector1 = {
            selector_: {
                test: "some.test.string"
            }
        }

        const selector2 = {
            id: "some.test.string"
        }
        const invalidControl1 = await browser.asControl(selector1)
        const invalidControl2 = await browser.asControl(selector2)

        // check if result contains the expected validation error
        expect(invalidControl1).toContain("ERROR")
        expect(invalidControl2).toContain("ERROR")
    })

    it("check getControl error message", async () => {
        const selector = {
            selector: {
                id: "some.test.string"
            }
        }

        const invalidControl = await browser.asControl(selector)

        // check if result contains the expected validation error
        expect(invalidControl.getInitStatus()).toBeFalsy()
    })

    it("check the metadata", async () => {
        const button = await browser.asControl({
            selector: {
                id: "openDialogButton",
                viewName: "test.Sample.view.Main"
            }
        })
        const metadata = button.getControlInfo()

        expect(metadata.id).toEqual("container-Sample---Main--openDialogButton")
        expect(metadata.className).toEqual("sap.m.Button")
        expect(metadata.key).toEqual("openDialogButtontestSample.view.Main")
    })

    it("check getBinding returns a proper object", async () => {
        const title = await browser.asControl(selectors.titleSelector)
        const bindingInfo = await title.getBinding("text")
        // bindingInfo is an object and it's oValue property can be accessed
        const response = bindingInfo.oValue
        expect(response).toEqual("UI5 demo")
    })

    it("check method chaining with fluent api", async () => {
        const response = await browser.asControl(selectors.buttonSelector).press().getText()
        expect(response).toEqual("open Dialog")

        // close popup
        await browser.asControl({ selector: { id: "__button1" } }).press()
    })

    it("check button text", async () => {
        const response = await browser.asControl(selectors.buttonSelector).getText()

        // expect(timelog).
        expect(response).toEqual("open Dialog")
    })

    it("test performance 1", async () => {
        marky.mark("1_fluentAPI")

        const response = await browser.asControl(selectors.buttonSelector).press().getText()

        const entry = marky.stop("1_fluentAPI")

        expect(response).toEqual("open Dialog")
        expect(entry.duration).toBeLessThan(3000)

        wdi5.getLogger().info(entry)

        // close popup
        await browser.asControl({ selector: { id: "__button1" } }).press()
    })

    it("test performance 2", async () => {
        selectors.buttonSelector.forceSelect = true

        marky.mark("2_fluentAPI")

        const button = await browser.asControl(selectors.buttonSelector)
        await button.press()
        const text = await button.getText()

        const entry = marky.stop("2_fluentAPI")

        expect(text).toEqual("open Dialog")
        wdi5.getLogger().info(entry)
    })

    it("method chaining w/ and w/o fluent api", async () => {
        const oldTitle = "UI5 demo"
        const newTitle = "UI5con 2022"
        selectors.titleSelector.forceSelect = true

        // setText still returns the wdi5 element, equivalent as in UI5
        const title = await browser.asControl(selectors.titleSelector).setText(newTitle).getText()
        expect(title).toEqual(newTitle)

        const titleInSteps = await browser.asControl(selectors.titleSelector)
        const titleAgain = await titleInSteps.setText(oldTitle)
        const response = await titleAgain.getText()

        expect(response).toEqual(oldTitle)
    })
})
