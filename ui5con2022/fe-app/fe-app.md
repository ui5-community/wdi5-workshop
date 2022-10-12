# wdi5 workshop - Fiori Elements V4 App

## Documentation
test library API documentation: <br/>
https://sapui5.hana.ondemand.com/#/api/sap.fe.test

test library tutorial with OPA5: <br/>
https://developers.sap.com/tutorials/fiori-tools-mockserver-opa-testing.html

wdi5 test library integration: <br/>
https://ui5-community.github.io/wdi5/#/fe-testlib


## Test scenario
1. Click on the "Go" Button of the ListReport to load the data
2. Check that:
    - 12 rows are displayed
    - An entry exists that has the value `inc_0002` in the *Identifier* column and `Password Reset` as *Title*
3. Press on that row
4. Check that the Object Page is displayed with the correct Title `Password Reset``
5. Enter the edit mode and change the title of the entry
6. Click on the save button and navigate back
7. Check that we are back on the List Report and execute the search again
8. Check that the changed entry has a different title



