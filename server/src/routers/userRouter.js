const userController = require("../controllers/userController");
const { authorizeAdmin } = require("../middleware/admin");
const { authenticateToken } = require("../middleware/auth");
const { validateUser } = require("../middleware/validate");

const { Router } = require("express");
const router = new Router();

router.get("/", userController.findManyUsers);
router.delete("/:userId", authenticateToken, userController.deleteUser);
router.put(
  "/password/:userId",
  authenticateToken,
  validateUser[2],
  userController.updatePassword
);
router.put(
  "/nickname/:userId",
  authenticateToken,
  validateUser[1],
  userController.updateNickname
);
router.put(
  "/role/:userId",
  authenticateToken,
  authorizeAdmin,
  userController.updateRole
);

module.exports = router;
