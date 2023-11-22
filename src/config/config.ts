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
    LoginAuthorizationHeader: `${process.env.AUTHORIZATION}`,
    projectName: `${process.env.PROJECT_NAME}`
  },
};

export default conf[process.env.ENVIRONMENT || "local"];
