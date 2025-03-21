const express=require('express');
const { adminMiddlewares, fetchUser, customerMiddlewares } = require('../Middleware/Index');
const { adminControllers } = require('../Controllers/Index');
const router=express.Router();

//Route to register admin

router.route("/register").post(adminMiddlewares.validateRegister,adminMiddlewares.existing,adminControllers.register);

//Route to login admin

router.route("/login").post(customerMiddlewares.validateLogin,adminControllers.login);

//Route to get admin

router.route("/get").post(fetchUser,adminControllers.get);

//update route for customer

router.route("/update").patch(fetchUser, adminControllers.update);


//Delete route for Admin

router.route("/delete").delete(fetchUser, adminControllers.remove);

module.exports=router;