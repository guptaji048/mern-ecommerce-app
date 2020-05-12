const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const {
  getProductById,
  createProduct,
  getProduct,
  getPhoto,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategory
} = require("../controllers/product");

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getPhoto);

router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);

router.get("/products", getAllProducts);
router.get("product/all/categories", getAllUniqueCategory);

module.exports = router;
