const db = require("../config/database");

exports.createAchievement = async (req, res) => {
  const { id, title, description } = req.body;
  try {
    await db.createAchievement(id, title, description);
    return res.status(201).json({ message: "New achievement added." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: err.message });
  }
};

exports.findManyAchievements = async (req, res) => {
  try {
    const achievements = await db.findManyAchievements();
    return res.status(200).json({ achievements });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteAllAchievements = async (req, res) => {
  if (req.user.role === "ADMIN") {
    console.log("Admin request approved.");
    try {
      await db.deleteAllAchievements();
      return res.status(200).json({ message: "All achievements deleted." });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
  } else if (req.user.role === "USER") {
    console.log("Only admin can make this request");
    return res.status(403).json("Forbidden.");
  }
};

exports.upsertStatsAndUnlockAchievements = async (req, res) => {
  const {
    userId,
    totalGems,
    bombsScanned,
    characterUsed,
    levelsCompleted,
    deaths,
  } = req.body;

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
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

exports.findAchievementsByUserId = async (req, res) => {
  const { id } = req.query;
  try {
    const achievements = await db.findAchievementsByUserId(id);
    return res.status(200).json({ achievements });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
