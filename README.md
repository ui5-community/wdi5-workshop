# `wdi5` workshop at UI5con 2022

<center>
<img src="https://github.com/js-soft/wdi5/raw/main/docs/img/wdi5-logo-small.png" alt="wdi5 logo!">
</center>

Here are the source for the `wdi5` workshop at UI5con 2022.

## prep

This is an `npm`-based mono repo.  
:warning: **So at least Node >= 16 with npm >= 7 is needed**.

It consits of three types of apps:

- plain JS-based UI5 app
- TypeScript-based UI5 app, incl UI5 Webcomponents
- Fiori Elements app

In the `/` of the project, doing an...

```shell
$> npm install
```

...will install all dependencies and modules for all three applications in one Go.

## run

It's the same approach for all three apps:

- cd `$app`
- Terminal 1: `npm run serve`  
  starts the ui5 tooling serving the app
- Terminal 2: `npm run wdi5`  
  starts the `wdi5`-tests for the app
