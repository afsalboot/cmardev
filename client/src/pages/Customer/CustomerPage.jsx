import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderCard from "../../components/Order Card/OrderCard";
import { AppContext } from "../../context/AppContext";
import "./customerpage.scss";

const CustomerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { customers, fetchCustomers, orders, fetchOrders } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchCustomers();
    fetchOrders();
  }, []);

  const customer = customers.find((c) => c._id === id);
  if (!customer) return <p>Loading customer...</p>;

  // Filter orders for this customer
  let customerOrders = orders.filter(
    (o) => o.customerId?._id === id || o.customerId === id
  );

  // Search
  if (search) {
    customerOrders = customerOrders.filter((o) =>
      o.items.some((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  // Sort
  customerOrders.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "paid":
        return a.payment === "paid" ? -1 : 1;
      case "pending":
        return a.payment === "pending" ? -1 : 1;
      default:
        return 0;
    }
  });

  return (
    <div className="customer-page">
      <div className="header">
        <h1>{customer.name}</h1>
        <button
          className="add-order-btn"
          onClick={() => navigate("/orders/new", { state: { customerId: id } })}
        >
          + Add Order
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="orders-list">
        {customerOrders.length ? (
          customerOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;
