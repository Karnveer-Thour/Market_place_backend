require('dotenv').config();
const express=require('express');
const mongoose=require('./Database/Mongoose.js');
const app=express();
const port=process.env.port;
const URL=process.env.URL;
app.get('/',(req,res)=>{
    res.send("Hello");
})
app.use('/User',require('./Routes/User.js'));
app.listen(port,()=>{
    console.log("App is listening at",port);
    mongoose(URL);
})