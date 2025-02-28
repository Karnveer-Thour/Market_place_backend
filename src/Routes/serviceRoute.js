const express=require('express');
const { serviceModel } = require('../Models');
const router=express.Router();
router.get('/Create',async(req,res)=>{
        const newJob=await serviceModel.insertOne({
            Service_provider_id:"67c185310a256b69edcb27b1",
            Service_title:"jdksljldkjkldsjkdsjds",
            Price:3000,
            Service_type:"programmer",
            Service_description:"hfjkhfkhkfdhjhdkjhkjfdhfhkjhkh",
            Keywords:["dkjlkajlkdjkaljd"],
        });
        res.send(newJob);
})
module.exports=router;