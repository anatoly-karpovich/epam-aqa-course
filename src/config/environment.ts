import { IConfig } from "../types/config/config.types.js";

const conf: IConfig = {
  local: {
    credentials: {
      username: `${process.env.LOGIN_LOCAL}`,
      password: `${process.env.PASSWORD_LOCAL}`,
    },
    baseUrl: `${process.env.URL_LOCAL}`,
  },

  web: {
    credentials: {
      username: `${process.env.LOGIN_WEB}`,
      password: `${process.env.PASSWORD_WEB}`,
    },
    baseUrl: `${process.env.URL_WEB}`,
  },
};

const ENVIRONMENT = {
  LoginAuthorizationHeader: `${process.env.AUTHORIZATION}`,
  projectName: `${process.env.PROJECT_NAME}`,
  ...conf[process.env.ENVIRONMENT || "web"],
  ENVIRONMENT: `${process.env.ENVIRONMENT}`,
  FRAMEWORK: `${process.env.FRAMEWORK}`,
  DEBUG: `${process.env.DEBUG}`,
  TEST_RUNNER: `${process.env.TEST_RUNNER}`,
  MAX_INSTANCES: `${process.env.MAX_INSTANCES}`,
  AUTHORIZATION: `${process.env.AUTHORIZATION}`,
  API_CLIENT: `${process.env.API_CLIENT}`,
  PROJECT_NAME: `${process.env.PROJECT_NAME}`,
  LOGGER: `${process.env.LOGGER}`,
  SLACK_NOTIFICATION_URL: `${process.env.SLACK_NOTIFICATION_URL}`,
};

export default ENVIRONMENT;
