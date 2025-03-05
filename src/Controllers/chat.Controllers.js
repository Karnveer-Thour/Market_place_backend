const { chatModel } = require("../Models");

//Route to send message
const Send = async (req, res) => {
  try {
    if (!req.header("id")) {
      return res.status(401).send({ Reason: "Reciever id not found" });
    }
    const data = await chatModel.insertOne({
      ...req.body,
      senderId: req.userID,
      receiverId: req.header("id"),
    });
    return res.status(201).json({
      success: true,
      message: "Message Sent successfully",
      Data: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Route to fetch messages
const Fetch = async (req, res) => {
  try {
    const sendedMessages = await chatModel.find({
      senderId: req.userID,
    }).populate("senderId").populate("receiverId");
    const recienvedMessages = await chatModel.find({
      recieverId: req.userID,
    }).populate("senderId").populate("receiverId");
    const Messages = [...sendedMessages, ...recienvedMessages];
    if (Messages.length === 0) {
      return res.status(404).send({ Reason: "Messages not found" });
    }
    res.status(200).json({
      success: true,
      message: "Messages fetched successfully",
      Data: Messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Controller to update message
const Update = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(401).send({ Reason: "Message id not found" });
    }
    const data = await chatModel.findOneAndUpdate(
      {
        _id: req.query.id,
      },
      {
        ...req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      Data: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Controller to delete message
const Delete = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(401).send({ Reason: "Message id not found" });
    }
    const data = await chatModel.findOneAndDelete({
      _id: req.query.id,
    });
    if (!data) {
      return res.status(404).send({ Reason: "Message not found" });
    }
    res.status(200).json({
      success: true,
      message: "Message Deleted successfully",
      Data: data,
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
  Send,
  Fetch,
  Update,
  Delete,
};
