const { paymentModel } = require("../Models");
// Route to send payment
const sendPayment=async(req,res)=>{
    try{
        if(!req.user){
            return res.status(401).send({reason:"User id not found"});
        }
        if(!req.header("id")){
            return res.status(401).send({reason:"id not found"});
        }
        const Payment=await paymentModel.insertOne({
            ...req.body,
            payerId:req.user,
            recieverId:req.header("id")
        });
        res.status(201).json({
            success:true,
            message:"Payment sent successfully",
            Details:Payment,
        });
    }catch(err){   
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
          });
    }
}

// route to fetch all payments
const getAllPayments=async(req,res)=>{
    try{
        if(!req.user){
            return res.status(401).send({reason:"User id not found"});
        }
        if(!req.header("id")){
            return res.status(401).send({reason:"id not found"});
        }
        const Payments=await paymentModel.find({
            payerId:req.user,recieverId:req.header("id")
        });
        if(Payments.length===0){
            return res.status(404).json({
                success:false,
                message:"No payments found",
            });
        }
        res.status(200).json({
            success:true,
            message:"All payments",
            Details:Payments,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
          });
    }
}

//route to fetch a particular payments
const getPayment=async(req,res)=>{
    try{
        if(!req.user){
            return res.status(401).send({reason:"User id not found"});
        }
        if(!req.header("id")){
            return res.status(401).send({reason:"id not found"});
        }
        const Payment=await paymentModel.findOne({
            _id:req.header("id"),
            payerId:req.user
        });
        if(!Payment){
            return res.status(404).json({
                success:false,
                message:"Payment not found",
            });
        }
        res.status(200).json({
            success:true,
            message:"Payment",
            Details:Payment,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err.message,
          });
    }
}

module.exports = {sendPayment,getAllPayments,getPayment};