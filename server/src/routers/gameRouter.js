const gameController = require("../controllers/gameController");
const { Router } = require("express");
const { authenticateToken } = require("../middleware/auth");
const { authorizeAdmin } = require("../middleware/admin");
const router = new Router();

router.get("/", gameController.getClassicLeaderboard);
router.post("/", authenticateToken, gameController.addClassicRecord);
router.post("/guest", gameController.addClassicRecord);
router.get("/stats", gameController.minesweeperStats);
router.put(
  "/adventure/",
  authenticateToken,
  gameController.upsertAdventureGame
);
router.get("/adventure/leaderboard", gameController.getAdventureLeaderboard);
router.get("/adventure/:userId", gameController.findManyAdventureGames);
router.post("/dungeon", authenticateToken, gameController.addDungeonRecord);
router.post("/dungeon/guest", gameController.addDungeonRecord);
router.get("/dungeon", gameController.getDungeonLeaderboard);
router.delete(
  "/",
  authenticateToken,
  authorizeAdmin,
  gameController.deleteAllGames
);

module.exports = router;
