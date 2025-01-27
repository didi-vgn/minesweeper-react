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

exports.findManyGames = async (gameMode, sort, order, nickname) => {
  try {
    return await prisma.game.findMany({
      where: {
        gameMode: gameMode.toUpperCase(),
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
