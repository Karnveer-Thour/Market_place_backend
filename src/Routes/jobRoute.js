const express=require('express');
const router=express.Router();
const { jobModel } = require('../Models');
router.get('/Create',async(req,res)=>{
    try{
        const newJob=await jobModel.insertOne({
            Recruiter_id:"67c01823250b60f02305f88f",
            Job_title:"jdksljldkjkldsjkdsjds",
            Budget:3000,
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