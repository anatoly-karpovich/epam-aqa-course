import { DEFAULT_TIMEOUT } from "../../utils/timeouts/timeouts.js";

export class BasePage {
    async findElement(selector: string) {
        const element = await $(selector);
        return element
    }

    async findElementArray(selector: string) {
        const elements = await $$(selector);
        return elements
    }

    async waitForElement(selector: string, reverse = false, timeout?: number) {
        const element = await this.findElement(selector);
        element.waitForDisplayed({ timeout: timeout ?? DEFAULT_TIMEOUT, reverse: !!reverse, timeoutMsg: `Element with selector ${selector} was not found`})
        return element;
    }

    async click(selector: string, timeout?: number) {
        const element = await this.waitForElement(selector, false, timeout);
        await element.click();
    }

    async setValue(selector: string, text: string, timeout?: number) {
        const element = await this.waitForElement(selector, false, timeout);
        await element.setValue(text); 
    }

    async addValue(selector: string, text: string, timeout?: number) {
        const element = await this.waitForElement(selector, false, timeout);
        await element.addValue(text); 
    }

    async clear(selector: string, timeout?: number) {
        const element = await this.waitForElement(selector, false, timeout);
        await element.clearValue(); 
    }
}
