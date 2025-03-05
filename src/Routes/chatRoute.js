const express = require("express");
const { chatModel } = require("../Models");
const { fetchUser, chatMiddlewares } = require("../Middleware/Index");
const { chatControllers } = require("../Controllers/Index");

const router = express.Router({ mergeParams: true });

//Send message
router
  .route("/send")
  .post(fetchUser, chatMiddlewares.validateChat, chatControllers.Send);

//Fetch messages
router.route("/fetch").get(fetchUser, chatControllers.Fetch);

//Update message
router.route("/update").patch(fetchUser, chatControllers.Update);

//Delete message
router.route("/delete").delete(fetchUser, chatControllers.Delete);

module.exports = router;
