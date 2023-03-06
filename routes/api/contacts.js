const express = require("express");
const router = express.Router();

const contactControllers = require("../../controllers");

router.get("/", contactControllers.getContacts);
router.get("/:contactId", contactControllers.getById);
router.post("/", contactControllers.createContact);
router.delete("/:contactId", contactControllers.deleteContact);
router.put("/:contactId", contactControllers.updateContact);
router.patch("/:contactId/favorite", contactControllers.updateStatusContact);

module.exports = router;
