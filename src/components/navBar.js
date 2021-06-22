import React from "react";
import logo from "../assets/logos.svg";
import { Link } from "react-router-dom";
import "../App.css";
function navBar() {
  return (
    <div>
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="sign-container">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default navBar;
