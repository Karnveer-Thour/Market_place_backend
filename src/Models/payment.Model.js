const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    payerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Customers",
      required: true,
    },
    recieverId: {
      type: mongoose.Schema.ObjectId,
      ref: "providers",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "Payment",
    },
    status: {
      type: String,
      default:"Success",
      enum: ["Success", "Failed"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payments", schema);
