import { IDashboardResponse } from "../../types/dashboards/dashboards.types";

class Dashboards {
  private dashboards: IDashboardResponse[] = [];
  private static instance: Dashboards;

  constructor() {
    if (Dashboards.instance) {
      return Dashboards.instance;
    }
    Dashboards.instance = this;
  }

  addDashboard(dashboard: IDashboardResponse) {
    this.dashboards.push(dashboard)
  }

  getDashboard(dashboardId?: number) {
    return dashboardId
    ? this.findDashboard(dashboardId)
    : this.dashboards[this.dashboards.length - 1]
  }

  getAllDashboards() {
    return this.dashboards
  }

  deleteDashboard(dashboardId?: number) {
    if(dashboardId) {
      this.dashboards.splice(this.findDashboardIndex(dashboardId), 1)
    } else {
      this.dashboards.splice(this.dashboards.length - 1, 1)
    }
  }

  private findDashboard(dashboardId: number) {
    return this.dashboards[this.findDashboardIndex(dashboardId)]
  }

  private findDashboardIndex(dashboardId: number) {
    return this.dashboards.findIndex(d => d.id === dashboardId)
  }
}

export default new Dashboards();