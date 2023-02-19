const express = require("express");
const router = express.Router();
// const { nanoid } = require("nanoid");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({
    status: 200,
    code: 200,
    message: "All contacts list",
    data: contacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await getContactById(contactId);

  if (!contactById) {
    return res.json({
      status: 404,
      code: 404,
      message: "Not found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    message: "Contact by Id",
    data: { contactById },
  });
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const contact = await addContact(body);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Add contact",
    data: { contact },
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  res.json({
    status: "success",
    code: 204,
    message: "Contact delete",
    data: { contact },
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const contact = await updateContact(contactId, body);

  res.json({
    status: "success",
    code: 200,
    message: "Contact update",
    data: { contact },
  });
});

module.exports = router;
