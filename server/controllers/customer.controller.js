const Customer = require("../models/Customer.js");
const Order = require("../models/Order.js");

const addCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create customer" });
  }
};

// Get all customers or search
const getCustomers = async (req, res) => {
  try {
    const { q } = req.query;
    const query = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } },
          ],
        }
      : {};
    const customers = await Customer.find(query).sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: "Failed to get customer" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update customer" });
  }
};

// Delete Customer + Related Orders
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Delete all orders related to this customer
    await Order.deleteMany({ "customerId._id": id });

    // 2️⃣ Delete the customer itself
    await Customer.findByIdAndDelete(id);

    res.json({ success: true, message: "Customer and related orders deleted" });
  } catch (err) {
    console.error("❌ Error deleting customer:", err);
    res.status(500).json({ error: "Failed to delete customer and orders" });
  }
};

module.exports = {
  addCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
