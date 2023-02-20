const express = require("express");
const router = express.Router();
const {
  getContasts,
  getById,
  createContact,
  deleteContact,
  upgradeContact,
} = require("../../controllers/controllers");

router.get("/", getContasts);
router.get("/:contactId", getById);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", upgradeContact);

module.exports = router;
