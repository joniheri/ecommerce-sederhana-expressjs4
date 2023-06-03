const express = require("express");
const router = express.Router();

// ProdcutDummy
const {
  getDataProduct: getDataProductDummy,
  getDataProductById: getDataProductByIdDummy,
} = require("../Controllers/ProductDummyController");
router.get("/dataproduct", getDataProductDummy);
router.get("/dataproductbyid/:idparam", getDataProductByIdDummy);
// End ProductDummy

// Product
const { addDataProduct } = require("../Controllers/ProductController");
router.post("/adddataproduct", addDataProduct);
// End Product

module.exports = router;
