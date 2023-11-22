import Ajv from "ajv";
import { IResponse } from "../../types/api/apiClient.types.js";
import { LoggerFactory } from "../logger/loggerWrapper.js";
const Logger = LoggerFactory.getLogger()

export function validateSchema(response: IResponse, schema: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.data);
  if(!isValidSchema) {
    Logger.log(JSON.stringify(validate.errors), 'error')
  }
  expect(isValidSchema).toBe(true);
}