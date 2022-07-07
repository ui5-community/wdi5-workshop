
const _viewName = "test.Sample.view.Main"

module.exports = {
    buttonSelector: {
        wdio_ui5_key: "allButtons",
        selector: {
            controlType: "sap.m.Button",
            viewName: _viewName,
            properties: {
                text: new RegExp(/.*ialog.*/gm)
            }
        }
    },
    titleSelector: { selector: { id: "container-Sample---Main--Title::NoAction.h1" } },
    checkboxSelector: {
        wdio_ui5_key: "cbSelector1",
        selector: {
            controlType: "sap.m.CheckBox",
            viewName: _viewName,

        }
    }
}

