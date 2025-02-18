const { PrismaClient } = require("@prisma/client");
prisma = new PrismaClient();

exports.createUser = async (username, password, nickname) => {
  try {
    return await prisma.user.create({
      data: {
        username: username,
        nickname: nickname,
        password: { create: { password: password } },
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create user.");
  }
};

exports.findManyUsers = async () => {
  try {
    return await prisma.user.findMany({
      ////testing ---needs to be removed
      include: {
        password: {
          select: { password: true },
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch users.");
  }
};

exports.findUserBy = async (name, value) => {
  try {
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
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch user.");
  }
};

exports.createGame = async (userId = null, mode, time, bbbv, points, board) => {
  try {
    const data = {
      mode: mode,
      time: time,
      bbbv: bbbv,
      points: points,
      board: board,
    };
    if (userId) data.userId = userId;

    return await prisma.game.create({ data });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add game.");
  }
};

exports.findManyGames = async (gameMode, sort, order, nickname) => {
  try {
    return await prisma.game.findMany({
      where: {
        mode: gameMode.toUpperCase(),
        ...(nickname && { user: { nickname } }),
      },
      orderBy: { [sort]: order },
      include: {
        user: {
          select: { nickname: true },
        },
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch games.");
  }
};

exports.deleteManyGamesByUserId = async (id) => {
  try {
    await prisma.game.deleteMany({
      where: {
        userId: id,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete games.");
  }
};

exports.deleteAllGames = async () => {
  try {
    await prisma.game.deleteMany({});
  } catch (err) {
    console.error(err);
    throw new Error("Failed to delete games.");
  }
};

exports.upsertAdventureGame = async (
  userId,
  levelId,
  collectedGems,
  points
) => {
  try {
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
  } catch (err) {
    console.error(err);
    throw new Error("Failed to add or update game data.");
  }
};

exports.findManyAdventureGames = async (userId) => {
  try {
    return await prisma.adventure_Progress.findMany({
      where: {
        userId,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch games.");
  }
};
