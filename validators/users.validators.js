const { checkExact, body } = require("express-validator");

const userRegisterValidation = checkExact([
  body("email").notEmpty().isEmail().withMessage("Enter valid email"),
  body("password")
    .notEmpty()
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role").notEmpty().withMessage("Enter valid user role"),
]);

module.exports = { userRegisterValidation };
