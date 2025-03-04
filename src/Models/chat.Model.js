const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.ObjectId,
      ref: "providers",
      ref: "customers",
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.ObjectId,
      ref: "providers",
      ref: "customers",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Chats", schema);
