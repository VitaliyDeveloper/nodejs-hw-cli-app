const { Contacts } = require("../models/contacts");

const getById = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getById };
