const express = require("express");
const achievementController = require("../controllers/achievementController");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

router.get("/", achievementController.findManyAchievements);
router.post(
  "/add-achievement",
  authenticateToken,
  achievementController.createAchievement
);
router.post(
  "/delete-all",
  authenticateToken,
  achievementController.deleteAllAchievements
);
router.post(
  "/update-stats",
  achievementController.upsertStatsAndUnlockAchievements
);
router.get("/user", achievementController.findAchievementsByUserId);
module.exports = router;
