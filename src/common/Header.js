import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ auth }) => {
  //   const activeStyle = { color: "white", backgroundColor: "black" };
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <NavLink to="/" exact className="navbar-brand">
        Home
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
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
          <li className="nav-item">
            <button
              onClick={auth.isAuthenticated() ? auth.logout : auth.login}
              style={{ backgroundColor: "inherit", border: "inherit" }}
              className="nav-link"
            >
              {auth.isAuthenticated() ? "Log Out" : "Log In"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
