import pages from "../pages/page-factory.page.js";
import CommonSteps from "../steps/common.steps.js";
import cucumberMethods from "../../utils/testRunners/cucumberWrapper.js";
import ENVIRONMENT from "../../config/environment.js";
import { chromium } from "@playwright/test";
import { PlaywightSetup } from "../../utils/playwight/playwightSetup.js";

const { Given, When, Then } = cucumberMethods;

Given(/^I open Report Portal$/, async function () {
  if (ENVIRONMENT.FRAMEWORK === "playwight") {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const setup = new PlaywightSetup();
    setup.setPage(page);
  }
  await CommonSteps.openReportPortal();
});

When(/^I click on "(.+)" ?(on "(.+)" modal)? on "(.+)" page$/, async function (element: string, modal: string, page: string) {
  modal ? await pages[page].click(pages[page][modal][element]) : await pages[page].click(pages[page][element]);
});

When(/^I enter "([^"]*)" in "([^"]*)" on "([^"]*)" page$/, async function (text: string, element: string, page: string) {
  await pages[page].setValue(pages[page][element], text);
});

Then(/^I should be ?(on "(.+)" modal)? on "(.+)" page$/, async function (modal: string, page: string) {
  let uniqueElement = modal ? pages[page][modal].uniqueElement : pages[page].uniqueElement;
  if (typeof uniqueElement === "function") {
    uniqueElement = uniqueElement();
  }
  modal ? await pages[page].waitForElementAndScroll(uniqueElement) : await pages[page].waitForElementAndScroll(uniqueElement);
});

Then(/^I skip Notification Message with text "(.+)"$/, async function (text: string) {
  await pages["All Dashboards"].checkNotificationWithText(text);
});

Then(/^I wait till page is loaded$/, async function () {
  await CommonSteps.waitForSpinnersToHide();
});
