const { default: mongoose } = require("mongoose");

const schema=new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    recieverId:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    status:{
        type: String,
        required: true
    }
},{
    timestamps:true
})
module.export=mongoose.model('Chat',schema);