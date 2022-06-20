# React DevTools

[React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) is a browser extension that can be used to inspect live UI tree, component props and profile performance in DevTools.

## UIx specifics

- Jump to component definition button [2] works as expected, unlike in Reagent
- Component's props preview [3] displays JS implementation of props map instead of using Custom Formatters. The workaround for this is to use debug button [1] that will print component's data to browser console where a custom formatter will print props map correctly [4]

![](/docs/rdt_1.jpg)
