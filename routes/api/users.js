const express = require("express");
const UserController = require("../../controllers/authControllers/UserController");

const router = express.Router();

router.post("/list", UserController.list);

module.exports = router;
