const express = require("express");
const {
  createOrder,
  getOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getAnalytics,
  updatePaymentStatus,
  dashboardStats,
} = require("../controllers/orders.controller.js");

const router = express.Router();

// Define routes
  router.post("/create-order", createOrder),
  router.get("/get-orders", getOrders),
  router.get("/get-single-order/:id", getSingleOrder),
  router.put("/update-order/:id", updateOrder),
  router.delete("/delete-order/:id", deleteOrder),
  router.put("/:id/payment", updatePaymentStatus)

module.exports = router;
