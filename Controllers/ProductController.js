const { TbProduct } = require("../models");

exports.addDataProduct = async (req, res) => {
  try {
    const dataInput = req.body;

    // ValidationInput
    // End ValidationInput

    // CheckIdAlreadyExist
    // End CheckIdAlreadyExist

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
      return res.status(4001).send({
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
    return res.send({
      response: "fail",
      message: "Error Catch",
    });
  }
};
