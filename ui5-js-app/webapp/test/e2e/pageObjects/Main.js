const Page = require("./Page")
const selectors = require("../selectors/main")

class Main extends Page {
    async open() {
        await super.open(`#/Main`)
    }

    _viewName = "test.Sample.view.Main"

    async getCheckbox() {
        const cbSelector1 = {
            wdio_ui5_key: "cbSelector1",
            selector: {
                id: "idCheckbox",
                viewName: this._viewName,
                controlType: "sap.m.CheckBox"
            }
        }

        return await browser.asControl(cbSelector1)
    }

    // BDD
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
        selectors.checkboxSelector.selector.sId = sId

        const oCheckbox = await browser.asControl(selectors.checkboxSelector);
        expect(await oCheckbox.getSelected()).toEqual(bBool);
    }
}

module.exports = new Main()
