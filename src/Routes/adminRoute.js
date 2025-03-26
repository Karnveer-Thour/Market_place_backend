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

//Change password route for admin

router.route("/update/password").put(fetchUser,adminControllers.updatePassword);

//Fetch Customers route for admin

router.route("/get/Customers").get(fetchUser,adminControllers.getCustomers);

//Fetch Providers route for admin

router.route("/get/Providers").get(fetchUser,adminControllers.getProviders);

//Fetch Services route for admin

router.route("/get/Services").get(fetchUser,adminControllers.getServices);

//Fetch Jobs route for admin

router.route("/get/Jobs").get(fetchUser,adminControllers.getJobs);

module.exports=router;