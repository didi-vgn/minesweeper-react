const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/auth");

const { Router } = require("express");
const router = new Router();

router.get("/", userController.findManyUsers);
router.post("/delete/:userId", authenticateToken, userController.deleteUser);
router.post(
  "/update-password/:userId",
  authenticateToken,
  userController.updatePassword
);
router.post(
  "/update-nickname/:userId",
  authenticateToken,
  userController.updateNickname
);
router.post(
  "/update-role/:userId",
  authenticateToken,
  userController.updateRole
);

module.exports = router;
