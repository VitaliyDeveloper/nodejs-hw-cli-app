const { schema } = require("../validator/schemaJoi");
const { Contacts } = require("../models/contacts");

const createContact = async (req, res) => {
  try {
    const body = req.body;
    const { error } = schema.validate(body);
    if (error) {
      res.json({
        status: "failure",
        code: 400,
        message: "missing required name field",
      });
    } else {
      const newContact = await Contacts.insertMany(body);
      res.status(201).json({
        status: "success",
        code: 201,
        message: "Add contact",
        data: { newContact },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createContact };
