const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: "senderType", // Dynamically reference based on senderType
    },
    senderType: {
      type: String,
      required: true,
      enum: ["Customers", "Providers"], // Specify allowed collections
    },
    receiverId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: "receiverType", // Dynamically reference based on receiverType
    },
    receiverType: {
      type: String,
      required: true,
      enum: ["Customers", "Providers"], // Specify allowed collections
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unread",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Chats", schema);
