const express=require('express');
const { serviceModel } = require('../Models');
const router=express.Router();
router.get('/Create',async(req,res)=>{
    try{
        const newJob=await serviceModel.insertOne({
            Service_provider_id:"67c01dbd040d32448b890e53",
            Service_title:"jdksljldkjkldsjkdsjds",
            Price:3000,
            Service_type:"programmer",
            Job_description:"hfjkhfkhkfdhjhdkjhkjfdhfhkjhkh",
            Keywords:["dkjlkajlkdjkaljd"],
        });
        res.send(newJob);
    }catch(err){
        res.status(500).json("Internal server error ",err.message);
    }
})
module.exports=router;