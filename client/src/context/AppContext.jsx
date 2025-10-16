import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [customers, setCustomers] = useState(
    JSON.parse(localStorage.getItem("customers")) || []
  );
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =============== HELPERS ===============
  const saveToLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // =============== CUSTOMERS ===============
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await api.getCustomers();
      setCustomers(data);
      saveToLocal("customers", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (payload) => {
    setLoading(true);
    try {
      const data = await api.createCustomer(payload);
      const updated = [...customers, data];
      setCustomers(updated);
      saveToLocal("customers", updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id, payload) => {
    setLoading(true);
    try {
      const data = await api.updateCustomer(id, payload);
      const updated = customers.map((c) => (c._id === id ? data : c));
      setCustomers(updated);
      saveToLocal("customers", updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    setLoading(true);
    try {
      await api.deleteCustomer(id);
      const updated = customers.filter((c) => c._id !== id);
      setCustomers(updated);
      saveToLocal("customers", updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =============== ORDERS ===============
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await api.getOrders();
      setOrders(data);
      saveToLocal("orders", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addOrder = async (payload) => {
    setLoading(true);
    try {
      const data = await api.createOrder(payload);
      const updated = [...orders, data];
      setOrders(updated);
      saveToLocal("orders", updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id, payload) => {
    setLoading(true);
    try {
      const data = await api.updateOrder(id, payload);
      const updated = orders.map((o) => (o._id === id ? data : o));
      setOrders(updated);
      saveToLocal("orders", updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    setLoading(true);
    try {
      await api.deleteOrder(id);
      const updated = orders.filter((o) => o._id !== id);
      setOrders(updated);
      saveToLocal("orders", updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentStatus = async (orderId, payment, channel) => {
    setLoading(true);
    try {
      const updatedOrder = await api.updatePaymentStatus(
        orderId,
        payment,
        channel
      );

      const updatedOrders = orders.map((o) =>
        o._id === orderId ? updatedOrder : o
      );

      setOrders(updatedOrders);
      saveToLocal("orders", updatedOrders);
    } catch (error) {
      console.error("Error updating payment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load from API if no data in localStorage
  useEffect(() => {
    if (!customers.length) fetchCustomers();
    if (!orders.length) fetchOrders();
  }, []);

  return (
    <AppContext.Provider
      value={{
        customers,
        orders,
        loading,
        error,
        fetchCustomers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        fetchOrders,
        addOrder,
        updateOrder,
        deleteOrder,
        updatePaymentStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
