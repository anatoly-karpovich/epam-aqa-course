export const pageSchema = {
  type: "object",
  properties: {
    number: { type: "integer" },
    size: { type: "integer" },
    totalElements: { type: "integer" },
    totalPages: { type: "integer" },
  },
  required: ["number", "size", "totalElements", "totalPages"]
}