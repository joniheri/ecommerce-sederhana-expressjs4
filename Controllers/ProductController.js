const dataProduct = [
  {
    id: 1,
    product: "Ice Capucino",
    price: 15000,
  },
  {
    id: 2,
    product: "Ice Cream",
    price: 20000,
  },
];

exports.getDataProduct = (req, res) => {
  return res.send({
    response: "success",
    message: "Get Data Product Success",
    data: dataProduct,
  });
};

exports.getDataProductById = (req, res) => {
  const { idparam } = req.params;
  const dataProductById = dataProduct.find((item) => item.id == idparam);
  if (!dataProductById) {
    return res.status(400).send({
      response: "fail",
      message: `Get Data Product with id: ${idparam} Fail!`,
      idparams: idparam,
      data: null,
    });
  }
  return res.send({
    response: "success",
    message: "Get Data Product Success",
    idparams: idparam,
    data: dataProductById,
  });
};
