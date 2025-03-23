const db = require("../config/database");
const { PrismaClientKnownRequestError } = require("@prisma/client");
const { prismaErrorHandler } = require("../errors/prismaErrorHandler");

exports.createAchievement = async (req, res, next) => {
  const { id, title, description } = req.body;
  try {
    await db.createAchievement(id, title, description);
    return res.status(201).json({ message: "New achievement added." });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.findManyAchievements = async (req, res, next) => {
  try {
    const achievements = await db.findManyAchievements();
    return res.status(200).json({ achievements });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.deleteAchievement = async (req, res, next) => {
  const { id } = req.params;
  try {
    await db.deleteAchievement(id);
    return res.status(200).json({ message: `Achievement ${id} deleted.` });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.upsertStatsAndUnlockAchievements = async (req, res, next) => {
  const userId = req.user.id;
  const { totalGems, bombsScanned, characterUsed, levelsCompleted, deaths } =
    req.body;

  try {
    const newAchievements = await db.upsertStats(
      userId,
      totalGems,
      bombsScanned,
      characterUsed,
      levelsCompleted,
      deaths
    );
    return res.status(200).json({ newAchievements });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};

exports.findAchievementsByUserId = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const achievements = await db.findAchievementsByUserId(userId);
    return res.status(200).json({ achievements });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      return next(prismaErrorHandler(err));
    }
    next(err);
  }
};
