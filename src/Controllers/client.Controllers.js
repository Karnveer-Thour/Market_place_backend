const { customerModel } = require("../Models")
const bcrypt = require('bcrypt');
const secret=process.env.Secret

// Register a client
const registerClient=async(req,res)=>{
    try{
        const hashPassword=await bcrypt.hash(req.body.password+secret,10);
        const newUser=await customerModel.insertOne({...req.body,password:hashPassword});
        res.status(201).json({
            success: true,
            message: "Customer registered successfully",
            data: newUser
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message
        });
    }
}

module.exports={
    registerClient:registerClient,
}