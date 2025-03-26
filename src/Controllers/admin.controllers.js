const {
  adminModel,
  customerModel,
  providerModel,
  serviceModel,
  jobModel,
} = require("../Models");
const bcrypt = require("bcrypt");
const secret = process.env.Secret;
const jwt = require("jsonwebtoken");

// Register a Admin
const register = async (req, res) => {
  try {
    console.log(req.body);
    const hashPassword = await bcrypt.hash(req.body.password + secret, 10);
    const newUser = await adminModel.insertOne({
      ...req.body,
      password: hashPassword,
    });
    const token = jwt.sign({ user: newUser.id }, secret);
    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Login a Admin
const login = async (req, res) => {
  try {
    // Find the user by email
    const email = RegExp(req.body.email, "i");
    const user = await adminModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ reason: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      req.body.password + secret,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ reason: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ user: user._id }, secret);

    // Send a success response with the token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (err) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Get Admin
const get = async (req, res) => {
  try {
    const user = await adminModel.findById(req.userID).select("-password");
    if (!user) {
      return res.status(401).send({ Reason: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      user: user,
    });
  } catch (error) {
    res.status(401).send({ reason: "Internal Server Error" });
  }
};

// Update Admin

const update = async (req, res) => {
  const userId = await adminModel.findOne({ _id: req.userID });
  if (!userId) {
    return res.status(401).send({ Reason: "User not found" });
  }
  try {
    const user = await adminModel
      .findOneAndUpdate({ _id: userId }, req.body, { new: true })
      .select("-password");
    res.status(201).json({
      success: true,
      message: "Customer updated successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Delete Admin

const remove = async (req, res) => {
  const userId = await adminModel.findOne({ _id: req.userID });
  if (!userId) {
    return res.status(401).send({ Reason: "User not found" });
  }
  try {
    const user = await adminModel.findOneAndDelete({ _id: userId });
    res.status(201).json({
      success: true,
      message: "Customer deleted successfully",
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Change password for admin
const updatePassword = async (req, res) => {
  try {
    const user = await adminModel.findById(req.userID);
    const isPasswordValid = await bcrypt.compare(
      req.body.password + secret,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({ Reason: "invalid password" });
    }
    if (!req.body.newPassword) {
      return res.status(401).send({ Reason: "New password can't be empty" });
    }
    const samePassword = await bcrypt.compare(
      req.body.newPassword + secret,
      user.password
    );
    const newPassword = await bcrypt.hash(req.body.newPassword + secret, 10);
    if (samePassword) {
      return res.status(401).send({ Reason: "New password can't be same" });
    }
    await adminModel.findOneAndUpdate(
      { _id: user },
      { password: newPassword },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(401).send({ Reason: "Internal Server Error" });
  }
};

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const Customers = await customerModel.find();
    res.status(200).json({
      success: true,
      message: "Customers Fetched successfully",
      Customers,
    });
  } catch {
    res.status(401).send({ Reason: "Internal Server Error" });
  }
};

// Get all providers
const getProviders = async (req, res) => {
  try {
    const Providers = await providerModel.find();
    res.status(200).json({
      success: true,
      message: "Providers Fetched successfully",
      Providers,
    });
  } catch {
    res.status(401).send({ Reason: "Internal Server Error" });
  }
};

//Get all Services
const getServices = async (req, res) => {
  try {
    const Services = await serviceModel.find();
    res.status(200).json({
      success: true,
      message: "Services Fetched successfully",
      Services,
    });
  } catch {
    res.status(401).send({ Reason: "Internal Server Error" });
  }
};

//Get all Jobs
const getJobs = async (req, res) => {
  try {
    const Jobs = await jobModel.find();
    res.status(200).json({
      success: true,
      message: "Jobs Fetched successfully",
      Jobs,
    });
  } catch {
    res.status(401).send({ Reason: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  get,
  update,
  remove,
  updatePassword,
  getCustomers,
  getProviders,
  getServices,
  getJobs,
};
