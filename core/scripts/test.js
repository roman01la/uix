#!/usr/bin/env node

const puppeteer = require('puppeteer');

(async function run() {
  let failures = 0;
  let errors = 0;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.exposeFunction('testsFailed', n => {
      failures = n;
    }
  );

  await page.exposeFunction('testsErrored', n => {
      errors = n;
    }
  );

  await page.goto(`file://${process.argv[2]}/index.html`);

  await browser.close();

  console.log(`${failures} failures, ${errors} errors`);

  if (failures > 0) {
    process.exit(1);
  }
})();
