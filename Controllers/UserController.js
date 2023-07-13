const {
  User: ModelUser,
  Profile: ModelProfile,
  Contact: ModelContact,
  Skill: ModelSkill,
} = require("../models");

// GetUsers
exports.getUsers = async (req, res) => {
  console.log(req.user);
  try {
    const dataUsers = await ModelUser.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    if (!dataUsers || dataUsers.length === 0) {
      return res.status(401).send({
        response: "fail",
        message: "Get data Users Fail or Empty or Not Found",
      });
    }

    return res.send({
      response: "success",
      message: "Get Users Success",
      data: dataUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
// End GetUsers

// GetUsersWithProfile
exports.getUsersWithProfile = async (req, res) => {
  try {
    const dataUsersWithProfile = await ModelUser.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
      include: {
        model: ModelProfile,
        as: "dataProfile",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId", "UserId"],
        },
      },
    });

    if (!dataUsersWithProfile || dataUsersWithProfile.length === 0) {
      return res.status(401).send({
        response: "fail",
        message: "Get Users with Profile Fail or Not Found or Empty",
      });
    }

    return res.send({
      response: "success",
      message: "Get Users with Profile Success",
      data: dataUsersWithProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
// End GetUsersWithProfile

// GetUsersWithContact
exports.getUsersWithContact = async (req, res) => {
  try {
    const dataUsersWithContact = await ModelUser.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: {
        model: ModelContact,
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId", "UserId"],
        },
      },
    });

    if (!dataUsersWithContact || dataUsersWithContact.length === 0) {
      return res.status(401).send({
        response: "fail",
        message: "Get Users With Contact Fail or Not Found or Empty",
      });
    }

    return res.send({
      response: "fail",
      message: "Get users with contact Success",
      data: dataUsersWithContact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
// End GetUsersWithContact

// GetUsersWithProfileAndContact
exports.getUsersWithProfileAndContact = async (req, res) => {
  try {
    const dataUsersWithProfileAndContact = await ModelUser.findAll({
      include: [
        {
          model: ModelProfile,
          as: "dataProfile",
        },
        {
          model: ModelContact,
        },
      ],
    });

    return res.send({
      response: "fail",
      message: "Get users with contact Success",
      data: dataUsersWithProfileAndContact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
// End GetUsersWithProfileAndContact

// GetUsersWithSkill
exports.getUsersWithSkill = async (req, res) => {
  try {
    const dataUsersWithSkill = await ModelUser.findAll({
      include: {
        model: ModelSkill,
      },
    });

    return res.send({
      response: "success",
      message: "Get users with skil Success",
      data: dataUsersWithSkill,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
// End GetUsersWithSkill
