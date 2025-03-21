const express = require("express");
const authController = require("../controllers/authController");
const { validateUser } = require("../middleware/validate");
const router = express.Router();

router.post("/signup", validateUser, authController.signup);
router.post("/login", authController.login);

module.exports = router;
