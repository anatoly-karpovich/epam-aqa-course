export default {
  ["Notification message"]: (notificationText?: string) => (notificationText ? `//div[@id="notification-root"]//p[text()="${notificationText}"]` : `div#notification-root p`),
  ["Spinner"]: `div.spinningPreloader__spinning-preloader--iC5Pz`,
};
