const express=require('express');
const router=express.Router();
const { clientControllers } = require('../Controllers/Index');

router.route("/register").post(clientControllers.registerClient);

module.exports=router;