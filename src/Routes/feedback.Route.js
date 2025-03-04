const express = require("express");
const { feedbackMiddlewares, fetchUser } = require("../Middleware/Index");
const { feedbackControllers } = require("../Controllers/Index");

const router = express.Router({ mergeParams: true });

// Route to send feedback
router.route("/send").post(fetchUser,feedbackMiddlewares.validateFeedback,feedbackControllers.send);

// Route to get feedbacks
router.route("/").get(fetchUser,feedbackControllers.getFeedbacks);

//Route to fetch a particular feedback
router.route("/get").get(fetchUser,feedbackControllers.getFeedback);

//Route to update a particular feedback
router.route("/update").patch(fetchUser,feedbackControllers.updateFeedback);

//Route to delete a particular feedback
router.route("/delete").delete(fetchUser,feedbackControllers.deleteFeedback);

module.exports = router;
