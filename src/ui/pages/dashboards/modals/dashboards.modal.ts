import { BasePage } from "../../basePage/basePage.page.js";

export class DashboardsModal extends BasePage {
  constructor(public modalTitle: string) {
    super();
    this.modalTitle = modalTitle;
  }

  uniqueElement = () => `//div[./div/div/span[.="${this.modalTitle}"]]`;

  get ["Title"]() {
    return `${this.uniqueElement()}//span[.="${this.modalTitle}"]`;
  }

  get ["Cancel icon"]() {
    return `${this.uniqueElement()}//div[./*[name()="svg"]]`;
  }

  get ["Cancel button"]() {
    return `(${this.uniqueElement()}//button)[1]`;
  }
}
