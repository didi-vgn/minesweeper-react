const { PrismaClient } = require("@prisma/client");
const { ACHIEVEMENT_CONDITIONS } = require("./achievementConditions");
prisma = new PrismaClient();

exports.createUser = async (username, password, nickname) => {
  return await prisma.user.create({
    data: {
      username: username,
      nickname: nickname,
      password: { create: { password: password } },
    },
  });
};

exports.updateNickname = async (id, nickname) => {
  return await prisma.user.update({
    where: { id },
    data: { nickname },
  });
};

exports.updatePassword = async (userId, password) => {
  return await prisma.password.update({
    where: { userId },
    data: { password },
  });
};

exports.updateRole = async (id, role) => {
  return await prisma.user.update({
    where: { id },
    data: { role },
  });
};

exports.deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id } });
};

exports.findManyUsers = async () => {
  return await prisma.user.findMany({});
};

exports.findUserBy = async (name, value) => {
  return await prisma.user.findUnique({
    where: {
      [name]: value,
    },
    select: {
      id: true,
      username: true,
      nickname: true,
      role: true,
      password: {
        select: { password: true },
      },
    },
  });
};

exports.createGame = async (userId = null, mode, time, bbbv, points, board) => {
  const data = {
    mode: mode,
    time: time,
    bbbv: bbbv,
    points: points,
    board: board,
  };
  if (userId) data.userId = userId;
  return await prisma.game.create({ data });
};

exports.findManyGames = async (gameMode, nickname, sort, order) => {
  return await prisma.game.findMany({
    where: {
      ...(gameMode && { mode: gameMode.toUpperCase() }),
      ...(nickname && { user: { nickname } }),
    },
    orderBy: { [sort]: order },
    include: {
      user: {
        select: { nickname: true },
      },
    },
  });
};

exports.deleteAllGames = async () => {
  await prisma.game.deleteMany({});
};

exports.upsertAdventureGame = async (
  userId,
  levelId,
  collectedGems,
  points
) => {
  await prisma.adventure_Progress.upsert({
    where: {
      userId_levelId: { userId, levelId },
    },
    update: {
      collectedGems,
      points,
    },
    create: {
      levelId,
      userId,
      collectedGems,
      points,
    },
  });
};

exports.findManyAdventureGames = async (userId) => {
  return await prisma.adventure_Progress.findMany({
    where: {
      userId,
    },
  });
};

exports.createAchievement = async (id, title, description) => {
  return await prisma.achievement.create({
    data: {
      id,
      title,
      description,
    },
  });
};

exports.findManyAchievements = async () => {
  return await prisma.achievement.findMany({
    orderBy: { id: "asc" },
  });
};

exports.deleteAchievement = async (id) => {
  await prisma.achievement.delete({ where: { id } });
};

exports.upsertStats = async (
  userId,
  totalGems,
  bombsScanned,
  characterUsed,
  levelsCompleted,
  deaths
) => {
  await prisma.stats.upsert({
    where: {
      userId,
    },
    update: {
      totalGems: { increment: totalGems },
      bombsScanned: { increment: bombsScanned },
      [`${characterUsed}Games`]: { increment: 1 },
      levelsCompleted: { increment: levelsCompleted },
      deaths: { increment: deaths },
    },
    create: {
      userId,
      totalGems,
      bombsScanned,
      [`${characterUsed}Games`]: 1,
      levelsCompleted,
      deaths,
    },
  });

  return await checkAndUnlockAchievements(userId);
};

const checkAndUnlockAchievements = async (userId) => {
  const stats = await prisma.stats.findUnique({ where: { userId } });
  if (!stats) return [];

  const unlockedAchievements = await prisma.user_Achievement.findMany({
    where: { userId },
    select: { achievementId: true },
  });
  const unlockedIds = unlockedAchievements.map((a) => a.achievementId);

  const lockedAchievements = await prisma.achievement.findMany({
    where: {
      id: { notIn: unlockedIds },
    },
  });

  const newAchievements = lockedAchievements
    .filter((achievement) => checkAchievementCondition(achievement.id, stats))
    .map((achievement) => ({ userId, achievementId: achievement.id }));

  if (newAchievements.length > 0) {
    await prisma.user_Achievement.createMany({
      data: newAchievements,
      skipDuplicates: true,
    });
  }

  const newAchievementsData = lockedAchievements.filter((achievement) =>
    checkAchievementCondition(achievement.id, stats)
  );
  return newAchievementsData;
};

const checkAchievementCondition = (achievementId, stats) => {
  return ACHIEVEMENT_CONDITIONS[achievementId]?.(stats) ?? false;
};

exports.findAchievementsByUserId = async (userId) => {
  const unlockedAchievements = await prisma.user_Achievement.findMany({
    where: { userId },
    include: {
      achievement: true,
    },
    orderBy: { achievementId: "asc" },
  });
  return unlockedAchievements;
};

// const { PrismaClient } = require("@prisma/client");
// const { ACHIEVEMENT_CONDITIONS } = require("./achievementConditions");
// const { prismaErrorHandler } = require("../errors/prismaErrorHandler");
// prisma = new PrismaClient();

