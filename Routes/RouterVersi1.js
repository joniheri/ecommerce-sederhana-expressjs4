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

// UserRouter
const {
  getUsers,
  getUsersWithProfile,
  getUsersWithContact,
  getUsersWithProfileAndContact,
  getUsersWithSkill,
} = require("../Controllers/UserController");
router.get("/users", getUsers);
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
const { register } = require("../Controllers/AuthController");
router.post("/register", register);
// End AuthRouter

module.exports = router;
