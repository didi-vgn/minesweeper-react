const gameController = require("../controllers/gameController");
const { Router } = require("express");
const { authenticateToken } = require("../middleware/auth");
const { authorizeAdmin } = require("../middleware/admin");
const router = new Router();

router.get("/", gameController.findManyGames);
router.put(
  "/adventure/",
  authenticateToken,
  gameController.upsertAdventureGame
);
router.get("/adventure/:userId", gameController.findManyAdventureGames);
router.post("/guest", gameController.createGame);
router.post("/", authenticateToken, gameController.createGame);
router.delete(
  "/",
  authenticateToken,
  authorizeAdmin,
  gameController.deleteAllGames
);

module.exports = router;
