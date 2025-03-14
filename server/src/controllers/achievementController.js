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

exports.deleteAchievement = async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json("Forbidden.");
  }
  const { id } = req.params;
  try {
    await db.deleteAchievement(id);
    return res.status(200).json({ message: `Achievement ${id} deleted.` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
  const { userId } = req.params;
  try {
    const achievements = await db.findAchievementsByUserId(userId);
    return res.status(200).json({ achievements });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
