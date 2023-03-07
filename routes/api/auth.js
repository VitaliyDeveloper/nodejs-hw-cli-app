const express = require("express");
const AuthController = require("../../controllers/authControllers/AuthController");

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/registration", AuthController.registration);

module.exports = router;
