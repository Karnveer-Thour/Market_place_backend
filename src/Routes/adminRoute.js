const express=require('express');
const { adminMiddlewares, fetchUser, customerMiddlewares } = require('../Middleware/Index');
const { adminControllers } = require('../Controllers/Index');
const router=express.Router();

//Route to register admin

router.route("/register").post(customerMiddlewares.validateRegister,adminMiddlewares.existing,adminControllers.register);

//Route to login admin

router.route("/login").post(customerMiddlewares.validateLogin,adminControllers.login);

//Route to get admin

router.route("/get").post(fetchUser,adminControllers.get);


module.exports=router;