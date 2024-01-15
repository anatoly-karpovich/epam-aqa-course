import { BasePage } from "../basePage/basePage.page.js";

export class DashboardsPage extends BasePage {
  get ["Add New Dashboard button"]() {
    return `//button[.//span[.="Add New Dashboard"]]`;
  }
}
