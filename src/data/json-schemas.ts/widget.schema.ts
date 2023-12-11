export const widgetSchema = {
  type: "object",
  properties: {
    widgetId: { type: "integer" },
    widgetName: { type: "string" },
    widgetOptions: {
      type: "object",
      properties: {
        zoom: { type: "boolean" },
        timeline: { type: "string" },
        viewMode: { type: "string" }
      },
    },
    widgetPosition: {
      type: "object",
      properties: {
        positionX: { type: "integer" },
        positionY: { type: "integer" },
      },
      required: ["positionX", "positionY"]
    },
    widgetSize: {
      type: "object",
      properties: {
        height: { type: "integer" },
        width: { type: "integer" },
      },
      required: ["height", "width"]
    },
    widgetType: { type: "string" }
  },
  required: ["widgetId", "widgetName", "widgetOptions", "widgetPosition", "widgetSize", "widgetType"]
}