const { body, validationResult } = require("express-validator");

const validateChat = [
  body("senderType", "Sender Type is required").isIn([
    "Customers",
    "Providers",
  ]),
  body("receiverType", "Receiver Type is required").isIn([
    "Customers",
    "Providers",
  ]),
  body("message", "Description is required").notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateChat,
};
