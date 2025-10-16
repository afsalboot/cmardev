import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});


// CUSTOMER APIs

const getCustomers = async (query = "") => {
  try {
    const res = await api.get(`/customers/get-customers`, {
      params: { q: query },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getCustomerById = async (id) => {
  try {
    const res = await api.get(`/customers/get-customer/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createCustomer = async (payload) => {
  try {
    const res = await api.post(`/customers/add-customer`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateCustomer = async (id, payload) => {
  try {
    const res = await api.put(`/customers/update-customer/${id}`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteCustomer = async (id) => {
  try {
    const res = await api.delete(`/customers/delete-customer/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


// ORDER APIs

const getOrders = async (params = {}) => {
  try {
    const res = await api.get(`/orders/get-orders`, { params });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getOrderById = async (id) => {
  try {
    const res = await api.get(`/orders/get-single-order/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const createOrder = async (payload) => {
  try {
    const res = await api.post(`/orders/create-order`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateOrder = async (id, payload) => {
  try {
    const res = await api.put(`/orders/update-order/${id}`, payload);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteOrder = async (id) => {
  try {
    const res = await api.delete(`/orders/delete-order/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updatePaymentStatus = async (id, payment, channel) => {
  try {
    const res = await api.put(`/orders/${id}/payment`, { payment, channel });
    return res.data;
  } catch (err) {
    console.error("Error in updatePaymentStatus:", err);
    throw err;
  }
};



export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  updatePaymentStatus,
};
