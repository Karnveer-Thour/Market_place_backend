const { providerModel } = require("../Models");

const existing = async (req, res, next) => {
  const email = new RegExp(req.body.email, "i");
  // Check whether the user with this email already exists
  const existingUser = await providerModel.findOne({ email: email });

  if (existingUser) {
    // If the user exists, send an error response
    return res.status(401).json({ message: "email is already registered." });
  }
  next();
};

module.exports = {
  existing,
};
