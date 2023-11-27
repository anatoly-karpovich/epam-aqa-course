import config from "../../config/config.js";
import type { IRequestOptions, IResponse } from "../../types/api/apiClient.types.js";
import type { ICredentials, ILoginResponse } from "../../types/login.types.js";
import apiClient from "../apiClients/apiClient.js";
import { apiConfig } from "../apiConfig.js";

class LoginService {
  login(credentials: ICredentials): Promise<IResponse<ILoginResponse>> {
    const options: IRequestOptions = {
      method: "post",
      baseURL: apiConfig.baseURL,
      url: apiConfig.endpoints.Token,
      headers: {
        Authorization: config.LoginAuthorizationHeader
      },
      data: { ...credentials, grant_type : 'password' },
      requestType: "formData"
    };
    return apiClient.sendRequest<ILoginResponse>(options)
  }
}

export default new LoginService()