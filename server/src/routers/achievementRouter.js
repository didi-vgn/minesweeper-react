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

module.exports = router;
