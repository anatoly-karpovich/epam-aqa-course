import type { ICredentials } from "../login.types.js"

interface IConfigForEnv {
    credentials: ICredentials,
    baseUrl: string,
    LoginAuthorizationHeader?: string,
    projectName?: string
  }
  
  export interface IConfig {
    local: IConfigForEnv,
    web: IConfigForEnv
  }