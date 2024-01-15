import { Page } from "@playwright/test";

export type SetValueContext = {
  isSecretValue: boolean;
};

export type PageContext = {
  page: Page;
};

export interface IBaseActions {
  waitForElement: (selector: string, reverse: boolean, timeout?: number, pageContext?: PageContext) => Promise<object>;
  waitForElementAndScroll: (selector: string, timeout?: number, pageContext?: PageContext) => Promise<object>;
  click: (selector: string, timeout?: number, pageContext?: PageContext) => Promise<void>;
  setValue: (selector: string, text: string, context: SetValueContext, timeout?: number, pageContext?: PageContext) => Promise<void>;
  clear: (selector: string, timeout?: number, pageContext?: PageContext) => Promise<void>;
  getText: (selector: string, timeout?: number, pageContext?: PageContext) => Promise<string>;
  openPage: (url: string, pageContext?: PageContext) => Promise<void>;
  checkNotificationWithText: (text: string, pageContext?: PageContext) => Promise<void>;
  waitForElementToChangeText: (selector: string, text: string, timeout?: number, pageContext?: PageContext) => Promise<void>;
  waitForElementsArrayToBeDisplayed: (selector: string, reverse?: boolean, timeout?: number, pageContext?: PageContext) => Promise<void>;
  hoverElement: (selector: string, timeout?: number, pageContext?: PageContext) => Promise<void>;
  dragAndDrop: (elementSelector: string, targetSelector: string, timeout?: number, pageContext?: PageContext) => Promise<void>;
}

export interface IWaitUntilOptions {
  timeout?: number;
  timeoutMsg?: string;
  interval?: number;
}
