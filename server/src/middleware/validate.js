const { body } = require("express-validator");

exports.validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required.")
    .isAlphanumeric()
    .withMessage("Usernames must only contain letters and numbers.")
    .isLength({ min: 3, max: 16 })
    .withMessage("Usernames must contain between 3 and 16 characters."),
  body("nickname")
    .trim()
    .notEmpty()
    .withMessage("Nickname is required.")
    .isAlphanumeric()
    .withMessage("Nicknames must only contain letters and numbers.")
    .isLength({ min: 3, max: 16 })
    .withMessage("Nicknames must contain between 3 and 16 characters."),
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Passwords must have at least 8 characters."),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage("Please confirm password.")
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage("Passwords don't match."),
  ],
];
