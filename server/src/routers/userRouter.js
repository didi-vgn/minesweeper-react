const userController = require("../controllers/userController");
const { authenticateToken } = require("../middleware/auth");

const { Router } = require("express");
const router = new Router();

router.get("/", userController.findManyUsers);
router.delete("/:userId", authenticateToken, userController.deleteUser);
router.put(
  "/password/:userId",
  authenticateToken,
  userController.updatePassword
);
router.put(
  "/nickname/:userId",
  authenticateToken,
  userController.updateNickname
);
router.put("/role/:userId", authenticateToken, userController.updateRole);

module.exports = router;
