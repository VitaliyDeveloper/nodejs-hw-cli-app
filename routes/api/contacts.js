const express = require("express");
const router = express.Router();
const {
  getContacts,
  getById,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/controllers");

router.get("/", getContacts);
router.get("/:contactId", getById);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", updateContact);
router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
