const db = require("../config/database");
const bcrypt = require("bcryptjs");
const validateUser = require("../utils/validation");
const { validationResult } = require("express-validator");

exports.signup = [
  validateUser,
  async (req, res) => {
    try {
      const { username, nickname, password } = req.body;

      const usernameAlreadyExists = await db.findUserBy("username", username);
      if (usernameAlreadyExists) {
        return res
          .status(400)
          .json({ error: "Username already exists.", field: "username" });
      }

      const nicknameAlreadyExists = await db.findUserBy("nickname", nickname);
      if (nicknameAlreadyExists) {
        return res
          .status(400)
          .json({ error: "Nickname already exists.", field: "nickname" });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "Validation errors", details: errors.array() });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.createUser(username, hashedPassword, nickname);

      return res.status(201).json({ message: "Sign up successful." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create user." });
    }
  },
];
