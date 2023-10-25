import { DashboardsPage } from "./dashboards.page.js";

class AllDashboardsPage extends DashboardsPage {
  get ["Title"]() {
    return `span[title="All Dashboards"]`;
  }

  get ["Search input"]() {
    return `input[placeholder="Search by name"]`;
  }

  get ["Display Icons button"]() {
    return `(//button)[2]`;
  }

  get ["Display List button"]() {
    return `(//button)[3]`;
  }

  get ["Dashboard Table Row by Dashboard Name"]() {
    return (dashboardName: string) => `(//div[./a[text()="${dashboardName}"]])[2]`;
  }

  get ["Dashboard Name in table by Dashboard Name"](): (dashboardName: string) => string {
    return (dashboardName: string) => `${this["Dashboard Name in table by Dashboard Name"](dashboardName)}/a`;
  }

  get ["Dashboard Description in table by Dashboard Name"](): (dashboardName: string) => string {
    return (dashboardName: string) => `${this["Dashboard Name in table by Dashboard Name"](dashboardName)}/div[1]`;
  }

  get ["Dashboard Owner in table by Dashboard Name"](): (dashboardName: string) => string {
    return (dashboardName: string) => `${this["Dashboard Name in table by Dashboard Name"](dashboardName)}/div[2]`;
  }

  get ["Dashboard Edit in table by Dashboard Name button"](): (dashboardName: string) => string {
    return (dashboardName: string) => `${this["Dashboard Name in table by Dashboard Name"](dashboardName)}/div[3]/i`;
  }

  get ["Dashboard Delete in table by Dashboard Name button"](): (dashboardName: string) => string {
    return (dashboardName: string) => `${this["Dashboard Name in table by Dashboard Name"](dashboardName)}/div[4]//i`;
  }
}

export default new AllDashboardsPage();
