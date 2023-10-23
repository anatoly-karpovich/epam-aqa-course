import type { INewDashboardUI } from "../../types/dashboards/addNewDashboard.types.js";

export function generateNewDashboard(dashboardValues?: Partial<INewDashboardUI>): INewDashboardUI {
    const newDashboard: INewDashboardUI = {
        name: `Epam-AQA-${Date.now()}`,
        description: `Test description`,
        ...dashboardValues
    }
    return newDashboard
}

export enum NOTIFICATION_MESSAGES {
    DASHBOARD_ADDED = 'Dashboard has been added',
    LOGOUT = 'You have been logged out',
    SIGNED_IN = 'Signed in successfully',
    DASHBOARD_DELETED = 'Dashboard has been deleted'
}