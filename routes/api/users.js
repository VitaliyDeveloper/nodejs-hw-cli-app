const express = require("express");
const UserController = require("../../controllers/authControllers/UserController");
const updateAvatar = require("../../controllers/authControllers/updateAvatar");
const auth = require("../../middlewaries/auth");
const upload = require("../../middlewaries/upload");

const router = express.Router();

router.get("/current", UserController.current);
router.patch("/public/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
