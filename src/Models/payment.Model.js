const { default: mongoose } = require("mongoose");

const schema=new mongoose.Schema({
    payerId:{
        type: mongoose.Schema.ObjectId,
        ref:"Customers",
        required:true
    },
    recieverId:{
        type: mongoose.Schema.ObjectId,
        ref: "providers",
        required: true
    },
    amount:{
        type:Number,
        default:0,
        required:true
    },
    description:String,
    status:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});

module.exports=mongoose.model('Payments',schema);