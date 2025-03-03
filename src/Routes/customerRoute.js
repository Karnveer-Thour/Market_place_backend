const express=require('express');
const router=express.Router();
const { customerControllers } = require('../Controllers/Index');
const { customerMiddlewares, fetchUser } = require('../Middleware/Index');

// Register route for customer
router.route("/register").post(customerMiddlewares.validateRegister,customerMiddlewares.existing,customerControllers.register);

// Login route for customer
router.route("/login").post(customerMiddlewares.validateLogin,customerControllers.login);

// Getuser route for customer
router.route("/get").post(fetchUser,customerControllers.get);

//Deleteuser route for customer
router.route("/delete").post(fetchUser,customerControllers.remove);

module.exports=router;