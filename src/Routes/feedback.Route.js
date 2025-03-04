const express = require("express");
const { feedbackModel } = require("../Models");

const router = express.Router({ mergeParams: true });
router.get("/send", async (req, res) => {
  const newChat = await feedbackModel.insertOne({
    senderId: "67c184b4b2897dabcc486f6f",
    recieverId: "67c185310a256b69edcb27b1",
    description: "Hello",
    rating: 3,
  });
  res.send(newChat);
});
module.exports = router;
