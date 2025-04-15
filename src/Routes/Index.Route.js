const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the server of marketplace");
});

module.exports = {
  home: router,
  adminRoute: require('./adminRoute'),
  customerRoute: require("./customerRoute"),
  providerRoute: require("./providerRoute"),
  jobRoute: require("./jobRoute"),
  serviceRoute: require("./serviceRoute"),
  chatRoute: require("./chatRoute"),
  feedbackRoute: require("./feedback.Route"),
  paymentRoute: require("./payment.Route"),
};
