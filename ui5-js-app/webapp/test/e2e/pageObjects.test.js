
const Other = require("./pageObjects/Other")
const Main = require("./pageObjects/Main")

describe("Show differences in page objects", () => {

    // before(async () => {})

    it("check the state of the main checkbox", async () => {
        await Main.open()

        await Main.iSelectTheCheckbox("idCheckbox")

        await Main.iCheckTheCheckbox("idCheckbox", true);
    });

    it("Select an item in the list", async () => {
        await Other.open()

        await Other.iShouldSeeItemsInTheList(9);

        await Other.iAddAnItem()

        await Other.iShouldSeeItemsInTheList(10);
    });

});
