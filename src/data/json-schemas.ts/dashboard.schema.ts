import { pageSchema } from "./page.schema.js";
import { widgetSchema } from "./widget.schema.js";

export const dashboardSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    id: { type: "integer" },
    owner: { type: "string" },
    widgets: {
      type: "array",
      minItems: 0,
      items: widgetSchema
    }
  },
  required: ["name", "id", "owner", "widgets"]
}

export const allDashboardsSchema = {
  type: "object",
  properties: {
    content: {
      type: "array",
      minItems: 0,
      items: dashboardSchema
    },
    page: pageSchema,
  },
  required: ["content", "page"]
}
