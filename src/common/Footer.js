import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer container-fluid text-muted small px-0 px-md-3">
      <div
        className="row mx-0 mt-4 mt-md-5 pt-3 pt-md-5 pb-3 px-3"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.09)",
          borderBottom: "none",
        }}
      >
        <div className="px-0 mb-2 mb-md-0 col-6 col-md-2">
          <h6>Address</h6>
          <p className="mb-0">Cardijnstraat 192A</p>
          <p className="mb-0">1980 Eppegem</p>
          <p className="mb-0">Belgium</p>
        </div>
        <div className="d-none d-md-block col-0 col-md-1"></div>
        <div className="px-0 mb-2 mb-md-0 col-6 col-md-2">
          <h6>Contact</h6>
          <p className="mb-0">john.doe@example.com</p>
          <p className="mb-0">+32 493 83 85 663</p>
        </div>
        <div className="d-none d-md-block col-0 col-md-1"></div>
        <div className="d-none d-md-block col-0 col-md-1"></div>
        <div className="px-0 mb-md-0 col-6 col-md-2">
          <h6>Follow Us</h6>
          <p className="mb-0">Instagram</p>
          <p className="mb-0">Twitter</p>
          <p className="mb-0">Facebook</p>
        </div>
        <div className="d-none d-md-block col-0 col-md-1"></div>
        <div className="px-0 mb-md-0 col-6 col-md-2">
          <h6>Info</h6>
          <Link to="/privacy" className="mb-0 text-muted">
            Privacy Statement
          </Link>
          <Link to="/about" className="d-block mb-0 text-muted">
            About
          </Link>
        </div>
      </div>
      <div
        className="row mx-0 pb-1 pb-md-2 pt-md-4 px-3"
        style={{
          borderLeft: "1px solid rgba(0, 0, 0, 0.09)",
          borderRight: "1px solid rgba(0, 0, 0, 0.09)",
        }}
      >
        <p className="mb-0 mr-auto">&copy;2021 - EWJ</p>
        <div className="ml-auto d-flex">
          <p className="mb-0">PayPal</p>
          <p className="mb-0 ml-1">VISA</p>
          <p className="mb-0 ml-1">MasterCard</p>
          <p className="mb-0 ml-1">Bancontact</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
