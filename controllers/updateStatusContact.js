const { Contacts } = require("../models/contacts");

const updateStatusContact = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updateStatusContact };
