const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name: {
      type: String,
      minLength: [5, "Name must be at least 5 characters long"],
      required: true,
    },
    Email: {
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
    Manual_Login: {
        type:Boolean,
        required:true
    },
    date_register: {
      type: Date,
      default: Date.now(),
    },
    rating: {
      type: Number,
      default: 0,
    }
});

module.exports= mongoose.model('Customers',schema);