const { adminModel } = require("../Models");
const { body, validationResult } = require("express-validator");
// check Admin email duplicacy at Registration
const existing = async (req, res, next) => {
  const email = new RegExp(req.body.email, "i");
  // Check whether the user with this email already exists
  const existingUser = await adminModel.findOne({ email: email });
  if (existingUser) {
    // If the user exists, send an error response
    return res.status(401).json({ message: "Email is already registered." });
  }
  next();
};

const validateRegister = [
  body("first_name", "Name cannot be empty").notEmpty(),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be of minimum 8 Characters").isLength({
    min: 8,
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports={
    existing,validateRegister
}