const db = require("../config/database");

exports.createGame = async (req, res) => {
  const { userId, mode, time, bbbv, points, board } = req.body;
  try {
    await db.createGame(userId, mode, time, bbbv, points, board);
    return res
      .status(201)
      .json({ message: "Game stats added to leaderboards." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.findManyGames = async (req, res) => {
  const { gameMode, nickname, sort, order } = req.query;
  try {
    const games = await db.findManyGames(gameMode, nickname, sort, order);
    if (games.length === 0) {
      return res
        .status(200)
        .json({ message: "No games found for this game mode.", games: [] });
    }
    return res.status(200).json({ games });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteGamesByNickname = async (req, res) => {
  const { nickname } = req.params;
  try {
    const user = await db.findUserBy("nickname", nickname);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    await db.deleteManyGamesByUserId(user.id);
    return res.status(200).json({ message: "All games removed for the user." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteAllGames = async (req, res) => {
  if (req.user.role === "ADMIN") {
    console.log("Admin request approved.");
    try {
      await db.deleteAllGames();
      return res.status(200).json({ message: "All games deleted." });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
  } else if (req.user.role === "USER") {
    console.log("Only admin can make this request");
    return res.status(403).json("Forbidden.");
  }
};

exports.upsertAdventureGame = async (req, res) => {
  const { userId, levelId, collectedGems, points } = req.body;
  try {
    await db.upsertAdventureGame(userId, levelId, collectedGems, points);
    return res.status(201).json({ message: "Game data created/updated." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.findManyAdventureGames = async (req, res) => {
  const { userId } = req.params;
  try {
    const games = await db.findManyAdventureGames(userId);
    if (games.length === 0) {
      return res
        .status(200)
        .json({ message: "No progress for this user yet.", games: [] });
    }
    return res.status(200).json({ games });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};
