const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/logout", userController.logout);
router.get("/status", authController.authenticateToken, userController.getUserInfo);

module.exports = router;
