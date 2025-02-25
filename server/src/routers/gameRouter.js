const gameController = require("../controllers/gameController");
const { Router } = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = new Router();

router.get("/", gameController.findManyGames);
router.post("/adventure/add-game", gameController.upsertAdventureGame);
router.get("/adventure/:userId", gameController.findManyAdventureGames);
router.get("/:gameMode", gameController.findManyGames);
router.post("/add-game", gameController.createGame);
router.post("/delete-all", authenticateToken, gameController.deleteAllGames);

module.exports = router;
