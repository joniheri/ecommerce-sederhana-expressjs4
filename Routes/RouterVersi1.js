const express = require("express");
const router = express.Router();

// AuthMiddleware
const { middleware } = require("../middlewares/AuhtMiddleware");
// End AuthMiddleware

// AppMiddleware
const { upload } = require("../middlewares/AppMiddleware");
// End AppMiddleware

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
router.post(
  "/addproduct-upload-single",
  upload.single("thumbnail"),
  (req, res) => {
    return res.send({
      response: "success",
      message: "Upload Success",
    });
  }
);
router.post(
  "/addproduct-upload-multi",
  upload.array("files", 6),
  (req, res) => {
    return res.send({
      response: "success",
      message: "Upload Success",
    });
  }
);
// End Product

// UserRouter
const {
  getUsers,
  getUsersWithProfile,
  getUsersWithContact,
  getUsersWithProfileAndContact,
  getUsersWithSkill,
} = require("../Controllers/UserController");
router.get("/users", getUsers);
router.get("/users-middle", middleware, getUsers);
router.get("/userswithprofile", getUsersWithProfile);
router.get("/userswithcontact", getUsersWithContact);
router.get("/users-with-profile-contact", getUsersWithProfileAndContact);
router.get("/users-with-skill", getUsersWithSkill);
// End UserRouter

// ProfileRouter
const {
  getProfiles,
  getProfilesWithUser,
} = require("../Controllers/ProfileController");
router.get("/profiles", getProfiles);
router.get("/profileswithuser", getProfilesWithUser);
// End ProfileRouter

// ContactRouter
const {
  getContacts,
  getContactsWithUser,
} = require("../Controllers/ContactController");
router.get("/contacts", getContacts);
router.get("/contacts-with-user", getContactsWithUser);
// End ContactRouter

// AuthRouter
const {
  register,
  login,
  checkToken,
} = require("../Controllers/AuthController");
router.post("/register", register);
router.post("/login", login);
router.get("/check-token", middleware, checkToken);
// End AuthRouter

module.exports = router;
