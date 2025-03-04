const { body, validationResult } = require("express-validator");

const validateFeedback = [
    body("senderType", "Sender Type is required").isIn(["Customers", "Providers"]),
    body("receiverType", "Receiver Type is required").isIn(["Customers", "Providers"]),
    body(
    "description",
    "Description is required minimum of 10 characters"
  ).isLength({ min: 10 }),
  body("rating", "Rating is required").isInt({ min: 1, max: 5 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateFeedback,
};
