const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../config/database");
const { generateAccessToken } = require("../utils/jwt");

exports.findManyUsers = async (req, res) => {
  try {
    const users = await db.findManyUsers();
    if (users.length === 0) {
      return res.status(200).json({ message: "No users found.", users: [] });
    }
    return res.status(200).json({ users });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.updateNickname = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ error: "Failed to change nickname." });
  }
  const { nickname } = req.body;
  const { userId } = req.params;
  if (req.user.role !== "ADMIN" && req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden." });
  }
  try {
    const nicknameAlreadyExists = await db.findUserBy("nickname", nickname);
    if (nicknameAlreadyExists) {
      return res
        .status(400)
        .json({ errors: [{ error: "Nickname already exists." }] });
    }

    const user = await db.findUserBy("id", userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const updatedUser = await db.updateNickname(userId, nickname);
    const newAccessToken =
      user.id === userId
        ? generateAccessToken({
            id: user.id,
            username: user.username,
            nickname: nickname,
            role: user.role,
          })
        : null;

    return res.status(200).json({
      message: "Nickname updated!",
      user: updatedUser,
      token: newAccessToken,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};
exports.updatePassword = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ error: "Failed to change password." });
  }
  const { password } = req.body;
  const { userId } = req.params;
  if (req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden." });
  }
  try {
    const user = await db.findUserBy("id", userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.updatePassword(userId, hashedPassword);
    return res.status(200).json({ message: "Password updated!" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.updateRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    await db.updateRole(userId, role);
    return res.status(200).json({ message: `Role changed to ${role}.` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  if (req.user.role !== "ADMIN" && req.user.id !== userId) {
    return res.status(403).json({ error: "Forbidden." });
  }
  try {
    const user = await db.findUserBy("id", userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    await db.deleteUser(userId);
    return res.status(200).json({ message: "User and related data deleted." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};
