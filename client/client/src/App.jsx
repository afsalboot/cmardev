import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Dashboard/DashBoard";
import CustomerList from "./pages/Customer List/CustomerList";
import CustomerForm from "./pages/Customer Form/CustomerForm";
import CustomerPage from "./pages/Customer/CustomerPage";
import OrderList from "./pages/Order List/OrderList";
import OrderForm from "./pages/Order Form/OrderForm";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <NavBar />
        
          <Routes>
            <Route path="/" element={<Dashboard />} />

            {/* Customers */}
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/new" element={<CustomerForm />} />
            <Route path="/customers/:id" element={<CustomerPage />} />

            {/* Orders */}
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/new" element={<OrderForm />} />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        
        <Footer />
      </Router>
    </AppProvider>
  );
};

export default App;
