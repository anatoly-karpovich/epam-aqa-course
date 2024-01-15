import type { IBaseActions, IWaitUntilOptions, SetValueContext } from "../../../types/core/actions/baseActions.js";
import Logger from "../../../utils/logger/logger.js";
import { hideSecretData } from "../../../utils/string/index.js";
import { DEFAULT_TIMEOUT, TIMEOUT_10_SEC } from "../../../utils/timeouts/timeouts.js";
import baseSelectors from "./baseSelectors.js";
import { PlaywightSetup } from "../../../utils/playwight/playwightSetup.js";
import { Locator } from "@playwright/test";

export class PlaywrightActions implements IBaseActions {
  private playwrightSetup = new PlaywightSetup();

  async findElement(selector: string) {
    const page = this.playwrightSetup.getPage();
    const element = await page.locator(selector);
    return element;
  }

  async findElementArray(selector: string) {
    const page = this.playwrightSetup.getPage();
    const elements = await page.locator(selector).all();
    return elements;
  }

  private async waitUntil(condition: () => Promise<boolean>, options?: IWaitUntilOptions) {
    const page = this.playwrightSetup.getPage();
    const interval = options?.interval ?? 500;
    const timeout = options?.timeout || TIMEOUT_10_SEC;
    const timeoutMessage = options?.timeoutMsg || `Condition not met within the specified timeout.`;
    let elapsedTime = 0;

    while (elapsedTime < timeout) {
      if (await condition()) {
        return;
      }

      await page.waitForTimeout(interval);
      elapsedTime += interval;
    }

    throw new Error(timeoutMessage);
  }

  async waitForElement(selector: string, reverse = false, timeout = DEFAULT_TIMEOUT) {
    const element = this.findElement(selector);
    (await element).waitFor({ state: reverse ? "visible" : "hidden", timeout });
    return element;
  }

  async waitForElementAndScroll(selector: string, timeout = DEFAULT_TIMEOUT) {
    const element = await this.findElement(selector);
    try {
      await element.scrollIntoViewIfNeeded({ timeout });
      Logger.log(`Successfully scrolled to element with selector ${selector}`);
      return element;
    } catch (error) {
      Logger.log(`Failed to scroll to element with selector ${selector}`, "error");
      throw error;
    }
  }

  async click(selector: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.click({ timeout });
        Logger.log(`Successfully clicked on element with selector ${selector}`);
      }
    } catch (error) {
      Logger.log(`Failed to click on element with selector ${selector}`, "error");
      throw error;
    }
  }

  async setValue(selector: string, text: string, context: SetValueContext = { isSecretValue: false }, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.fill(text, { timeout });
        Logger.log(`Successfully set "${context?.isSecretValue ? hideSecretData(text) : text}" into element with selector ${selector}`);
      }
    } catch (error) {
      Logger.log(`Failed to set "${context?.isSecretValue ? hideSecretData(text) : text}" into element with selector ${selector}`, "error");
      throw error;
    }
  }

  async clear(selector: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.fill("", { timeout });
        Logger.log(`Successfully cleared value from element with selector ${selector}`);
      }
    } catch (error) {
      Logger.log(`Failed to clear value from element with selector ${selector}`, "error");
      throw error;
    }
  }

  async getText(selector: string, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    const text = await element.innerText({ timeout });
    return text;
  }

  async openPage(url: string) {
    const page = this.playwrightSetup.getPage();
    try {
      await page.goto(url);
      Logger.log(`Successfully opened url: ${url}`);
    } catch (error) {
      Logger.log(`Failed to opened url: ${url}`, "error");
      throw error;
    }
  }

  async hoverElement(selector: string, timeout?: number) {
    const element = await this.waitForElementAndScroll(selector, timeout);
    await element.hover({ timeout });
  }

  async dragAndDrop(elementSelector: string, targetSelector: string, timeout?: number) {
    const sourceElement = await this.waitForElementAndScroll(elementSelector, timeout);
    const targetElement = await this.waitForElementAndScroll(targetSelector, timeout);
    await sourceElement.dragTo(targetElement, { timeout });
  }

  async checkNotificationWithText(text: string) {
    let expectedNotification: Locator | undefined;
    await this.waitUntil(
      async () => {
        const notifications = await this.findElementArray(baseSelectors["Notification message"]());
        for (const n of notifications) {
          let actualText = await n.innerText();
          if (text === actualText) {
            expectedNotification = n;
            await n.click();
            await n.waitFor({ state: "hidden" });
            break;
          }
        }
        return !!expectedNotification;
      },
      { timeoutMsg: `Notification message with text "${text}" was not found` }
    );
  }

  async waitForElementToChangeText(selector: string, text: string, timeout = DEFAULT_TIMEOUT) {
    await this.waitUntil(
      async () => {
        const elementText = await this.getText(selector);
        return elementText === text;
      },
      { timeout, timeoutMsg: `Element still does not has text ${text}` }
    );
  }

  async waitForElementsArrayToBeDisplayed(selector: string, reverse?: boolean, timeout = DEFAULT_TIMEOUT) {
    await this.waitUntil(async () => {
      const elements = await this.findElementArray(selector);
      for (const element of elements) {
        await element.waitFor({ timeout, state: reverse ? "visible" : "hidden" });
      }
      return true;
    });
  }

  async isDisplayerInViewport(selector: string, timeout = DEFAULT_TIMEOUT) {
    const page = this.playwrightSetup.getPage();
    const isScrolledIntoView = await page.$eval(selector, (element) => {
      const rect = element.getBoundingClientRect();
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth;
    });
    return isScrolledIntoView;
  }
}
