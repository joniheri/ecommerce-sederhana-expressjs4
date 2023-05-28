const express = require("express");
const router = express.Router();

const {
  getDataProduct,
  getDataProductById,
} = require("../Controllers/ProductController");

router.get("/dataproduct", getDataProduct);
router.get("/dataproductbyid/:idparam", getDataProductById);

module.exports = router;
