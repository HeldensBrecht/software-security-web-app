import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer container-fluid text-muted small">
      <div
        className="d-md-flex flex-md-equal w-100 mt-4 mt-md-5 pt-md-5 pb-3 px-md-3"
        style={{
          border: "1px solid rgba(0, 0, 0, 0.09)",
          borderBottom: "none",
        }}
      >
        <div className="mr-md-3 w-100">
          <h6>Address</h6>
          <p className="mb-0">Cardijnstraat 12</p>
          <p className="mb-0">1980 Eppegem</p>
          <p className="mb-0">Belgium</p>
        </div>
        <div style={{ width: "35%" }}></div>
        <div className="mr-md-3 w-100">
          <h6>Contact</h6>
          <p className="mb-0">john.doe@example.com</p>
          <p className="mb-0">+32 493 83 85 663</p>
        </div>
        <div style={{ width: "35%" }}></div>
        <div className="mr-md-3 w-100">
          <h6>Follow Us</h6>
          <p className="mb-0">Instagram</p>
          <p className="mb-0">Twitter</p>
          <p className="mb-0">Facebook</p>
        </div>
        <div style={{ width: "35%" }}></div>
        <div className="mr-md-3 w-100">
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
        className="d-md-flex flex-md-equal w-100 pb-md-4 pt-md-4 px-md-3"
        style={{
          borderLeft: "1px solid rgba(0, 0, 0, 0.09)",
          borderRight: "1px solid rgba(0, 0, 0, 0.09)",
        }}
      >
        <p className="mb-0 mr-auto">&copy;2020 - EWJ</p>
        <div className="ml-auto d-sm-flex">
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
