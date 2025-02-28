const express=require('express');
const { chatModel } = require('../Models');

const router = express.Router({ mergeParams: true })
router.get('/send',async(req,res)=>{
    const newChat=await chatModel.insertOne({
        senderId:"67c184b4b2897dabcc486f6f",
        recieverId:"67c185310a256b69edcb27b1",
        description:"Hello",
        status:"recieved"
    })
    res.send(newChat);
})
module.exports=router;