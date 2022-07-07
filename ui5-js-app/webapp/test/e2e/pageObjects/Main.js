const Page = require("./Page")
const selectors = require("../selectors/main")

class Main extends Page {

    _viewName = "test.Sample.view.Main"

    // ---------- API Style -----------

    async open() {
        await super.open(`#/Main`)
    }

    async getCheckbox() {
        const cbSelector1 = {
            wdio_ui5_key: "cbSelector1",
            selector: {
                id: "idCheckbox",
                viewName: this._viewName,
                controlType: "sap.m.CheckBox"
            },
            forceSelect: true
        }

        return await browser.asControl(cbSelector1)
    }

    // ----------- BDD Style -----------

    async iOpenTheMainPage() {
        await super.open(`#/Main`)
    }

    async iSelectTheCheckbox(sId) {

        const oCheckbox = await browser.asControl({
            wdio_ui5_key: "cbSelector1",
            selector: {
                controlType: "sap.m.CheckBox",
                viewName: this._viewName,
                id: sId
            },
        });
        return await oCheckbox.press();
    }

    async iCheckTheCheckbox(sId, bBool) {

        const oCheckbox = await browser.asControl({
            wdio_ui5_key: "cbSelector1",
            selector: {
                controlType: "sap.m.CheckBox",
                viewName: this._viewName,
                id: sId
            },
        });

        // selectors.checkboxSelector.selector.sId = sId
        // const oCheckbox = await browser.asControl(selectors.checkboxSelector);

        expect(await oCheckbox.getSelected()).toEqual(bBool);
    }
}

module.exports = new Main()
