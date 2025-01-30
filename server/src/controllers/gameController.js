const db = require("../config/database");

exports.createGame = async (req, res) => {
  const { userId, gameMode, time, bbbv, points } = req.body;
  try {
    await db.createGame(userId, gameMode, time, bbbv, points);
    return res
      .status(201)
      .json({ message: "Game stats added to leaderboards." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to save game stats." });
  }
};

exports.findManyGames = async (req, res) => {
  const { gameMode, nickname } = req.params;
  const sort = req.query.sort || "time";
  const order = req.query.order === "desc" ? "desc" : "asc";
  try {
    const games = await db.findManyGames(gameMode, sort, order, nickname);
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

///probably won't need this function
// exports.deleteGamesByGameId = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const game = await db.score.findUnique({ where: { id } });

//     if (!game) {
//       return res.status(404).json({ error: "Game not found." });
//     }

//     await db.game.delete({
//       where: {
//         id,
//       },
//     });
//     return res.status(200).json({ message: "Game removed." });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Failed to remove game." });
//   }
// };
