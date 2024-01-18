import { IBaseActions, ResizeCoordinates } from "../../../types/core/actions/baseActions.js";
import { logStep } from "../../../utils/reporter/decorators.js";
import { DEFAULT_TIMEOUT } from "../../../utils/timeouts/timeouts.js";
import actionsStrategy from "./actions.js";
import baseSelectors from "./baseSelectors.js";

type SetValueContext = {
  isSecretValue: boolean;
};

export class BasePage implements IBaseActions {
  private actionsStrategy: IBaseActions;
  constructor() {
    this.actionsStrategy = new actionsStrategy();
  }

  get ["Notification message"]() {
    return baseSelectors["Notification message"];
  }

  get ["Spinner"]() {
    return baseSelectors.Spinner;
  }

  async waitForElement(selector: string, reverse = false, timeout = DEFAULT_TIMEOUT) {
    const result = await this.actionsStrategy.waitForElement(selector, reverse, timeout);
    return result;
  }

  async waitForElementAndScroll(selector: string, timeout = DEFAULT_TIMEOUT) {
    const result = await this.actionsStrategy.waitForElementAndScroll(selector, timeout);
    return result;
  }

  @logStep("Click on element with selector {selector}")
  async click(selector: string, timeout?: number) {
    await this.actionsStrategy.click(selector, timeout);
  }

  @logStep("Set {text} into element with selector {selector}")
  async setValue(selector: string, text: string, context: SetValueContext = { isSecretValue: false }, timeout?: number) {
    await this.actionsStrategy.setValue(selector, text, context, timeout);
  }

  @logStep("Clear value from element with selector {selector}")
  async clear(selector: string, timeout?: number) {
    await this.actionsStrategy.clear(selector, timeout);
  }

  async getText(selector: string, timeout?: number) {
    const text = await this.actionsStrategy.getText(selector, timeout);
    return text;
  }

  async openPage(url: string) {
    await this.actionsStrategy.openPage(url);
  }

  async hoverElement(selector: string, timeout?: number) {
    await this.actionsStrategy.hoverElement(selector, timeout);
  }

  async dragAndDrop(elementSelector: string, targetSelector: string, timeout?: number) {
    await this.actionsStrategy.dragAndDrop(elementSelector, targetSelector, timeout);
  }

  async resizeElement(selector: string, coordinates: ResizeCoordinates, timeout?: number) {
    await this.actionsStrategy.resizeElement(selector, coordinates, timeout);
  }

  async interceptResponse(url: string, triggerAction?: () => Promise<void>) {
    const response = await this.actionsStrategy.interceptResponse(url, triggerAction);
    return response;
  }

  async checkNotificationWithText(text: string) {
    await this.actionsStrategy.checkNotificationWithText(text);
  }

  async waitForElementToChangeText(selector: string, text: string, timeout = DEFAULT_TIMEOUT) {
    await this.actionsStrategy.waitForElementToChangeText(selector, text, timeout);
  }

  async waitForElementsArrayToBeDisplayed(selector: string, reverse?: boolean, timeout = DEFAULT_TIMEOUT) {
    await this.actionsStrategy.waitForElementsArrayToBeDisplayed(selector, reverse, timeout);
  }
}
