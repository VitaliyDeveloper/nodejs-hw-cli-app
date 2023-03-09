const express = require("express");
const AuthController = require("../../controllers/authControllers/AuthController");
const checkToken = require("../../middlewaries/checkToken");
// const auth = require("../../middlewaries/auth");

const router = express.Router();

router.post("/login", AuthController.login);
router.get("/logout", checkToken, AuthController.logout);
router.post("/registration", AuthController.registration);

module.exports = router;
