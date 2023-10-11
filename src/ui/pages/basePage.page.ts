import Logger from "../../utils/logger/logger.js";
import { DEFAULT_TIMEOUT } from "../../utils/timeouts/timeouts.js";

export class BasePage {
  async findElement(selector: string) {
    const element = await $(selector);
    return element;
  }

  async findElementArray(selector: string) {
    const elements = await $$(selector);
    return elements;
  }

  async waitForElement(
    selector: string,
    reverse = false,
    timeout = DEFAULT_TIMEOUT
  ) {
    const element = await this.findElement(selector);
    element.waitForDisplayed({
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
      Logger.log(`Successfully scrolled to element with selector ${selector}`);
      return element;
    } catch (error) {
      Logger.log(`Failed to scroll to element with selector ${selector}`, 'error');
      throw error
    }
  }

  async click(selector: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.click();
        Logger.log(
          `Successfully clicked on element with selector ${selector}`
        );
      }
    } catch (error) {
      Logger.log(`Failed to click on element with selector ${selector}`, 'error');
      throw error
    }
  }

  async setValue(selector: string, text: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.setValue(text);
        Logger.log(
          `Successfully set "${text}" into element with selector ${selector}`
        );
      }
    } catch (error) {
      Logger.log(
        `Failed to set "${text}" into element with selector ${selector}`, 'error'
      );
      throw error
    }
  }

  async addValue(selector: string, text: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.addValue(text);
        Logger.log(
          `Successfully added "${text}" into element with selector ${selector}`
        );
      }
    } catch (error) {
      Logger.log(
        `Failed to add "${text}" into element with selector ${selector}`, 'error'
      );
      throw error
    }
  }

  async clear(selector: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.clearValue();
        Logger.log(
          `Successfully cleared value from element with selector ${selector}`
        );
      }
    } catch (error) {
      Logger.log(
        `Failed to clear value from element with selector ${selector}`, 'error'
      );
      throw error
    }
  }

  async openPage(url: string) {
    try {
      await browser.url(url);
      Logger.log(`Successfully opened url: ${url}`)
    } catch (error) {
      Logger.log(`Failed to opened url: ${url}`, 'error');
      throw error
    }
  }
}
