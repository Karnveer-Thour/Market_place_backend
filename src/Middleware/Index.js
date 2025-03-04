module.exports = {
  customerMiddlewares: require("./customer.middlewares"),
  providerMiddlewares: require("./provider.middlewares"),
  jobsMiddlewares: require("./job.middlewares"),
  serviceMiddlewares: require("./service.middlewares"),
  paymentMiddlewares: require("./payment.middlewares"),
  fetchUser: require("./fetchUser.middleware"),
};
