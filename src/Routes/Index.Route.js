const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome");
});

module.exports = {
  home: router,
  customerRoute: require("./customerRoute"),
  providerRoute: require("./providerRoute"),
  jobRoute: require("./jobRoute"),
  serviceRoute: require("./serviceRoute"),
  chatRoute: require("./chatRoute"),
  feedbackRoute: require("./feedback.Route"),
  paymentRoute: require("./payment.Route"),
};
