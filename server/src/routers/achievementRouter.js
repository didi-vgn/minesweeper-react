const express = require("express");
const achievementController = require("../controllers/achievementController");
const { authenticateToken } = require("../middleware/auth");
const { authorizeAdmin } = require("../middleware/admin");
const router = express.Router();

router.get("/", achievementController.findManyAchievements);
router.post(
  "/",
  authenticateToken,
  authorizeAdmin,
  achievementController.createAchievement
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeAdmin,
  achievementController.deleteAchievement
);
router.put(
  "/adventure",
  authenticateToken,
  achievementController.upsertStatsAndUnlockAchievementsAdv
);
router.put(
  "/dungeon",
  authenticateToken,
  achievementController.upsertStatsAndUnlockAchievementsDun
);
router.get("/user/:userId", achievementController.findAchievementsByUserId);

module.exports = router;
