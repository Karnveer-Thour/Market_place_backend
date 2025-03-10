const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [5, "Name must be at least 5 characters long"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: [8, "Password must be at least 8 characters long"],
      required: true,
    },
    picture: String,
    Customer_ID: String,
    manual_Login: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "Providers",
    },
    category: {
      type: Array,
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    availability: {
      type: String,
      default: "Active",
    },
    date_Register: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Providers", schema);
