const express = require("express");
const controllers = require("../../controllers");

const router = express.Router();

router.post("/contacts", controllers.AuthController.UserController);

module.exports = router;
