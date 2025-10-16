import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from 'react-router-dom'
import './customerform.scss'

const CustomerForm = () => {
  const { addCustomer, loading, error } = useContext(AppContext);
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = { name, phone, address };
    await addCustomer(customerData);

    navigate('/customers')
  };

  return (
    <div className="customer-form">
      <h2>Add Customer</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;

