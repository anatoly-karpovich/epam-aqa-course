import { Before, BeforeAll, After, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";

import { chromium, Browser, BrowserContext, Page } from "@playwright/test";
import { PlaywightSetup } from "../utils/playwight/playwightSetup";

let browser: Browser;
let page: Page;
let context: BrowserContext;

setDefaultTimeout(60000);

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: false,
    slowMo: 1000,
  });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function () {
  context = await browser.newContext({ permissions: [] });
  page = await context.newPage();
  const setup = new PlaywightSetup();
  setup.setPage(page);
});

After(async function () {
  await page.close();
  await context.close();
});
