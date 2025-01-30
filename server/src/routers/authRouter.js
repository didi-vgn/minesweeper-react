const express = require("express");
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

///testing token
router.get("/role", authenticateToken, (req, res) => {
  if (req.user.role === "ADMIN") {
    return res.status(200).json("Admin in!");
  } else if (req.user.role === "USER") {
    return res.status(200).json("Normal user in!");
  }
});

module.exports = router;
