const gameController = require("../controllers/gameController");
const { Router } = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = new Router();

router.get("/", gameController.findManyGames);
router.put("/adventure/", gameController.upsertAdventureGame);
router.get("/adventure/:userId", gameController.findManyAdventureGames);
router.post("/", gameController.createGame);
router.delete("/", authenticateToken, gameController.deleteAllGames);

module.exports = router;
