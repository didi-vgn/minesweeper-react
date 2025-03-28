const db = require("../config/database");
const { PrismaClientKnownRequestError } = require("@prisma/client");
const { prismaErrorHandler } = require("../errors/prismaErrorHandler");

exports.createGame = async (req, res, next) => {
  const userId = req.user?.id || null;
  const { mode, time, bbbv, points, board } = req.body;
  try {
    await db.createGame(userId, mode, time, bbbv, points, board);
    return res
      .status(201)
      .json({ message: "Game stats added to leaderboards." });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.findManyGames = async (req, res, next) => {
  const { gameMode, nickname, sort, order } = req.query;
  try {
    const games = await db.findManyGames(gameMode, nickname, sort, order);
    return res.status(200).json({ games });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.deleteAllGames = async (req, res, next) => {
  try {
    await db.deleteAllGames();
    return res.status(200).json({ message: "All games deleted." });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.upsertAdventureGame = async (req, res, next) => {
  const userId = req.user.id;
  const { levelId, collectedGems, points } = req.body;
  try {
    await db.upsertAdventureGame(userId, levelId, collectedGems, points);
    return res.status(201).json({ message: "Game data created/updated." });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.findManyAdventureGames = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const games = await db.findManyAdventureGames(userId);
    return res.status(200).json({ games });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.minesweeperStats = async (req, res, next) => {
  try {
    const stats = await db.findMinesweeperStats();
    return res.status(200).json({ stats });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};
