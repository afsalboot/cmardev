import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CustomerCard from "../../components/Customer Card/CustomerCard";
import './customerlist.scss'

const CustomerList = () => {
  const navigate = useNavigate();
  const { customers, fetchCustomers, loading, error } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Fetch customers only if not already loaded
  useEffect(() => {
    if (!customers || customers.length === 0) {
      fetchCustomers();
    }
  }, []);

  //Filter out invalid entries
  let filteredCustomers = customers?.filter((c) => c != null) || [];

  // Search
  if (search) {
    filteredCustomers = filteredCustomers.filter(
      (c) =>
        (c.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (c.phone || "").includes(search)
    );
  }

  // Sort
  filteredCustomers.sort((a, b) => {
    if (sortBy === "name") {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return nameA.localeCompare(nameB);
    }
    if (sortBy === "newest") {
      const dateA = a.createdAt ? new Date(a.createdAt) : 0;
      const dateB = b.createdAt ? new Date(b.createdAt) : 0;
      return dateB - dateA;
    }
    return 0;
  });

  return (
    <div className="customer-list-page">
      <div className="header">
        <h1>Customers</h1>
        <button
          className="add-customer-btn"
          onClick={() => navigate("/customers/new")}
        >
          + Add Customer
        </button>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="newest">Sort by Newest</option>
        </select>
      </div>

      <div className="customer-cards">
        {loading ? (
          <p>Loading customers...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : filteredCustomers.length ? (
          filteredCustomers.map((customer) => (
            <CustomerCard key={customer._id} customer={customer} />
          ))
        ) : (
          <p>No customers found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerList;