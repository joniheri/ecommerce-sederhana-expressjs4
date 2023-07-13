const { User: UserModel } = require("../models");
const joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const dataInput = req.body;

    // ValidationInput
    const validationInput = joi.object({
      email: joi.string().required().min(5).email(),
      fullname: joi.string().required().min(3),
      password: joi.string().required().min(3),
    });
    const validationError = validationInput.validate(dataInput).error;
    if (validationError) {
      return res.status(400).send({
        response: "fail",
        message: validationError.details[0].message,
      });
    }
    // End ValidationInput

    const id = uuidv4();
    const hashPassword = await bcrypt.hash(dataInput.password, 10);

    // CheckEmailAlreadyExist
    const dataUserByEmail = await UserModel.findOne({
      where: {
        email: dataInput.email,
      },
    });
    if (dataUserByEmail) {
      return res.status(400).send({
        response: "fail",
        message: `User with email: ${dataInput.email} Already Exist`,
      });
    }
    // End CheckEmailAlreadyExist

    //InsertDatabase
    const insertToDatabase = await UserModel.create({
      id: id,
      email: dataInput.email,
      fullname: dataInput.fullname,
      password: hashPassword,
    });
    if (!insertToDatabase) {
      return res.status(400).send({
        response: "fail",
        message: "Insert to database Fail",
      });
    }
    //End InsertDatabase

    return res.send({
      response: "success",
      message: "Register Success",
      data: dataInput,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const dataInput = req.body;

    // ValidationInput
    const validationInput = joi.object({
      email: joi.string().required().min(3).email(),
      password: joi.string().required().min(3),
    });
    const validationError = validationInput.validate(dataInput).error;
    if (validationError) {
      return res.status(400).send({
        response: "fail",
        message: validationError.details[0].message,
      });
    }
    // ValidationInput

    // DataUserByEmail
    const dataUserByEmail = await UserModel.findOne({
      where: {
        email: dataInput.email,
      },
    });
    if (!dataUserByEmail) {
      return res.status(400).send({
        response: "fail",
        message: `Email or Password is fail`,
      });
    }
    // End DataUserByEmail

    // ComparePassword
    const comparePasswrod = await bcrypt.compare(
      dataInput.password,
      dataUserByEmail.password
    );
    if (!comparePasswrod) {
      return res.status(400).send({
        response: "fail",
        message: `Email or Password is fail`,
      });
    }
    // End ComparePassword

    // MakeToken
    const token = jwt.sign(
      {
        id: dataUserByEmail.id,
      },
      process.env.SECRETKEY_ACCESS_TOKEN
    );
    // End MakeToken

    return res.send({
      response: "success",
      message: "Login Success",
      data: {
        id: dataUserByEmail.id,
        email: dataUserByEmail.email,
        fullname: dataUserByEmail.fullname,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
