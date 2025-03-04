const { body, validationResult } = require("express-validator");
const validateJob = [
  body("Service_title", "Service title can't be empty and not contain numbers")
    .notEmpty()
    .custom((value) => {
      // Check if the title contains any numbers
      if (/\d/.test(value)) {
        throw new Error("Title must not contain numbers");
      }
      if(!/^[A-Za-z0-9_ ]+$/.test(value)){
        throw new Error("Title must not contain special characters except underscore");
      }
      return true; // Validation passed
    }),
  body("Price", "Price can,t be empty and not be less than 100")
    .notEmpty()
    .isInt({ min: 100 }),
  body("Service_type", "type of service can't be empty").notEmpty(),
  body("Service_description", "Description Minimum have 30 characters").isLength({ min: 30 }),
  body("Keywords", "Keywords requires atleast one").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateJob,
};
