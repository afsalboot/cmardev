const express = require("express");
const {
  addCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller.js");

const router = express.Router();


router.post("/add-customer", addCustomer);
router.get("/get-customers", getCustomers);
router.get("/get-customer/:id", getSingleCustomer);
router.put("/update-customer/:id", updateCustomer);
router.delete("/delete-customer/:id", deleteCustomer);

module.exports = router;
