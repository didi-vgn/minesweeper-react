const db = require("../config/database");
const bcrypt = require("bcryptjs");
const AppError = require("../errors/AppError");
const { validationResult } = require("express-validator");
const { generateAccessToken } = require("../utils/jwt");
const { PrismaClientKnownRequestError } = require("@prisma/client");
const { prismaErrorHandler } = require("../errors/prismaErrorHandler");

exports.signup = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(new AppError("Failed to sign up.", "VALIDATION_ERROR", 400));
  }
  try {
    const { username, nickname, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(username, hashedPassword, nickname);
    return res.status(201).json({ message: "Sign up successful." });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await db.findUserBy("username", username);
    if (!user || !(await bcrypt.compare(password, user.password.password))) {
      return next(
        new AppError("Incorrect username or password.", "AUTH_FAILED", 401)
      );
    }

    const accessToken = generateAccessToken({
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      role: user.role,
    });
    return res.status(200).json(accessToken);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};
