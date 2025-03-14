const express = require("express");
const achievementController = require("../controllers/achievementController");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

router.get("/", achievementController.findManyAchievements);
router.post("/", authenticateToken, achievementController.createAchievement);
router.delete(
  "/:id",
  authenticateToken,
  achievementController.deleteAchievement
);
router.put("/", achievementController.upsertStatsAndUnlockAchievements);
router.get("/user/:userId", achievementController.findAchievementsByUserId);

module.exports = router;
