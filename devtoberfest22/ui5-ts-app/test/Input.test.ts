import InputListItem from "sap/m/InputListItem"
import Input from "sap/ui/webc/main/Input"
import { wdi5Selector } from "wdio-ui5-service/dist/types/wdi5.types"

const selector: wdi5Selector = {
  selector: {
    id: "mainUserInput",
    viewName: "test.Sample.tsapp.view.Main"
  }
}

describe("Input", async () => {
  it("should read name from username field", async () => {
    const input: unknown = await browser.asControl(selector)
    const value: string = await (input as Input).getValue()
    expect(value).toEqual("Helvetius Nagy")
  })

  it("should check if the field is writeable", async () => {
    await browser.screenshot("before-changed-value")

    const input: unknown = await browser.asControl(selector)
    await (input as Input).setValue("Smith Smithersson")

    await browser.screenshot("after-changed-value")
    
    const changedValue = await (input as Input).getValue()
    

    expect(changedValue).toEqual("Smith Smithersson")
  })
})
