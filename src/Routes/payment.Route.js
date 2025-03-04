const express = require("express");
const { paymentModel } = require("../Models");

const router = express.Router({ mergeParams: true });
router.get("/send", async (req, res) => {
  const newChat = await paymentModel.insertOne({
    payerId: "67c184b4b2897dabcc486f6f",
    recieverId: "67c185310a256b69edcb27b1",
    status: "Sent",
    amount: 300,
  });
  res.send(newChat);
});
module.exports = router;
