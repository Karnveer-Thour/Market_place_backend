const express=require('express');
const { providerMiddlewares, fetchUser, customerMiddlewares } = require('../Middleware/Index');
const { providerControllers, customerControllers } = require('../Controllers/Index');
const router = express.Router({ mergeParams: true })
// Register route for provider
router.route('/register').post(customerMiddlewares.validateRegister,providerMiddlewares.existing,providerControllers.register);

// Login route for provider
router.route('/login').post(customerMiddlewares.validateLogin,providerControllers.login);

//Get route for provider
router.route('/get').post(fetchUser,providerControllers.get);

//Delete route for Provider
router.route('/delete').delete(fetchUser,providerControllers.remove);

module.exports=router;