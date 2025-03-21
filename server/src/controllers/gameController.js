const db = require("../config/database");

exports.createGame = async (req, res) => {
  const userId = req.user?.id || null;
  const { mode, time, bbbv, points, board } = req.body;
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

exports.deleteAllGames = async (req, res) => {
  try {
    await db.deleteAllGames();
    return res.status(200).json({ message: "All games deleted." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.upsertAdventureGame = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated." });
  }
  const userId = req.user.id;
  const { levelId, collectedGems, points } = req.body;
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
