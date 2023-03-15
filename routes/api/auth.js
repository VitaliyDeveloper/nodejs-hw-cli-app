const express = require("express");
const AuthController = require("../../controllers/authControllers/AuthController");
const checkToken = require("../../middlewaries/checkToken");

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/logout", checkToken, AuthController.logout);
router.post("/registration", AuthController.registration);
router.post("/verify", AuthController.verify);
router.get("/verify/:verificationToken", AuthController.verifyToken);

module.exports = router;
