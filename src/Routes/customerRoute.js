const express=require('express');
const { customerModel } = require('../Models');

const router = express.Router({ mergeParams: true })
router.get('/Create',async(req,res)=>{
    try{
        const registered_Email=await customerModel.findOne({Email:"karan34456@gmail.com"});
        if(registered_Email){
            res.status(500).json("Email already registered");
            return;
        }
        const User=await customerModel.insertOne({
            name:"Karanveer",
            Email:"karan34456@gmail.com",
            password:"fdjkdfhdfh",
            Manual_Login:true
        });
        res.send(User);
    }catch(err){
        res.status(500).json("Unable to create a user due to ",err.message);
    }
})
module.exports=router;