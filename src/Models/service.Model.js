const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
  Service_provider_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Providers",
    required: true,
  },
  Service_title: {
    type: String,
    minLength: [5, "Title minimum have 5 characters"],
    required: true,
  },
  Service_type: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Service_description: {
    type: String,
    minLength: [30, "Description must be at least 30 characters long"],
    required: true,
  },
  Keywords: {
    type: Array,
    minLength: [1, "Must have one keyword"],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Services", schema);
