const { customerModel } = require("../Models");
const bcrypt = require("bcrypt");
const secret = process.env.Secret;
const jwt = require("jsonwebtoken");

// Register a Customer
const register = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password + secret, 10);
    const newUser = await customerModel.insertOne({
      ...req.body,
      password: hashPassword,
    });
    const token = jwt.sign({ user: newUser.id }, secret);
    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Login a Customer
const login = async (req, res) => {
  try {
    // Find the user by email
    const user = await customerModel.findOne({ Email: req.body.Email });
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

// Get customer
const get = async (req, res) => {
  try {
    const user = await customerModel.findById(req.userID).select("-password");
    if (!user) {
      return res.status(401).send({ Reason: "User not found" });
    }
    res.status(201).json({
      success: true,
      message: "Customer fetched successfully",
      user: user,
    });
  } catch (error) {
    res.status(401).send({ reason: "Internal Server Error" });
  }
};

// Delete Customer

const remove = async (req, res) => {
  const user = await customerModel.findOne({ _id: req.userID });
  if (!user) {
    return res.status(401).send({ Reason: "User not found" });
  }
  try {
    const user = await customerModel.findOneAndDelete({ _id: userId });
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
module.exports = {
  register,
  login,
  get,
  remove,
};
