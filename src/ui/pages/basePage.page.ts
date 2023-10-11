import { logger } from "../../utils/logger/logger.js";
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
      logger.info(`Successfully scrolled to element with selector ${selector}`);
      return element;
    } catch (error) {
      logger.error(`Error scrolling to element with selector ${selector}`);
      throw error
    }
  }

  async click(selector: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.click();
        logger.info(
          `Successfully clicked on element with selector ${selector}`
        );
      }
    } catch (error) {
      logger.error(`Error clicking on element with selector ${selector}`);
      throw error
    }
  }

  async setValue(selector: string, text: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.setValue(text);
        logger.info(
          `Successfully set "${text}" into element with selector ${selector}`
        );
      }
    } catch (error) {
      logger.error(
        `Error setting "${text}" into element with selector ${selector}`
      );
      throw error
    }
  }

  async addValue(selector: string, text: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.addValue(text);
        logger.info(
          `Successfully added "${text}" into element with selector ${selector}`
        );
      }
    } catch (error) {
      logger.error(
        `Error adding "${text}" into element with selector ${selector}`
      );
      throw error
    }
  }

  async clear(selector: string, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.clearValue();
        logger.info(
          `Successfully cleared value from element with selector ${selector}`
        );
      }
    } catch (error) {
      logger.error(
        `Error crealing value from element with selector ${selector}`
      );
      throw error
    }
  }
}
