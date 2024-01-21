import { IRequestOptions } from "../../types/api/apiClient.types.js";
import apiClient from "../apiClients/apiClient.js";
import ENVIRONMENT from "../../config/environment.js";

class SlackService {
  async postNotification(text: string) {
    const options: IRequestOptions = {
      method: "post",
      baseURL: `https://hooks.slack.com/`,
      url: ENVIRONMENT.SLACK_NOTIFICATION_URL,
      headers: {
        "Content-type": "application/json",
      },
      data: { text },
      requestType: "json",
    };
    return apiClient.sendRequest(options);
  }
}

export default new SlackService();
