const { Contacts } = require("../../models/contacts");

const getContacts = async (req, res) => {
  try {
    const result = await Contacts.find({});
    res.json({
      status: 200,
      code: 200,
      message: "All contacts list",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = getContacts;
