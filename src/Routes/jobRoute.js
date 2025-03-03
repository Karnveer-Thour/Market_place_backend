const express=require('express');
const jobControllers = require('../Controllers/job.Controllers');
const { jobsMiddlewares } = require('../Middleware/Index');
const router=express.Router();

// Create job route
router.route('/create').post(jobsMiddlewares.validateJob,jobControllers.create);

// Get all jobs by particular user id
router.route('/get/all').get(jobControllers.getJobs);

//get particular job by its id
router.route('/get').get(jobControllers.get)

// Update a particular job
router.route('/update').patch(jobControllers.update)

// Update a particular job
router.route('/delete').delete(jobControllers.remove)


module.exports=router;