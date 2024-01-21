import slackService from "./slack.service.js";

class NotificationService {
  constructor(private service = slackService) {}
  async postNotification(notification: string) {
    await this.service.postNotification(notification);
  }
}

export default new NotificationService();
