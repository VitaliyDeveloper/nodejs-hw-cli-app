const express = require("express");
const authController = require("../../controllers/authControllers/");

const router = express.Router();

router.post("/login", authController.AuthController);
router.post("/registration", authController.AuthController);

module.exports = router;
