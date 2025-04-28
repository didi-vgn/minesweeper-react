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

exports.createClassicRecord = async (
  userId = null,
  difficulty,
  time,
  bbbv,
  points,
  board
) => {
  const data = {
    difficulty: difficulty,
    time: time,
    bbbv: bbbv,
    points: points,
    board: board,
  };
  if (userId) data.userId = userId;
  return await prisma.classicScore.create({ data });
};

exports.findManyClassicScores = async (difficulty, nickname, sort, order) => {
  return await prisma.classicScore.findMany({
    where: {
      ...(difficulty && { difficulty: difficulty.toUpperCase() }),
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
  const games = await prisma.classicScore.groupBy({
    by: ["difficulty"],
    _count: { id: true },
    orderBy: { difficulty: "asc" },
  });

  const top = await prisma.classicScore.groupBy({
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
  await prisma.classicScore.deleteMany({});
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

exports.findAdventureLeaderboard = async (nickname, sort, order) => {
  const allProgress = await prisma.adventure_Progress.groupBy({
    by: ["userId"],
    _count: { id: true },
    _sum: { points: true },
    orderBy: {
      [sort === "progress" ? "_count" : "_sum"]: {
        [sort === "progress" ? "id" : "points"]: order,
      },
    },
  });

  const userIds = allProgress.map((a) => a.userId);
  const users = await prisma.user.findMany({
    where: {
      id: { in: userIds },
      ...(nickname ? { nickname } : {}),
    },
    select: { id: true, nickname: true },
  });

  const filteredUserIds = new Set(users.map((u) => u.id));
  const leaderboard = allProgress
    .filter((p) => filteredUserIds.has(p.userId))
    .map((p) => {
      const user = users.find((u) => u.id === p.userId);
      return {
        nickname: user.nickname,
        progress: p._count.id,
        points: p._sum.points,
      };
    });

  return leaderboard;
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

exports.createDungeonScore = async (userId = null, points, depth) => {
  return await prisma.dungeonScore.create({
    data: {
      userId,
      points,
      depth,
    },
  });
};

exports.findManyDungeonScores = async (nickname, sort, order) => {
  return await prisma.dungeonScore.findMany({
    where: {
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

exports.upsertAdventureStats = async (
  userId,
  totalGems,
  bombsScanned,
  characterUsed,
  levelsCompleted,
  deaths,
  noScanWins
) => {
  const updateData = {
    totalGems: { increment: totalGems },
    bombsScanned: { increment: bombsScanned },
    [`${characterUsed}Games`]: { increment: 1 },
    levelsCompleted: { increment: levelsCompleted },
    deaths: { increment: deaths },
    noScanWins: { increment: noScanWins },
  };
  const createData = {
    totalGems,
    bombsScanned,
    [`${characterUsed}Games`]: 1,
    levelsCompleted,
    deaths,
    noScanWins,
  };
  await upsertStats(userId, updateData, createData);
  return await checkAndUnlockAchievements(userId);
};

exports.upsertDungeonStats = async (
  userId,
  totalGems,
  bombsScanned,
  characterUsed,
  deaths,
  depth,
  extraTime
) => {
  const stats = await prisma.stats.findUnique({
    where: { userId },
    select: {
      bestDepth: true,
      mostGemsCollected: true,
    },
  });
  const { bestDepth = 0, mostGemsCollected = 0 } = stats || {};
  const depthRecord = Math.max(depth, bestDepth);
  const gemsRecord = Math.max(totalGems, mostGemsCollected);
  const updateData = {
    totalGems: { increment: totalGems },
    bombsScanned: { increment: bombsScanned },
    [`${characterUsed}Games`]: { increment: 1 },
    deaths: { increment: deaths },
    teleports: { increment: depth - 1 },
    bestDepth: depthRecord,
    mostGemsCollected: gemsRecord,
    extraTime: { increment: extraTime },
  };
  const createData = {
    totalGems,
    bombsScanned,
    [`${characterUsed}Games`]: 1,
    deaths,
    teleports: depth - 1,
    bestDepth: depth,
    mostGemsCollected: totalGems,
    extraTime,
  };
  await upsertStats(userId, updateData, createData);
  return await checkAndUnlockAchievements(userId);
};

const upsertStats = (userId, updateData, createData) => {
  return prisma.stats.upsert({
    where: { userId },
    update: updateData,
    create: { userId, ...createData },
  });
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
