export interface INewDashboardUI {
  name: string;
  description?: string;
}

export interface IDashboardDeleteResponse {
  message: string;
}

export interface IDashboardUpdateResponse {
  message: string;
}

export interface IDashboardResponse extends INewDashboardUI {
  id: number;
  owner: string;
  widgets: IWidget[];
}

export interface IWidget {
  widgetId: number;
  widgetName: string;
  widgetOptions: {
    zoom?: boolean;
    timeline?: string;
    viewMode?: string;
  };
  widgetPosition: {
    positionX: number;
    positionY: number;
  };
  widgetSize: {
    height: number;
    width: number;
  };
  widgetType: string;
}

export interface IDashboardGetAllResponse {
  content: IWidget[];
  page: {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}
