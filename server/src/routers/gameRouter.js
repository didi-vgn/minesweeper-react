const gameController = require("../controllers/gameController");
const { Router } = require("express");
const router = new Router();

router.get("/:gameMode", gameController.findManyGames);
router.post("/add-game", gameController.createGame);

module.exports = router;
