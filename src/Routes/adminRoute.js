const express=require('express');
const { adminMiddlewares, fetchUser } = require('../Middleware/Index');
const { adminControllers } = require('../Controllers/Index');
const router=express.Router();

//Route to register admin

router.route("/register").post(adminMiddlewares.validateRegister,adminMiddlewares.existing,adminControllers.register);

//Route to login admin

router.route("/login").post(adminMiddlewares.validateLogin,adminControllers.login);

//Route to get admin

router.route("/get").get(fetchUser,adminControllers.get);


module.exports=router;