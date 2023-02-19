const express = require("express");
const router = express.Router();
const Joi = require("joi");
// const { nanoid } = require("nanoid");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({
      tlds: { allow: ["com", "net", "ru"] },
    })
    .required(),

  phone: Joi.string().min(10).max(20).required(),
});

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
      status: "failure",
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
  try {
    const body = req.body;

    const { error } = schema.validate(req.body);
    if (error) {
      res.json({
        status: "failure",
        code: 400,
        message: "missing required name field",
      });
    } else {
      const contact = await addContact(body);
      res.status(201).json({
        status: "success",
        code: 201,
        message: "Add contact",
        data: { contact },
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  if (!contact) {
    return res.json({
      status: "failure",
      code: 404,
      message: "Not found",
    });
  }

  res.json({
    status: "success",
    code: 204,
    message: "Contact delete",
    data: { contact },
  });
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    const { error } = schema.validate(req.body);
    if (error) {
      res.json({
        status: "failure",
        code: 400,
        message: "missing required name field",
      });
    } else {
      const contact = await updateContact(contactId, body);
      res.json({
        status: "success",
        code: 200,
        message: "Contact update",
        data: { contact },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
