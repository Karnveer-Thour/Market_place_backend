const express = require("express");
const jobControllers = require("../Controllers/job.Controllers");
const { jobsMiddlewares, fetchUser } = require("../Middleware/Index");
const router = express.Router();

// Create job route
router
  .route("/create")
  .post(fetchUser,jobsMiddlewares.validateJob,jobControllers.create);

// Get all jobs by particular user id
router.route("/get/all").get(fetchUser,jobControllers.getJobs);

//get particular job by its id
router.route("/get").get(fetchUser,jobControllers.get);

// Update a particular job
router.route("/update").patch(fetchUser,jobControllers.update);

// Update a particular job
router.route("/delete").delete(fetchUser,jobControllers.remove);

module.exports = router;
