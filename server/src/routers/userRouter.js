const userController = require("../controllers/userController");
const gameRouter = require("./gameRouter");

const { Router } = require("express");
const router = new Router();

router.get("/", userController.findManyUsers);
// router.use("/:nickname", gameRouter);

module.exports = router;
