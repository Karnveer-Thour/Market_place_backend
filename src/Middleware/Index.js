module.exports = {
  customerMiddlewares: require("./customer.middlewares"),
  providerMiddlewares: require("./provider.middlewares"),
  jobsMiddlewares: require("./job.middlewares"),
  serviceMiddlewares: require("./service.middlewares"),
  paymentMiddlewares: require("./payment.middlewares"),
  feedbackMiddlewares: require("./feedback.middlewares"),
  chatMiddlewares: require("./chat.middlewares"),
  fetchUser: require("./fetchUser.middleware"),
};
