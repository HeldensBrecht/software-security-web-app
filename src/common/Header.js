import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ auth }) => {
  //   const activeStyle = { color: "white", backgroundColor: "black" };
  return (
    <nav
      className="navbar fixed-top navbar-expand-sm m-md-3 px-md-3 py-md-2 navbar-light bg-white"
      style={{ border: "1px solid rgba(0,0,0,.09)" }}
    >
      <NavLink to="/" exact className="navbar-brand">
        E W J
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" activeClassName="not">
              Black Friday
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/vinyl"
              exact
              className="nav-link"
              activeClassName="active"
            >
              Vinyl
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/apparel"
              exact
              className="nav-link"
              activeClassName="active"
            >
              Apparel
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              exact
              className="nav-link"
              activeClassName="active"
            >
              About Us
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          {auth.isAuthenticated() && (
            <li className="nav-item">
              <NavLink
                to="/profile"
                exact
                className="nav-link"
                activeClassName="active"
              >
                Profile
              </NavLink>
            </li>
          )}
          <li className="nav-item">
            <button
              onClick={auth.isAuthenticated() ? auth.logout : auth.login}
              style={{ backgroundColor: "inherit", border: "inherit" }}
              className="nav-link"
            >
              {auth.isAuthenticated() ? "Log Out" : "My Account"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
