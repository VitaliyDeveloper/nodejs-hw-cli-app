const express = require("express");
const {
  AuthController,
} = require("../../controllers/authControllers/AuthController");

const router = express.Router();

router.post("/login", AuthController);
router.post("/registration", AuthController);

module.exports = router;
