import type { ICredentials } from "../../types/login.types.js";
import LoginService from "../services/login.service.js";
import LoggedInUsers from "../../utils/entities/loggedInUsers.js";
import { STATUS_CODES } from "../../data/http.js";
import ENVIRONMENT from "../../config/environment.js";
import { logStep } from "../../utils/reporter/decorators.js";
import { expect } from "chai";

class LoginApiSteps {
  @logStep("Sign in via API")
  async login(credentials: ICredentials) {
    const response = await LoginService.login(credentials);
    expect(response.status).to.equal(STATUS_CODES.OK);
    LoggedInUsers.setUser(credentials.username, response.data);
    return LoggedInUsers.getToken();
  }

  @logStep("Sign in as admin via API")
  async loginAsAdmin() {
    const loginResponse = await this.login({ username: ENVIRONMENT.credentials.username, password: ENVIRONMENT.credentials.password });
    return loginResponse;
  }
}

export default new LoginApiSteps();
