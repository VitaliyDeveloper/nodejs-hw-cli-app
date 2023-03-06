const express = require("express");
const userController = require("../../controllers/authControllers");

const router = express.Router();

router.post("/contacts", userController.UserController);

module.exports = router;
