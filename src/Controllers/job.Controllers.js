const { jobModel } = require("../Models");

// Create job controller
const create = async (req, res) => {
  try {
    const Job = await jobModel.insertOne({...req.body,Recruiter_id:req.user});
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      Details: Job,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Get created jobs of same user
const getJobs = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send({ reason: "User id not found" });
    }
    const jobs = await jobModel.find({ Recruiter_id: req.user });
    if (jobs.length === 0) {
      return res.status(404).send({ reason: "No jobs found" });
    }
    res.status(200).json({
      success: true,
      message: "All jobs found successfully",
      Details: jobs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Get job by particular id
const get = async (req, res) => {
  try {
    if (!req.header("id")) {
      return res.status(401).send({ reason: "id not found" });
    }
    const job = await jobModel.findOne({ _id: req.header("id"),Recruiter_id:req.user });
    if (!job) {
      return res.status(404).send({ reason: "No job found" });
    }
    res.status(200).json({
      success: true,
      message: "job found successfully",
      Details: job,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Update a particular job
const update = async (req, res) => {
  try {
    if (!req.header("id")) {
      return res.status(401).send({ reason: "id not found" });
    }
    const job = await jobModel.findOneAndUpdate(
      { _id: req.header("id"),Recruiter_id:req.user },
      req.body,
      { new: true }
    );
    if (!job) {
      return res.status(404).send({ reason: "No job found" });
    }
    res.status(200).json({
      success: true,
      message: "job updated successfully",
      Details: job,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

//Delete a particular job
const remove = async (req, res) => {
  try {
    if (!req.header("id")) {
      return res.status(401).send({ reason: "id not found" });
    }
    const job = await jobModel.findOneAndDelete({ _id: req.header("id"),Recruiter_id:req.user });
    if (!job) {
      return res.status(404).send({ reason: "No job found" });
    }
    res.status(200).json({
      success: true,
      message: "job Deleted successfully",
      Details: job,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
module.exports = {
  create,
  getJobs,
  get,
  update,
  remove,
};
