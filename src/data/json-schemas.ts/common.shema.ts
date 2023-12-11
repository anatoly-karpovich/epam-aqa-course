export const messageSchema = {
  type: "object",
  properties: {
    message: { type: "string" }
  },
  required: [ "message" ]
}

export const errorSchema = {
  type: "object",
  properties: {
    errorCode: { type: "integer" },
    message: { type: "string" }
  },
  required: [ "errorCode", "message" ]
}

export const idSchema = {
  type: "object",
  properties: {
    id: { type: "integer" }
  },
  required: [ "id" ]
}