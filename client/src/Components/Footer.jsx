// Footer.js
import React from "react";
import { Link } from "react-router-dom";



function Footer() {
  return (
    <footer id="expensio-footer" className="section bg-dark text-white py-5">
      <div className="container text-center py-4">
        <h2 className="heading1 mb-3">EXPENSIO</h2>
        <p className="footerPara mb-2">
          Expensio helps you control spending, track expenses and set budget with an intuitive financial dashboard
        </p>

        <div className="d-flex justify-content-center flex-wrap gap-3 mb-2">
          <Link to="/" className="list2 text-white text-decoration-none">Home</Link>
          <Link to="/services" className="list2 text-white text-decoration-none">Services</Link>
          <Link to="/about" className="list2 text-white text-decoration-none">About Us</Link>
          <Link to="/contact" className="list2 text-white text-decoration-none">Contact Us</Link>
        </div>

        <hr style={{ borderTop: "2px solid white" }} />

        <p className="mt-3">
          Use of this website constitutes acceptance of the site{" "}
          <Link to="/terms-conditions" className="text-primary text-decoration-underline fw-semibold">Terms of Service</Link>
        </p>
        <p className="mb-0">&#169; 2025 Expensio – All rights reserved</p>
      </div>
    </footer>
  );
}


export default Footer;
