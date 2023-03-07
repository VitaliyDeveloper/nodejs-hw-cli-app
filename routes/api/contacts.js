const express = require("express");
const router = express.Router();

const {
  getContacts,
  getById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers/controllers");

router.get("/", getContacts);
router.get("/:contactId", getById);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateStatusContact);

// const controllers = require("../../controllers/contactsControllers");

// router.get("/", controllers.getContacts);
// router.get("/:contactId", controllers.getById);
// router.post("/", controllers.createContact);
// router.delete("/:contactId", controllers.deleteContact);
// router.put("/:contactId", controllers.updateContact);
// router.patch("/:contactId/favorite", controllers.updateStatusContact);

module.exports = router;
