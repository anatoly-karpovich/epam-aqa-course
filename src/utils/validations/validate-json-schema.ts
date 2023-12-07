import Ajv from "ajv";
import { IResponse } from "../../types/api/apiClient.types.js";
import Logger from "../logger/logger.js";
import { expect } from "chai";


export function validateSchema(response: IResponse, schema: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.data);
  if(!isValidSchema) {
    Logger.log(JSON.stringify(validate.errors), 'error')
  }
  expect(isValidSchema).to.equal(true);
}