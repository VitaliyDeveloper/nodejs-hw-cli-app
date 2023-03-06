const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/contactsControllers");
const authControllers = require("../../controllers/authControllers");

router.post("./login", authControllers.AuthController.login);
router.post(
  "./registration",
  authControllers,
  authControllers.AuthController.registration
);
router.get("./list", authControllers.UserController.contacts);

router.get("/", controllers.getContacts);
router.get("/:contactId", controllers.getById);
router.post("/", controllers.createContact);
router.delete("/:contactId", controllers.deleteContact);
router.put("/:contactId", controllers.updateContact);
router.patch("/:contactId/favorite", controllers.updateStatusContact);

module.exports = router;
