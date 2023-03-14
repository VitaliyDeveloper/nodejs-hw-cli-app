const express = require("express");
const UserController = require("../../controllers/authControllers/UserController");
const addAvatar = require("../../controllers/authControllers/addAvatar");
const updateAvatar = require("../../controllers/authControllers/updateAvatar");
const auth = require("../../middlewaries/auth");
const upload = require("../../middlewaries/upload");

const router = express.Router();

router.get("/current", UserController.current);
router.post("/upload", auth, upload.single("avatar"), addAvatar);
router.patch("/avatars", upload.single("avatar"), updateAvatar);

module.exports = router;
