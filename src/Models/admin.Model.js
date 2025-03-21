const mongoose = require("mongoose");

const schema = mongoose.Schema({
  first_name: {
    type: String,
    minLength: [5, "Name must be at least 5 characters long."],
    required: [true, "First name is required."],
  },
  last_name: {
    type: String,
    default:""
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    sparse: true, // Add sparse index if email is optional
  },
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters long."],
    required: [true, "Password is required."],
  },
  phone: {
    type: Number,
    max: [9999999999, "Mobile Number cannot be greater than 10 digits."],
    min: [1000000000, "Mobile Number cannot be less than 10 digits."],
  },
  date_birth: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Admin", "User"], // Add enum for valid roles
    default: "Admin",
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  postal_code: {
    type: Number,
  },
  imageURL: {
    type: String,
    default: "https://res.cloudinary.com/dszgssbnh/image/upload/v1742277062/Marketplace/qonrl45r3a5jmnpl12dv.jpg",
    validate: {
      validator: function (v) {
        // Simple URL validation
        return /^https?:\/\/\S+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
});

module.exports = mongoose.model("Admin", schema);