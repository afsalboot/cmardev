const Customer = require("../models/Customer.js");
const Order = require("../models/Order.js");

const createOrder = async (req, res) => {
  try {
    console.log("reqbody", req.body);

    const {
      customerId,
      kg,
      rate,
      quantity,
      cuttingCharge,
      deliveryCharge,
      total,
      payment,
      channel,
      note,
    } = req.body;

    // ✅ Fix: use `customerId` instead of `customer`
    const customer = await Customer.findById(customerId);

    console.log("backend customer create", customer);

    if (!customer) {
      return res
        .status(400)
        .json({ error: "Customer not found. Please add customer first." });
    }

    // ✅ Match schema: use `customerId`
    const order = new Order({
      customerId: customer._id,
      customerName: customer.name,
      customerPhone: customer.phone,
      kg,
      rate,
      quantity,
      cuttingCharge,
      deliveryCharge,
      total,
      payment,
      channel,
      note,
    });

    await order.save();

    // ✅ Update customer stats
    customer.totalOrders += 1;
    customer.totalSpent += order.total;
    customer.lastPurchase = new Date();
    await customer.save();

    console.log("backend order create", order);

    res.status(201).json(order);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error creating order" });
  }
};


const getOrders = async (req, res) => {
  try {
    const { from, to, payment } = req.query;
    const filter = {};

    if (payment) filter.payment = payment;
    if (from && to)
      filter.createdAt = { $gte: new Date(from), $lte: new Date(to) };

    const orders = await Order.find(filter)
      .populate("customerId")
      .sort({ createdAt: -1 });
    res.status(201).json(orders);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customer");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(201).json({ message: "Fetched", order: order });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({ Order: updateOrder, Success: "updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error updating orders" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(201).json({ Success: "Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error deleting orders" });
  }
};

// backend/controllers/orderController.js
const updatePaymentStatus = async (req, res) => {
  try {
    const { payment, channel } = req.body; // include both
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { payment, channel },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};




module.exports = {
  createOrder,
  getOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  updatePaymentStatus
};
