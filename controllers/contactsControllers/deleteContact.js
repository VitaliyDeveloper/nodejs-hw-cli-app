const { Contacts } = require("../../models/contacts");

const deleteContact = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

module.exports = { deleteContact };
