const express = require("express");
const UserController = require("../../controllers/authControllers/UserController");

const router = express.Router();

router.get("/current", UserController.current);

module.exports = router;
