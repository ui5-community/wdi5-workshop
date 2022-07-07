
const Other = require("./pageObjects/Other")
const Main = require("./pageObjects/Main")

describe("Show differences in page objects", () => {

    // ---------- API Style -----------

    it("Check the state of the main checkbox", async () => {
        await Main.open()

        await (await Main.getCheckbox()).press()

        expect(await (await Main.getCheckbox()).getSelected()).toBeTruthy()
    });

    it("Select an item in the list and verify the length", async () => {
        await Other.open()

        expect((await Other.getListItems()).length).toEqual(9)

        await Other.pressAddLineItemButtom()

        // repeated line
        expect((await Other.getListItems()).length).toEqual(10)
        // expect(await Other.getListItemsLength()).toEqual(10)
    });

    // ---------- BDD Style -----------

    it.skip("Check the state of the main checkbox", async () => {
        await Main.iOpenTheMainPage()

        await Main.iSelectTheCheckbox("idCheckbox")

        await Main.iCheckTheCheckbox("idCheckbox", true);
    });

    it.skip("Select an item in the list and verify the length", async () => {
        await Other.iOpenTheOtherPage()

        await Other.iShouldSeeItemsInTheList(9);

        await Other.iAddAnItem()

        await Other.iShouldSeeItemsInTheList(10);
    });

});
