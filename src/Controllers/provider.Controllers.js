const bcrypt = require("bcrypt");
const secret = process.env.Secret;
const jwt = require("jsonwebtoken");
const { providerModel } = require("../Models");

// Register a Customer
const register = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password + secret, 10);
    const newUser = await providerModel.insertOne({
      ...req.body,
      password: hashPassword,
    });
    const token = jwt.sign({ user: newUser.id }, secret);
    res.status(201).json({
      success: true,
      message: "Provider registered successfully",
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
    const user = await providerModel.findOne({ Email: req.body.Email });
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
    const user = await providerModel.findById(req.userID).select("-password");
    if (!user) {
      return res.status(401).send({ Reason: "User not found" });
    }
    res.status(201).json({
      success: true,
      message: "Provider fetched successfully",
      user: user,
    });
  } catch (error) {
    res.status(401).send({ reason: "Internal Server Error" });
  }
};

// Delete Customer

const remove = async (req, res) => {
  const user = await providerModel.findOne({ _id: req.userID });
  if (!user) {
    return res.status(401).send({ Reason: "User not found" });
  }
  try {
    const user = await providerModel.deleteOne({ _id: req.userID });
    res.status(201).json({
      success: true,
      message: "Provider deleted successfully",
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
