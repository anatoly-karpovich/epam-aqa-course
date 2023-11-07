import { When, Given, Then } from "@wdio/cucumber-framework";
import pages from "../pages/page-factory.page.js";
import config from "../../config/config.js";
import commonSteps from "../steps/common.steps.js";

Given(/^I open Report Portal$/, async function () {
  await browser.url(config.baseUrl);
});

When(/^I click on "(.+)" ?(on "(.+)" modal)? on "(.+)" page$/, async function (element: string, modal: string, page: string) {
  modal ? await pages[page].click(pages[page][modal][element]) : await pages[page].click(pages[page][element]);
});

When(/^I enter "([^"]*)" in "([^"]*)" on "([^"]*)" page$/, async function (text: string, element: string, page: string) {
  await pages[page].setValue(pages[page][element], text);
});

Then(/^I should be ?(on "(.+)" modal)? on "(.+)" page$/, async function (modal: string, page: string) {
  await browser.pause(500)
  let uniqueElement = modal ? pages[page][modal].uniqueElement : pages[page].uniqueElement
  if(typeof uniqueElement === 'function') {
    uniqueElement = uniqueElement()
  }
  modal ? await pages[page].waitForElementAndScroll(uniqueElement) : await pages[page].waitForElementAndScroll(uniqueElement);
});

Then(/^I wait for "([0-9]*)" seconds$/, async function (milliseconds: string) {
  await browser.pause(+milliseconds * 1000);
});

Then(/^I skip Notification Message with text "(.+)"$/, async function (text: string) {
  await pages["All Dashboards"].checkNotificationWithText(text)
});

Then(/^I wait till page is loaded$/, async function() {
  await commonSteps.waitForSpinnersToHide()
})
