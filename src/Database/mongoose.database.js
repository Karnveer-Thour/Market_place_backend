const mongoose = require("mongoose");
const mongooseConnect = (URL) => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("Database connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = mongooseConnect;
