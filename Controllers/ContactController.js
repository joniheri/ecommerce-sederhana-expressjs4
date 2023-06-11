const { Contact: ContactModel, User: UserModel } = require("../models");

// GetContact
exports.getContacts = async (req, res) => {
  try {
    const dataContact = await ContactModel.findAll();

    if (!dataContact || dataContact.length === 0) {
      return res.status(401).send({
        response: "fail",
        message: "Get contacts Fail or Not Found or Empty",
      });
    }

    return res.send({
      response: "success",
      message: "Get contacts Success",
      data: dataContact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
// End GetContact

// GetContacstWithUser
exports.getContactsWithUser = async (req, res) => {
  try {
    const dataContactsWithUser = await ContactModel.findAll({
      include: {
        model: UserModel,
      },
    });

    return res.send({
      response: "success",
      message: "Get contacts with user Success",
      data: dataContactsWithUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
// End GetContacstWithUser
