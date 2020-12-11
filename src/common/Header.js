import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Header = (props) => {
  const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0();
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
              to="/products/vinyl"
              exact
              className="nav-link"
              activeClassName="active"
            >
              Vinyl
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/products/apparel"
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
          {(isLoading || isAuthenticated) && (
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
              onClick={
                isLoading || isAuthenticated
                  ? () => logout()
                  : () => loginWithRedirect()
              }
              style={{ backgroundColor: "inherit", border: "inherit" }}
              className="nav-link"
            >
              {isLoading || isAuthenticated ? "Log Out" : "My Account"}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
