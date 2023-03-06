const { schema } = require("../validator/schemaJoi");
const { Contacts } = require("../models/contacts");

(async () => {
  try {
    // //GET///////////////////////////////////////
    const getContacts = async (req, res) => {
      const result = await Contacts.find({});
      res.json({
        status: 200,
        code: 200,
        message: "All contacts list",
        data: result,
      });
    };

    // //GET ID/////////////////////////////////////////
    const getById = async (req, res) => {
      const { contactId } = req.params;
      const contactById = await Contacts.findById({ _id: contactId });

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

    // //POST//////////////////////////////////////
    const createContact = async (req, res) => {
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
    };

    // //DELETE///////////////////////////////////////
    const deleteContact = async (req, res) => {
      const { contactId } = req.params;
      const contact = await Contacts.deleteOne({ _id: contactId });
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

    // //PUT////////////////////////////////////////
    const updateContact = async (req, res) => {
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
        const contact = await Contacts.updateOne({ _id: contactId }, body);

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

    // //PATCH/////////////////////////////////
    const updateStatusContact = async (req, res) => {
      const { contactId } = req.params;
      const { favorite } = req.body;
      const result = await Contacts.findByIdAndUpdate(
        contactId,
        { favorite },
        {
          new: true,
        }
      );
      console.log(result);
      if (!result) {
        res.json({
          status: 400,
          code: 400,
          message: "missing field favorite",
        });
      } else if (result) {
        res.json({
          status: "success",
          code: 200,
          message: "Contact update",
          data: { result },
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
      getContacts,
      getById,
      createContact,
      deleteContact,
      updateContact,
      updateStatusContact,
    };
  } catch (error) {
    console.log(error);
  }
})();
