import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./ordercard.scss";

const OrderCard = ({ order }) => {
  const { orders, deleteOrder, updatePaymentStatus } = useContext(AppContext);
  const [editingPayment, setEditingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(order.payment);

  console.log('passed order',order)

  // --- Generate order number ---
  const orderIndex = orders.findIndex((o) => o._id === order._id);
  const orderNo =
    orderIndex >= 0 ? String(orderIndex + 1).padStart(2, "0") : "01";

  // --- Generate readable order code ---
  const generateOrderCode = (order) => {
    const namePart = order.customerName
      ? order.customerName.substring(0, 3).toUpperCase()
      : "CUS";
    const idPart = order._id.slice(-4);
    return `${namePart}-${idPart}`;
  };

  // Delete order handler
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(order._id);
    }
  };

  // Payment update handler
  const handlePaymentUpdate = () => {
    updatePaymentStatus(order._id, paymentStatus);
    setEditingPayment(false);
  };

  return (
    <div className="order-card">
      <div className="order-header">
        <p>
          <strong>Order No:</strong> {orderNo}
        </p>
        <p>Order ID: {generateOrderCode(order)}</p>
        <p>Customer: {order?.customerName || "Unknown"}</p>
        <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <div className="order-items">
        {order.items?.map((item, idx) => (
          <p key={idx}>
            {item.name} - {item.quantity} Kg @ ₹{item.rate}/Kg = ₹
            {item.total.toFixed(2)}
          </p>
        ))}
        <h4>Total: ₹{order.total.toFixed(2)}</h4>
      </div>

      <div className="order-actions">
        {editingPayment ? (
          <>
            <div className="payment-edit-group">
              <label>Status:</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="online">Online</option>
              </select>
            </div>

            <div className="payment-edit-group">
              <label>Method:</label>
              <select
                value={order.channel}
                onChange={
                  (e) => (order.channel = e.target.value)
                }
              >
                <option value="Nil">Nil</option>
                <option value="cash">Cash</option>
                <option value="G-pay">G-pay</option>
              </select>
            </div>

            <button
              onClick={() => {
                updatePaymentStatus(order._id, paymentStatus, order.channel);
                setEditingPayment(false);
              }}
            >
              Save
            </button>
            <button onClick={() => setEditingPayment(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p className={`payment-status ${order.payment}`}>
              Payment: {order.payment} ({order.channel || "Nil"})
            </p>
            <button onClick={() => setEditingPayment(true)}>
              Edit Payment
            </button>
          </>
        )}

        <button className="delete-btn" onClick={handleDelete}>
          Delete Order
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
