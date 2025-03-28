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

exports.findMinesweeperStats = async () => {
  const games = await prisma.game.groupBy({
    by: ["mode"],
    _count: { id: true },
    orderBy: { mode: "asc" },
  });

  const top = await prisma.game.groupBy({
    by: ["userId"],
    where: { userId: { not: null } },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 3,
  });
  const userIds = top.map((a) => a.userId);
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, nickname: true },
  });
  const topUsers = top.map((t) => {
    const user = users.find((u) => u.id === t.userId);
    return {
      nickname: user.nickname,
      count: t._count.id,
    };
  });
  return { games, topUsers };
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
