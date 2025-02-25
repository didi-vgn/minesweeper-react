const db = require("../config/database");

exports.createAchievement = async (req, res) => {
  const { title, description, icon, condition } = req.body;
  try {
    await db.createAchievement(title, description, icon, condition);
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
