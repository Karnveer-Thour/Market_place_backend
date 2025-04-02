const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    Recruiter_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Customers",
      required: true,
    },
    Job_title: {
      type: String,
      minLength: [5, "title must be at least 5 characters long"],
      required: true,
    },
    Budget: {
      type: Number,
      required: true,
    },
    Service_type: {
      type: String,
      required: true,
    },
    Job_description: {
      type: String,
      minLength: [30, "Description must be at least 30 characters long"],
      required: true,
    },
    Keywords: {
      type: Array,
      minLength: [1, "Must have one keyword"],
      required: true,
    },
    status: {
      type: String,
      enum:["Pending","Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Jobs", schema);
