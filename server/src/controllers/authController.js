const db = require("../config/database");
const bcrypt = require("bcryptjs");
const validateUser = require("../utils/validation");
const { validationResult } = require("express-validator");
const { generateJwt } = require("../utils/jwt");

exports.signup = [
  validateUser,
  async (req, res) => {
    try {
      const { username, nickname, password } = req.body;
      let errors = [];

      const usernameAlreadyExists = await db.findUserBy("username", username);
      const nicknameAlreadyExists = await db.findUserBy("nickname", nickname);

      if (usernameAlreadyExists) {
        errors.push({ error: "Username already exists." });
      }
      if (nicknameAlreadyExists) {
        errors.push({ error: "Nickname already exists." });
      }

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const validationErrors = validationResult(req);
      ////dev
      if (!validationErrors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "Validation errors", details: errors.array() });
      }
      /////prod
      // if (!validationErrors.isEmpty()) {
      //   return res.status(400).json({ error: "Failed to sign up." });
      // }

      const hashedPassword = await bcrypt.hash(password, 10);
      await db.createUser(username, hashedPassword, nickname);
      return res.status(201).json({ message: "Sign up successful." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to sign up." });
    }
  },
];

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.findUserBy("username", username);
    if (!user) {
      return res.status(401).json({ error: "Incorrect username." });
    }

    const matchPassword = await bcrypt.compare(
      password,
      user.password.password
    );
    if (!matchPassword) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const accessToken = generateJwt({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    return res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to log in." });
  }
};
