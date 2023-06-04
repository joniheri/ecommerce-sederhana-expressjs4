const { TbProduct } = require("../models");
const joi = require("joi");

exports.addDataProduct = async (req, res) => {
  try {
    const dataInput = req.body;

    // ValidationInput
    const validationInput = joi.object({
      id: joi.string().required().min(3),
      productName: joi.string().required().min(5),
      price: joi.number().required(),
    });
    const validationError = validationInput.validate(dataInput).error;
    if (validationError) {
      return res.status(400).send({
        response: "fail",
        message: "Validate Error",
        error: validationError.details[0].message,
      });
    }
    // End ValidationInput

    // CheckDataAlreadyExist
    const dataProductById = await TbProduct.findOne({
      where: {
        id: dataInput.id,
      },
    });
    if (dataProductById) {
      return res.status(400).send({
        response: "fail",
        message: `Data dengan ID: ${dataInput.id} Sudah Ada`,
      });
    }
    const dataProductByNameProduct = await TbProduct.findOne({
      where: {
        productName: dataInput.productName,
      },
    });
    if (dataProductByNameProduct) {
      return res.status(400).send({
        response: "fail",
        message: `Data dengan Nama Product: ${dataInput.productName} Sudah Ada`,
      });
    }
    // End CheckDataAlreadyExist

    // iniProcessInsertKeDatabase
    const porcessInsertData = await TbProduct.create({
      id: dataInput.id,
      productName: dataInput.productName,
      price: dataInput.price,
      qty: dataInput.qty,
    });
    // End iniProcessInsertKeDatabase

    // CekKalauInsertGagal
    if (!porcessInsertData) {
      return res.status(401).send({
        response: "fail",
        message: "Add Data Fail",
      });
    }
    // CekKalauInsertGagal

    // ProcessSuccess
    return res.send({
      response: "success",
      message: "Add Data Success",
      dataInput: porcessInsertData,
    });
    // ProcessSuccess
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};

exports.getDataProducts = async (req, res) => {
  try {
    const dataProducts = await TbProduct.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (dataProducts.length <= 0) {
      return res.status(400).send({
        response: "fail",
        message: "Data Products Kosong",
        data: [],
      });
    }

    return res.send({
      response: "success",
      message: "Get Data Products Success",
      data: dataProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};

exports.getDataProductById = async (req, res) => {
  try {
    const idprm = req.params.idparam;

    const dataProductById = await TbProduct.findOne({
      where: {
        id: idprm,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataProductById) {
      return res.send({
        response: "fail",
        message: `Data dengan ID: ${idprm} Tidak Ada`,
        data: [],
      });
    }

    return res.send({
      response: "success",
      message: "Get data product success",
      data: dataProductById,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};

exports.updateDataProduct = async (req, res) => {
  try {
    const { idparam } = req.params;
    const { body } = req;

    // CekDataAlreadyExist
    const dataProductById = await TbProduct.findOne({
      where: {
        id: idparam,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!dataProductById) {
      return res.status(400).send({
        response: "fail",
        message: `Data dengan ID: ${idparam} Tidak Ada`,
      });
    }
    // End CekDataAlreadyExist

    // ProcessUpdate
    const updateProduct = await TbProduct.update(
      {
        qty: body.qty,
      },
      {
        where: {
          id: idparam,
        },
      }
    );
    if (!updateProduct) {
      return res.status(400).send({
        response: "fail",
        message: "Update Data Fail",
      });
    }
    // End ProcessUpdate

    return res.send({
      response: "success",
      message: "Update Data Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};

exports.deleteDataProduct = async (req, res) => {
  try {
    const { idparam } = req.params;

    const dataProductById = await TbProduct.findOne({
      where: {
        id: idparam,
      },
    });
    if (!dataProductById) {
      return res.status(400).send({
        response: "fail",
        message: `Data with ID: ${idparam} Not Found`,
      });
    }

    const deleteProduct = await TbProduct.destroy({
      where: {
        id: idparam,
      },
    });
    if (!deleteProduct) {
      return res.status(400).send({
        response: "fail",
        message: "Delete Data Fail",
      });
    }

    return res.send({
      response: "success",
      message: "Delete Data Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
