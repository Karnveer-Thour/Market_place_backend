const express=require('express');
const { providerModel } = require('../Models');
const router = express.Router({ mergeParams: true })
router.get("/Create",async(req,res)=>{
     try{
            const registered_Email=await providerModel.findOne({Email:"karan34456@gmail.com"});
            if(registered_Email){
                res.status(400).json("Email already registered");
                return;
            }
            const User=await providerModel.insertOne({
                name:"Karanveer",
                Email:"karan34456@gmail.com",
                password:"fdjkdfhdfh",
                Manual_Login:true,
                Category:"Programmer"
            });
            res.send(User);
        }catch(err){
            res.status(500).json("Unable to create a user due to ",err.message);
        }
})
module.exports=router;