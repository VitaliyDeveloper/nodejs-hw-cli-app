const express = require("express");
const {
  UserController,
} = require("../../controllers/authControllers/UserController");

const router = express.Router();

router.post("/contacts", UserController);

module.exports = router;
