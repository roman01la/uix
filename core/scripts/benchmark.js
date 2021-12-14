#!/usr/bin/env node

const puppeteer = require('puppeteer');

(async function run() {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on("pageerror", console.error);

  page.on("console", m => {
    if (m.type() === "error") {
      console.error(`${m.text()} in ${m.location().url}:${m.location().lineNumber}`);
    } else {
      console.log(...m.args().map(a => a._remoteObject.value));
    }
  });

  await page.exposeFunction("testsDone", async ([react, uix, reagent]) => {
    console.log(
      `
React ${react}ms
UIx ${uix}ms ${Math.round(((100 / react * uix) / 100) * 10) / 10}x
Reagent ${reagent}ms ${Math.round(((100 / react * reagent) / 100) * 10) / 10}x`);

      await browser.close();
    }
  );

  await page.goto(`file://${process.argv[2]}/index.html`);
})();
