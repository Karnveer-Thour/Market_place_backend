const express = require("express");
const { paymentModel } = require("../Models");
const { paymentControllers } = require("../Controllers/Index");
const { fetchUser, paymentMiddlewares } = require("../Middleware/Index");

const router = express.Router({ mergeParams: true });

// Route to send payment
router.route('/send').post(fetchUser,paymentMiddlewares.validatePayment,paymentControllers.sendPayment);

// Route to get all payments
router.route('/').get(fetchUser,paymentControllers.getAllPayments);

// Route to get a particulaer payment
router.route('/get').get(fetchUser,paymentControllers.getPayment);

module.exports = router;
