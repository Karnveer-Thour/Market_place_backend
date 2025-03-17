const mongoose=require('mongoose');

const schema= mongoose.Schema({
    first_name: {
        type: String,
        minLength: [5, "Name must be at least 5 characters long"],
        required: true,
      },
    last_name:{
        type: String,
        default: undefined
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
      phone:{
        type: Number,
        maxLength: [10, "Mobile Number will not be greater than 10 digits"],
        default: undefined
      },
      date_birth:{
        type: String,
        default: undefined
      },
      role:{
        type:String,
        default: "Admin"
      },
      country:{
        type: String,
        default: undefined
      },
      city:{
        type: String,
        default: undefined
      },
      postal_code:{
        type: Number,
        default: undefined
      }
});

module.exports= mongoose.model('Admin',schema);