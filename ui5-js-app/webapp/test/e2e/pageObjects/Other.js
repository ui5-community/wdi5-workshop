const Page = require("./Page")
const selectors = require("../selectors/other")

class Other extends Page {
    allNames = [
        "Nancy Davolio",
        "Andrew Fuller",
        "Janet Leverling",
        "Margaret Peacock",
        "Steven Buchanan",
        "Michael Suyama",
        "Robert King",
        "Laura Callahan",
        "Anne Dodsworth"
    ]
    _viewName = "test.Sample.view.Other"

    // ---------- API Style -----------

    async open() {
        await super.open(`#/Other`)
    }

    async getPage() {
        const pageSelector = {
            selector: {
                id: "OtherPage",
                viewName: this._viewName,
                interaction: "root"
            }
        }
        return await browser.asControl(pageSelector)
    }

    async getList(force = false) {
        selectors.listSelector.forceSelect = force
        return await browser.asControl(selectors.listSelector)
    }

    async getListItems(force = false) {
        const list = await this.getList(force)
        return await list.getAggregation("items")
    }

    async getListItemsLength(force = false) {
        const list = await this.getList(force)
        const items = await list.getAggregation("items")
        return items.length
    }

    async getAddLineItemButtom() {
        return await browser.asControl({
            selector: {
                id: "idAddLineItemButton",
                viewName: this._viewName
            }
        })
    }

    async pressAddLineItemButtom() {
        const button = await browser.asControl({
            selector: {
                id: "idAddLineItemButton",
                viewName: this._viewName
            }
        })

        return await button.press()
    }

    // ----------- BDD Style -----------

    async iOpenTheOtherPage() {
        await super.open(`#/Other`)
    }

    async iShouldSeeItemsInTheList(iCount) {
        selectors.listSelector.forceSelect = true
        const oList = await browser.asControl(selectors.listSelector);
        const iListAggregations = await oList.getAggregation("items")

        // contains expect
        expect(iListAggregations.length).toEqual(iCount);
    }

    async iAddAnItem() {
        const addButton = await browser.asControl({
            selector: {
                id: "idAddLineItemButton",
                viewName: this._viewName
            }
        })
        return await addButton.press()
    }
}

module.exports = new Other()
