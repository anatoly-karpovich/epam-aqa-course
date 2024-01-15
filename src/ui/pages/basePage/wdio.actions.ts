import type { IBaseActions, SetValueContext } from "../../../types/core/actions/baseActions.js";
import Logger from "../../../utils/logger/logger.js";
import { logStep } from "../../../utils/reporter/decorators.js";
import { hideSecretData } from "../../../utils/string/index.js";
import { DEFAULT_TIMEOUT } from "../../../utils/timeouts/timeouts.js";
import baseSelectors from "./baseSelectors.js";

export class WdioActions implements IBaseActions {
  async findElement(selector: string) {
    const element = await $(selector);
    return element;
  }

  async findElementArray(selector: string) {
    const elements = await $$(selector);
    return elements;
  }

  async waitForElement(selector: string, reverse = false, timeout = DEFAULT_TIMEOUT): Promise<WebdriverIO.Element> {
    const element = await this.findElement(selector);
    await element.waitForDisplayed({
      timeout,
      reverse,
      timeoutMsg: `Element with selector ${selector} was not found`,
    });
    return element;
  }

  async waitForElementAndScroll(selector: string, timeout = DEFAULT_TIMEOUT) {
    try {
      const element = await this.waitForElement(selector, false, timeout);
      await element.waitForExist({ timeout });
      await element.scrollIntoView({ block: "center" });
      await element.waitForClickable({ timeout });
      const isScrolled = this.isDisplayedInViewport(selector, timeout);
      expect(isScrolled).toBe(true);
      Logger.log(`Successfully scrolled to element with selector ${selector}`);
      return element;
    } catch (error) {
      Logger.log(`Failed to scroll to element with selector ${selector}`, "error");
      throw error;
    }
  }

  @logStep("Click on element with selector {selector}")
  async click(selector: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.click();
        Logger.log(`Successfully clicked on element with selector ${selector}`);
      }
    } catch (error) {
      Logger.log(`Failed to click on element with selector ${selector}`, "error");
      throw error;
    }
  }

  @logStep("Set {text} into element with selector {selector}")
  async setValue(selector: string, text: string, context: SetValueContext = { isSecretValue: false }, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.setValue(text);
        Logger.log(`Successfully set "${context?.isSecretValue ? hideSecretData(text) : text}" into element with selector ${selector}`);
      }
    } catch (error) {
      Logger.log(`Failed to set "${context?.isSecretValue ? hideSecretData(text) : text}" into element with selector ${selector}`, "error");
      throw error;
    }
  }

  @logStep("Clear value from element with selector {selector}")
  async clear(selector: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.clearValue();
        Logger.log(`Successfully cleared value from element with selector ${selector}`);
      }
    } catch (error) {
      Logger.log(`Failed to clear value from element with selector ${selector}`, "error");
      throw error;
    }
  }

  async getText(selector: string, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    const text = await element.getText();
    return text;
  }

  async openPage(url: string) {
    try {
      await browser.url(url);
      Logger.log(`Successfully opened url: ${url}`);
    } catch (error) {
      Logger.log(`Failed to opened url: ${url}`, "error");
      throw error;
    }
  }

  async hoverElement(selector: string, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    await element.moveTo();
  }

  async dragAndDrop(elementSelector: string, targetSelector: string, timeout?: number) {
    const sourceElement = await this.waitForElementAndScroll(elementSelector, timeout);
    const targetElement = await this.waitForElementAndScroll(targetSelector, timeout);

    await sourceElement.dragAndDrop(targetElement);
  }

  async checkNotificationWithText(text: string) {
    let expectedNotification: WebdriverIO.Element | undefined;
    await browser.waitUntil(
      async () => {
        const notifications = await this.findElementArray(baseSelectors["Notification message"]());
        for (const n of notifications) {
          let actualText = await n.getText();
          if (text === actualText) {
            expectedNotification = n;
            await n.click();
            await n.waitForDisplayed({ reverse: true });
            break;
          }
        }
        return expectedNotification;
      },
      { timeoutMsg: `Notification message with text "${text}" was not found`, timeout: DEFAULT_TIMEOUT }
    );
  }

  async waitForElementToChangeText(selector: string, text: string, timeout = DEFAULT_TIMEOUT) {
    await browser.waitUntil(
      async () => {
        const elementText = await this.getText(selector);
        return elementText === text;
      },
      { timeout, timeoutMsg: `Element still does not has text ${text}` }
    );
  }

  async waitForElementsArrayToBeDisplayed(selector: string, reverse?: boolean, timeout = DEFAULT_TIMEOUT) {
    await browser.waitUntil(
      async () => {
        const elements = await this.findElementArray(selector);
        for (const element of elements) {
          await element.waitForDisplayed({ timeout, reverse });
        }
        return true;
      },
      { timeout }
    );
  }

  async isDisplayedInViewport(selector: string, timeout = DEFAULT_TIMEOUT) {
    const element = await this.findElement(selector);
    const isScrolledIntoView = await element.isDisplayedInViewport();
    return isScrolledIntoView;
  }
}
