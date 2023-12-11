export interface IWidget {
    widgetId: number,
    widgetName: string,
    widgetOptions: object,
    widgetPosition: WidgetPosition,
    widgetSize: WidtetSize,
    widgetType: string
}

type WidtetSize = {
  height: number,
  width: number
}

type WidgetPosition = {
  positionX: number,
  positionY: number
}