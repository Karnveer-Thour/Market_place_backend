require('dotenv').config();
const express=require('express');
const mongoose=require('./src/Database/mongoose.database.js');
const {  customerRoute, providerRoute, serviceRoute, jobRoute } = require('./src/Routes/index.js');
const { Mongoose } = require('./src/Database/index.js');
const app=express();
const port=process.env.port;
const URL=process.env.URL;

app.use('/client',customerRoute);
app.use('/seller',providerRoute);
app.use('/job',jobRoute);
app.use('/service',serviceRoute);

app.listen(port,()=>{
    console.log("App is listening at",port);
    Mongoose(URL);
})