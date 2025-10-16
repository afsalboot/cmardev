import { useContext, useEffect, useState } from "react";
import OrderCard from "../../components/Order Card/OrderCard";
import { AppContext } from "../../context/AppContext";
import "./orderlist.scss";

const OrderList = () => {
  const { orders, loading, error, fetchOrders } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchOrders();
  }, []);

  let filteredOrders = [...orders];

  // Search
  if (search) {
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        order.customerPhone?.includes(search)
    );
  }

  // Sort
  filteredOrders.sort((a, b) => {
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
    <div className="order-list-page">
      <div className="header">
        <h1>Orders</h1>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by customer name or phone..."
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
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : filteredOrders.length ? (
          filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;
