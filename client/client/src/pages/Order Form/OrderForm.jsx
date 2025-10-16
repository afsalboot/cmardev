import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import "./orderform.scss";

const OrderForm = ({ order = null }) => {
  const { customers, fetchCustomers, addOrder, updateOrder } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();

  const prefilledCustomerId = location.state?.customerId || "";

  const [customerId, setCustomerId] = useState(order?.customerId || prefilledCustomerId);
  const [kg, setKg] = useState(order?.kg || "");
  const [quantity, setQuantity] = useState(order?.quantity || 1);
  const [rate, setRate] = useState(order?.rate || "");
  const [cuttingCharge, setCuttingCharge] = useState(order?.cuttingCharge || '');
  const [deliveryCharge, setDeliveryCharge] = useState(order?.deliveryCharge || '');
  const [payment, setPayment] = useState(order?.payment || "pending");
  const [channel, setChannel] = useState(order?.channel || "Nil");
  const [note, setNote] = useState(order?.note || "");

  useEffect(() => {
    if (!customers.length) fetchCustomers();
  }, []);

  const selectedCustomer = customers.find((c) => c._id === customerId);

  // Auto-calculate total
  const total =
    Number(kg) * Number(rate) +
    Number(cuttingCharge || 0) +
    Number(deliveryCharge || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCustomer) {
      alert("Please select a customer.");
      return;
    }

    const payload = {
      customerId: selectedCustomer._id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      kg,
      quantity,
      rate,
      cuttingCharge,
      deliveryCharge,
      payment,
      channel,
      note,
      total,
    };

    if (order) {
      await updateOrder(order._id, payload);
      alert("✅ Order updated successfully!");
    } else {
      await addOrder(payload);
      alert("✅ Order created successfully!");
    }

    // Reset form
    setCustomerId("");
    setKg("");
    setQuantity(1);
    setRate("");
    setCuttingCharge(0);
    setDeliveryCharge(0);
    setPayment("pending");
    setChannel("Nil");
    setNote("");

    navigate("/orders");
  };

  return (
    <div className="order-form">
      <h2>{order ? "Edit Order" : "Create Order"}</h2>
      <form onSubmit={handleSubmit}>
        {/* Customer Selector */}
        {prefilledCustomerId ? (
          <p>
            <strong>Customer:</strong>{" "}
            {customers.find((c) => c._id === prefilledCustomerId)?.name ||
              "Loading..."}
          </p>
        ) : (
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} - {c.phone}
              </option>
            ))}
          </select>
        )}

        {/* Order Fields */}
        <label className="label">Weight (Kg)</label>
        <input
          type="number"
          value={kg}
          onChange={(e) => setKg(e.target.value)}
          required
        />

        <label className="label">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
        />

        <label className="label">Rate (₹)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />

        <label className="label">Cutting Charge (₹)</label>
        <input
          type="number"
          value={cuttingCharge}
          onChange={(e) => setCuttingCharge(e.target.value)}
        />

        <label className="label">Delivery Charge (₹)</label>
        <input
          type="number"
          value={deliveryCharge}
          onChange={(e) => setDeliveryCharge(e.target.value)}
        />

        {/* Payment Fields */}
        <label className="label">Payment Status</label>
        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
        </select>

        <label className="label">Payment Method</label>
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          disabled={payment === "pending"}
        >
          <option value="Nil">Nil</option>
          <option value="cash">Cash</option>
          <option value="G-pay">G-pay</option>
        </select>

        <label className="label">Notes</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />

        <h3>Total: ₹{total.toFixed(2)}</h3>

        <button type="submit">{order ? "Update Order" : "Create Order"}</button>
      </form>
    </div>
  );
};

export default OrderForm;
