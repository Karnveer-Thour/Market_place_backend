require("dotenv").config();
const express = require("express");
const {
  customerRoute,
  providerRoute,
  serviceRoute,
  jobRoute,
  home,
  chatRoute,
  feedbackRoute,
  paymentRoute,
} = require("./src/Routes/Index.Route.js");
const { Mongoose } = require("./src/Database/index.js");
const app = express();
const port = process.env.port;
const URL = process.env.URL;
app.use(express.json());
app.use("/", home);
app.use("/customer", customerRoute);
app.use("/provider", providerRoute);
app.use("/jobs", jobRoute);
app.use("/services", serviceRoute);
app.use("/chat", chatRoute);
app.use("/feedback", feedbackRoute);
app.use("/payments", paymentRoute);

app.listen(port, () => {
  console.log("App is listening at", port);
  Mongoose(URL);
});
