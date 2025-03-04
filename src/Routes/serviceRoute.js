const express = require("express");
const { serviceMiddlewares, fetchUser } = require("../Middleware/Index");
const { serviceControllers } = require("../Controllers/Index");
const router = express.Router();

// Route for create service
router
  .route("/create")
  .post(fetchUser,serviceMiddlewares.validateJob,serviceControllers.create);

// Get all Services by particular user id
router.route("/get/all").get(fetchUser,serviceControllers.getServices);

//get particular Service by its id
router.route("/get").get(fetchUser,serviceControllers.get);

// Update a particular Service
router.route("/update").patch(fetchUser,serviceControllers.update);

// Update a particular Service
router.route("/delete").delete(fetchUser,serviceControllers.remove);


module.exports = router;
