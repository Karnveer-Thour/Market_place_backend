const { feedbackModel } = require("../Models");

// Controller to send feedback
const send = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ reason: "User id not found" });
    }
    if (!req.header("id")) {
      return res.status(401).send({ reason: "id not found" });
    }
    const feedback = await feedbackModel.insertOne({
      ...req.body,
      senderId: req.user,
      receiverId: req.header("id"),
    });
    res.status(201).json({
      success: true,
      message: "feedback sent successfully",
      Details: feedback,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Controller to get feedbacks
const getFeedbacks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ reason: "User id not found" });
    }
    const feedbacks = await feedbackModel
      .find({ receiverId: req.user }).populate("senderId").populate("receiverId");

    if (feedbacks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No feedbacks found",
      });
    }

    res.status(200).json({
      success: true,
      message: "feedbacks fetched successfully",
      Details: feedbacks,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Controller to fetch a particular feedback
const getFeedback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ reason: "User id not found" });
    }
    if(!req.query.id){
      return res.status(401).send({ reason: "Feedback id not found" });
    }
    const feedback = await feedbackModel
      .findOne({_id:req.query.id,receiverId:req.user}).populate("senderId").populate("receiverId");

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "No feedback found",
      });
    }

    res.status(200).json({
      success: true,
      message: "feedback fetched successfully",
      Details: feedback,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Update feedback
const updateFeedback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ reason: "User id not found" });
    }
    if(!req.query.id){
      return res.status(401).send({ reason: "Feedback id not found" });
    }
    const feedback = await feedbackModel
      .findOneAndUpdate({_id:req.query.id,receiverId:req.user},req.body, { new: true });;

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "No feedback found",
      });
    }

    res.status(200).json({
      success: true,
      message: "feedback updated successfully",
      Details: feedback,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Delete Feedback
const deleteFeedback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ reason: "User id not found" });
    }
    if(!req.query.id){
      return res.status(401).send({ reason: "Feedback id not found" });
    }
    const feedback = await feedbackModel
      .findOneAndDelete({_id:req.query.id,receiverId:req.user});

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "No feedback found",
      });
    }

    res.status(200).json({
      success: true,
      message: "feedback deleted successfully",
      Details: feedback,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};


module.exports = {
  send,
  getFeedbacks,
  getFeedback,
  updateFeedback,
  deleteFeedback
};
