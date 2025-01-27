const gameController = require("../controllers/gameController");
const { Router } = require("express");
const router = new Router();

router.get("/:gameMode", gameController.findManyGames);

module.exports = router;
