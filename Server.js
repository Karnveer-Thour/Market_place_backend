require("dotenv").config();
const cors = require("cors");
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
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", home);
app.use("/customer", customerRoute);
app.use("/provider", providerRoute);
app.use("/jobs", jobRoute);
app.use("/services", serviceRoute);
app.use("/chats", chatRoute);
app.use("/feedbacks", feedbackRoute);
app.use("/payments", paymentRoute);

app.listen(port, () => {
  const now = Date.now();
  const date = new Date(now);

  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedTime = formatter.format(date);
  console.log("App is starting on", formattedTime);
  console.log("App is listening at port:", port);
  Mongoose(URL);
});
