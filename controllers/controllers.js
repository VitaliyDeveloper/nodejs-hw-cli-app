const { schema } = require("../validator/schemaJoi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

(async () => {
  try {
    const getContasts = async (req, res) => {
      const contacts = await listContacts();
      res.json({
        status: 200,
        code: 200,
        message: "All contacts list",
        data: contacts,
      });
    };

    const getById = async (req, res) => {
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
    };

    const createContact = async (req, res) => {
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
    };

    const deleteContact = async (req, res) => {
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
        code: 200,
        message: "contact deleted",
        data: { contact },
      });
    };

    const upgradeContact = async (req, res) => {
      const { contactId } = req.params;
      const body = req.body;

      const { error } = schema.validate(req.body);
      if (error) {
        res.json({
          status: "failure",
          code: 400,
          message: "missing fields",
        });
      } else if (!error) {
        const contact = await updateContact(contactId, body);
        res.json({
          status: "success",
          code: 200,
          message: "Contact update",
          data: { contact },
        });
      } else {
        res.json({
          status: "failure",
          code: 404,
          message: "Not found",
        });
      }
    };

    module.exports = {
      getContasts,
      getById,
      createContact,
      deleteContact,
      upgradeContact,
    };
  } catch (error) {
    console.log(error);
  }
})();
