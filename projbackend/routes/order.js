const express = require("express");
const router = express.Router();

const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { updateStock } = require("../controllers/product");
const {
  getOrderById,
  getAllOrders,
  getOrderStatus,
  updateStatus,
  createOrder
} = require("../controllers/order");

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

router.get(
  "/orders/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.put(
  "/order/:orderId/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);

module.exports = router;
