import { Then as thenWdio, When as whenWdio, After as afterWdio, DataTable as dataTableWdio } from "@wdio/cucumber-framework";
import { Then as thenPlaywright, When as whenPlaywright, After as afterPlaywright, DataTable as dataTablePlaywright } from "@cucumber/cucumber";
import { DEMO_DASHBOARD_DATA, generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import AddNewDashboardSteps from "../../steps/dashboards/AddNewDashboard.steps.js";
import editDashboardSteps from "../../steps/dashboards/editDashboard.steps.js";
import DashboardDetailsPage from "../../pages/dashboards/dashboardDetails.page.js";
import allDashboardsPage from "../../pages/dashboards/allDashboards.page.js";
import SidebarSteps from "../../steps/sidebar.steps.js";
import { expect } from "chai";
import ENVIRONMENT from "../../../config/environment.js";

const Then = ENVIRONMENT.FRAMEWORK === "wdio" ? thenWdio : thenPlaywright;
const When = ENVIRONMENT.FRAMEWORK === "wdio" ? whenWdio : whenPlaywright;
const After = ENVIRONMENT.FRAMEWORK === "wdio" ? afterWdio : afterPlaywright;
const DataTable = ENVIRONMENT.FRAMEWORK === "wdio" ? dataTableWdio : dataTablePlaywright;

When(/^I create new Dashboard on "Add New Dashboard" modal$/, async function () {
  const dashboard = generateNewDashboard();
  await AddNewDashboardSteps.submitNewDashboard(dashboard);
  this.parameters.dashboard = dashboard;
});

When(/^I update Dashboard on "Edit Dashboard" modal$/, async function () {
  const dashboard = generateNewDashboard();
  await editDashboardSteps.updateDashboard(dashboard);
  this.parameters.dashboard = dashboard;
});

Then(/^I should see correct dashboard name on "Dashboard Details" page$/, async function () {
  await DashboardDetailsPage.waitForElementToChangeText(DashboardDetailsPage.Title, this.parameters.dashboard.name.toUpperCase());
  const title = await DashboardDetailsPage.getText(DashboardDetailsPage.Title);
  const actualDashboardTitle = this.parameters.dashboard.name.toUpperCase();
  expect(actualDashboardTitle).to.equal(title);
});

Then(/^I should( not)? see created dashboard on "All Dashboards" page$/, async function (not: string) {
  not
    ? await allDashboardsPage.waitForElement(allDashboardsPage["Dashboard Table Row by Dashboard Name"](this.parameters.dashboard.name), true)
    : await allDashboardsPage.waitForElement(allDashboardsPage["Dashboard Table Row by Dashboard Name"](this.parameters.dashboard.name));
});

When(/^I open (created|demo) dashboard detals on "All Dashboards" page$/, async function (dashboard: string) {
  dashboard === "created"
    ? await allDashboardsPage.click(allDashboardsPage["Dashboard Name in table by Dashboard Name"](this.parameters.dashboard.name))
    : await allDashboardsPage.click(allDashboardsPage["Dashboard Name in table by Dashboard Name"](DEMO_DASHBOARD_DATA.name));
});

Then(/^I should see following widgets on "Dashboard Details" page:$/, async function (table: typeof DataTable) {
  //@ts-ignore
  const widgets = table.rows().flat();
  for (const widget of widgets) {
    await DashboardDetailsPage.waitForElementAndScroll(DashboardDetailsPage["Widget by Name"](widget));
  }
});

After("not @login", async () => {
  await SidebarSteps.logout();
});
