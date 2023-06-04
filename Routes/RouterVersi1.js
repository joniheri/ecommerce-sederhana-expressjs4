const express = require("express");
const router = express.Router();

// ProdcutDummy
const {
  getDataProduct: getDataProductDummy,
  getDataProductDummyById,
} = require("../Controllers/ProductDummyController");
router.get("/dataproduct", getDataProductDummy);
router.get("/dataproductdummybyid/:idparam", getDataProductDummyById);
// End ProductDummy

// Product
const {
  addDataProduct,
  getDataProducts,
  getDataProductById,
  updateDataProduct,
  deleteDataProduct,
} = require("../Controllers/ProductController");
router.post("/adddataproduct", addDataProduct);
router.get("/dataproducts", getDataProducts);
router.get("/dataproductbyid/:idparam", getDataProductById);
router.patch("/updatedataproduct/:idparam", updateDataProduct);
router.delete("/deletedataproduct/:idparam", deleteDataProduct);
// End Product

module.exports = router;
