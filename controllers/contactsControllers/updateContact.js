const { schema } = require("../../validator/schemaJoi");
const { Contacts } = require("../../models/contacts");

const updateContact = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateContact };
