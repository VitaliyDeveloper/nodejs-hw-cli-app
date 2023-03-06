const express = require("express");
const router = express.Router();
// const controllers = require("../../controllers/contactsControllers");
// const authControllers = require("../../controllers/authControllers");
const {
  AuthController,
} = require("../../controllers/authControllers/AuthController");
const {
  UserController,
} = require("../../controllers/authControllers/UserController");

const {
  getContacts,
  getById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers/controllers");

router.post("./login", AuthController);
router.post("./registration", AuthController);
router.get("./list", UserController);

router.get("/", getContacts);
router.get("/:contactId", getById);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
