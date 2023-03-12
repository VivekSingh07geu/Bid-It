const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser , newOrder);
router.route("/order/:id").get(isAuthenticatedUser , getSingleOrder);
router.route("/order/me").get(isAuthenticatedUser, myOrders);
router.route("/admin/orders").get(getAllOrders);

router.route("/order/:id")
      .put(updateOrder)
      .delete(deleteOrder);

module.exports = router; 