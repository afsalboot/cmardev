import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./navbar.scss";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}>
          ARDev
        </div>

        {/* Hamburger Icon */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/customers"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={closeMenu}
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
