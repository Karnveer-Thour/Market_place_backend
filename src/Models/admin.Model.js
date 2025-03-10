const mongoose=require('mongoose');

const schema= mongoose.Schema({
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
});

module.exports= mongoose.model('Admin',schema);