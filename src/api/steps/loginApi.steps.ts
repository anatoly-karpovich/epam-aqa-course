import type { ICredentials } from "../../types/login.types.js";
import loginService from "../services/login.service.js";
import LoggedInUsers from "../../utils/entities/loggedInUsers.js";
import { STATUS_CODES } from "../../data/http.js";
import config from "../../config/config.js";
import { logStep } from "../../utils/reporter/decorators.js";

class LoginApiSteps {

  @logStep("Sign in via API")
  async login(credentials: ICredentials) {
    const response = await loginService.login(credentials);
    expect(response.status).toBe(STATUS_CODES.OK);
    LoggedInUsers.setUser(credentials.username, response.data);
    return LoggedInUsers.getToken();
  }

  @logStep("Sign in as admin via API")
  async loginAsAdmin() {
    return await this.login({username: config.credentials.username, password: config.credentials.password})
  }
}

export default new LoginApiSteps();
