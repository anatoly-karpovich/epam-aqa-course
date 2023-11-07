import { Then, When, After } from "@wdio/cucumber-framework";
import { DEMO_DASHBOARD_DATA, generateNewDashboard } from "../../../data/dashboards/dashboardsUi.js";
import AddNewDashboardSteps from "../../steps/dashboards/AddNewDashboard.steps.js";
import editDashboardSteps from "../../steps/dashboards/editDashboard.steps.js";
import DashboardDetailsPage from "../../pages/dashboards/dashboardDetails.page.js";
import allDashboardsPage from "../../pages/dashboards/allDashboards.page.js";
import SidebarSteps from "../../steps/sidebar.steps.js";

When(/^I create new Dashboard on "Add New Dashboard" modal$/, async function() {
  const dashboard = generateNewDashboard()
  await AddNewDashboardSteps.submitNewDashboard(dashboard)
  this.parameters.dashboard = dashboard;
})

When(/^I update Dashboard on "Edit Dashboard" modal$/, async function() {
  const dashboard = generateNewDashboard()
  await editDashboardSteps.updateDashboard(dashboard)
  this.parameters.dashboard = dashboard;
})

Then(/^I should see correct dashboard name on "Dashboard Details" page$/, async function() {
  await DashboardDetailsPage.waitForElementToChangeText(DashboardDetailsPage.Title, this.parameters.dashboard.name.toUpperCase())
  const title = await DashboardDetailsPage.getText(DashboardDetailsPage.Title)
  const actualDashboardTitle = this.parameters.dashboard.name.toUpperCase();
  expect(actualDashboardTitle).toBe(title)
})

Then(/^I should( not)? see created dashboard on "All Dashboards" page$/, async function(not: string) {
  not
  ? await allDashboardsPage.waitForElement(allDashboardsPage["Dashboard Table Row by Dashboard Name"](this.parameters.dashboard.name), true)
  : await allDashboardsPage.waitForElement(allDashboardsPage["Dashboard Table Row by Dashboard Name"](this.parameters.dashboard.name))
})

When(/^I open (created|demo) dashboard detals on "All Dashboards" page$/, async function(dashboard: string) {
  dashboard === 'created'
  ? await allDashboardsPage.click(allDashboardsPage["Dashboard Name in table by Dashboard Name"](this.parameters.dashboard.name))
  : await allDashboardsPage.click(allDashboardsPage["Dashboard Name in table by Dashboard Name"](DEMO_DASHBOARD_DATA.name))
})

After("not @login", async() => {
  await SidebarSteps.logout()
})