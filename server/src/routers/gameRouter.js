const gameController = require("../controllers/gameController");
const { Router } = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = new Router();

router.get("/:gameMode", gameController.findManyGames);
router.post("/add-game", gameController.createGame);
router.get("/:gameMode/:nickname", gameController.findManyGames);
router.post("/delete-all", authenticateToken, gameController.deleteAllGames);

module.exports = router;