// exports.createUser = async (username, password, nickname) => {
//   try {
//     return await prisma.user.create({
//       data: {
//         username: username,
//         nickname: nickname,
//         password: { create: { password: password } },
//       },
//     });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.updateNickname = async (id, nickname) => {
//   try {
//     return await prisma.user.update({
//       where: { id },
//       data: { nickname },
//     });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.updatePassword = async (userId, password) => {
//   try {
//     return await prisma.password.update({
//       where: { userId },
//       data: { password },
//     });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.updateRole = async (id, role) => {
//   try {
//     return await prisma.user.update({
//       where: { id },
//       data: { role },
//     });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.deleteUser = async (id) => {
//   try {
//     return await prisma.user.delete({ where: { id } });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.findManyUsers = async () => {
//   try {
//     return await prisma.user.findMany({});
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.findUserBy = async (name, value) => {
//   try {
//     return await prisma.user.findUnique({
//       where: {
//         [name]: value,
//       },
//       select: {
//         id: true,
//         username: true,
//         nickname: true,
//         role: true,
//         password: {
//           select: { password: true },
//         },
//       },
//     });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.createGame = async (userId = null, mode, time, bbbv, points, board) => {
//   try {
//     const data = {
//       mode: mode,
//       time: time,
//       bbbv: bbbv,
//       points: points,
//       board: board,
//     };
//     if (userId) data.userId = userId;
//     return await prisma.game.create({ data });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.findManyGames = async (gameMode, nickname, sort, order) => {
//   try {
//     return await prisma.game.findMany({
//       where: {
//         ...(gameMode && { mode: gameMode.toUpperCase() }),
//         ...(nickname && { user: { nickname } }),
//       },
//       orderBy: { [sort]: order },
//       include: {
//         user: {
//           select: { nickname: true },
//         },
//       },
//     });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.deleteAllGames = async () => {
//   try {
//     await prisma.game.deleteMany({});
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.upsertAdventureGame = async (
//   userId,
//   levelId,
//   collectedGems,
//   points
// ) => {
//   try {
//     await prisma.adventure_Progress.upsert({
//       where: {
//         userId_levelId: { userId, levelId },
//       },
//       update: {
//         collectedGems,
//         points,
//       },
//       create: {
//         levelId,
//         userId,
//         collectedGems,
//         points,
//       },
//     });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.findManyAdventureGames = async (userId) => {
//   try {
//     return await prisma.adventure_Progress.findMany({
//       where: {
//         userId,
//       },
//     });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.createAchievement = async (id, title, description) => {
//   try {
//     return await prisma.achievement.create({
//       data: {
//         id,
//         title,
//         description,
//       },
//     });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.findManyAchievements = async () => {
//   try {
//     return await prisma.achievement.findMany({
//       orderBy: { id: "asc" },
//     });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.deleteAchievement = async (id) => {
//   try {
//     await prisma.achievement.delete({ where: { id } });
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// exports.upsertStats = async (
//   userId,
//   totalGems,
//   bombsScanned,
//   characterUsed,
//   levelsCompleted,
//   deaths
// ) => {
//   try {
//     await prisma.stats.upsert({
//       where: {
//         userId,
//       },
//       update: {
//         totalGems: { increment: totalGems },
//         bombsScanned: { increment: bombsScanned },
//         [`${characterUsed}Games`]: { increment: 1 },
//         levelsCompleted: { increment: levelsCompleted },
//         deaths: { increment: deaths },
//       },
//       create: {
//         userId,
//         totalGems,
//         bombsScanned,
//         [`${characterUsed}Games`]: 1,
//         levelsCompleted,
//         deaths,
//       },
//     });

//     return await checkAndUnlockAchievements(userId);
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// const checkAndUnlockAchievements = async (userId) => {
//   try {
//     const stats = await prisma.stats.findUnique({ where: { userId } });
//     if (!stats) return [];

//     const unlockedAchievements = await prisma.user_Achievement.findMany({
//       where: { userId },
//       select: { achievementId: true },
//     });
//     const unlockedIds = unlockedAchievements.map((a) => a.achievementId);

//     const lockedAchievements = await prisma.achievement.findMany({
//       where: {
//         id: { notIn: unlockedIds },
//       },
//     });

//     const newAchievements = lockedAchievements
//       .filter((achievement) => checkAchievementCondition(achievement.id, stats))
//       .map((achievement) => ({ userId, achievementId: achievement.id }));

//     if (newAchievements.length > 0) {
//       await prisma.user_Achievement.createMany({
//         data: newAchievements,
//         skipDuplicates: true,
//       });
//     }

//     const newAchievementsData = lockedAchievements.filter((achievement) =>
//       checkAchievementCondition(achievement.id, stats)
//     );
//     return newAchievementsData;
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };

// const checkAchievementCondition = (achievementId, stats) => {
//   try {
//     return ACHIEVEMENT_CONDITIONS[achievementId]?.(stats) ?? false;
//   } catch (err) {
//     console.error(err);
//     return false;
//   }
// };

// exports.findAchievementsByUserId = async (userId) => {
//   try {
//     const unlockedAchievements = await prisma.user_Achievement.findMany({
//       where: { userId },
//       include: {
//         achievement: true,
//       },
//       orderBy: { achievementId: "asc" },
//     });
//     return unlockedAchievements;
//   } catch (err) {
//     prismaErrorHandler(err);
//   }
// };
