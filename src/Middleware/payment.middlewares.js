const { body, validationResult } = require("express-validator");
const validatePayment = [
  body("amount", "Price can,t be empty and not be less than 100")
    .notEmpty()
    .isInt({ min: 100 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validatePayment,
};
