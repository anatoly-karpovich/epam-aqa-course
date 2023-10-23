import { LoggerWrapper } from "../../utils/logger/loggerWrapper.js";
import { logStep } from "../../utils/reporter/reporter.js";
import { hideSecretData } from "../../utils/strings/index.js";
import { DEFAULT_TIMEOUT } from "../../utils/timeouts/timeouts.js";

const Logger = LoggerWrapper.getLogger()

type SetValueContext = {
  isSecretValue: boolean;
};

export class BasePage {

  
  get ['Notification message']() {
    return (notificationText?: string) => notificationText ? `//div[@id="notification-root"]//p[text()="${notificationText}"]` : `div#notification-root p`
  }


  async findElement(selector: string) {
    const element = await $(selector);
    return element;
  }

  async findElementArray(selector: string) {
    const elements = await $$(selector);
    return elements;
  }

  async waitForElement(selector: string, reverse = false, timeout = DEFAULT_TIMEOUT) {
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

  @logStep("Add {text} into element with selector {selector}")
  async addValue(selector: string, text: string, context: SetValueContext = { isSecretValue: false }, timeout?: number) {
    try {
      const element = await this.waitForElementAndScroll(selector, timeout);
      if (element) {
        await element.addValue(text);
        Logger.log(`Successfully added "${context?.isSecretValue ? hideSecretData(text) : text}" into element with selector ${selector}`);
      }
    } catch (error) {
      Logger.log(`Failed to add "${context?.isSecretValue ? hideSecretData(text) : text}" into element with selector ${selector}`, "error");
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
    return text
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

  async checkNotificationWithText(text: string) {
    return await browser.waitUntil(async () => {
      const notifications = await this.findElementArray(this["Notification message"]())
      let expectedNotification: WebdriverIO.Element | undefined
      for(const n of notifications) {
        let actualText = await n.getText();
        if(text === actualText) {
          expectedNotification = n
          n.click()
        }
        break;
      }
      return expectedNotification
    })
  }
}
