const bcrypt = require("bcryptjs");
const db = require("../config/database");
const AppError = require("../errors/AppError");
const { validationResult } = require("express-validator");
const { generateAccessToken } = require("../utils/jwt");
const { PrismaClientKnownRequestError } = require("@prisma/client");
const { prismaErrorHandler } = require("../errors/prismaErrorHandler");

exports.findManyUsers = async (req, res, next) => {
  try {
    const users = await db.findManyUsers();
    return res.status(200).json({ users });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.updateNickname = async (req, res, next) => {
  const { nickname } = req.body;
  const { userId } = req.params;
  if (req.user.role !== "ADMIN" && req.user.id !== userId) {
    return next(
      new AppError(
        "You are not authorized to make this request.",
        "FORBIDDEN",
        403
      )
    );
  }
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      new AppError("Failed to change nickname.", "VALIDATION_ERRORS", 400)
    );
  }
  try {
    const updatedUser = await db.updateNickname(userId, nickname);
    const newAccessToken =
      req.user.id === userId
        ? generateAccessToken({
            id: req.user.id,
            username: req.user.username,
            nickname: nickname,
            role: req.user.role,
          })
        : null;

    return res.status(200).json({
      message: "Nickname updated!",
      user: updatedUser,
      token: newAccessToken,
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  const { password } = req.body;
  const { userId } = req.params;
  if (req.user.id !== userId) {
    return next(
      new AppError(
        "You are not authorized to make this request.",
        "FORBIDDEN",
        403
      )
    );
  }
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      new AppError("Failed to change password.", "VALIDATION_ERRORS", 400)
    );
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.updatePassword(userId, hashedPassword);
    return res.status(200).json({ message: "Password updated!" });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.updateRole = async (req, res, next) => {
  const { userId } = req.params;
  const { role } = req.body;
  try {
    await db.updateRole(userId, role);
    return res.status(200).json({ message: `Role changed to ${role}.` });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;
  if (req.user.role !== "ADMIN" && req.user.id !== userId) {
    return next(
      new AppError(
        "You are not authorized to make this request.",
        "FORBIDDEN",
        403
      )
    );
  }
  try {
    await db.deleteUser(userId);
    return res.status(200).json({ message: "User and related data deleted." });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};
