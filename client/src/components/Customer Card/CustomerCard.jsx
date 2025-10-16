import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import './customercard.scss'

const CustomerCard = ({ customer }) => {
  const navigate = useNavigate();
  const { deleteCustomer } = useContext(AppContext);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      deleteCustomer(customer._id);
    }
  };

  const handleView = () => {
    navigate(`/customers/${customer._id}`);
  };

  return (
    <div className="customer-card">
      <div className="info">
        <h3>{customer.name}</h3>
        <p>Phone: {customer.phone}</p>
        <p>Address: {customer.address || "-"}</p>
      </div>
      <div className="actions">
        <button className="view-btn" onClick={handleView}>
          View
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CustomerCard;
