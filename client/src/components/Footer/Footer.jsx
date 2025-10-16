import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} <span className="brand">ARDev</span>.  
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
