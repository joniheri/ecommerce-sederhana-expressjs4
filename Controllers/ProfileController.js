const { User: ModelUser, Profile: ModelProfile } = require("../models");

// GetProfiles
exports.getProfiles = async (req, res) => {
  try {
    const dataProfiles = await ModelProfile.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
    });

    if (!dataProfiles || dataProfiles.length === 0) {
      return res.status(401).send({
        response: "fail",
        message: "Data profile Not Found or Empty",
      });
    }

    return res.send({
      response: "success",
      message: "Get Profiles Success",
      data: dataProfiles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
// End GetProfiles

// GetProfilesWithUser
exports.getProfilesWithUser = async (req, res) => {
  try {
    const dataProfilesWithUser = await ModelProfile.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "UserId"],
      },
      include: {
        model: ModelUser,
        as: "dataUser",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
    });

    if (!dataProfilesWithUser || dataProfilesWithUser.length === 0) {
      return res.status(401).send({
        response: "fail",
        message: "Get Profiles with User fail or Not Found or Empty",
      });
    }

    return res.send({
      response: "success",
      message: "Get Profiles Success",
      data: dataProfilesWithUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
// End GetProfilesWithUser
