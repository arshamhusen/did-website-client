import React from "react";
import "../styles/navStyle.css";
import { Link, useEffect, useHistory } from "react-router-dom";
import { FaSchool } from "react-icons/fa";
import logo from "../assets/logoo.svg";
import { BiUser } from "react-icons/bi";
import axios from "axios";
const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

function MainNavBar() {
  let history = useHistory();
  const logout = () => {
    axios.get(`${server}/lecturer/logout`).then((Response) => {
      alert("Successfully logged out!");
      history.push("/login");
    });
  };

  return (
    <div>
      <header className="header">
        <input type="checkbox" name="" id="check" />
        <div className="hamburger-menu-container">
          <div className="hamburger-menu">
            <div></div>
          </div>
        </div>
        <div class="logo-container">
          <Link to="/">
            <img id="new-logo" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="nav-btn">
          <div className="nav-links">
            <ul>
              <li className="nav-link">
                <Link to="/lecturerHome">
                  <FaSchool /> Home
                </Link>
              </li>
              {/* Second Link */}
              <li className="nav-link">
                <Link to="/myClasses">
                  <FaSchool /> Classes
                </Link>
                <div className="dropdown">
                  <ul>
                    <li className="dropdownlink">
                      <Link to="/myClasses">Create Class</Link>
                    </li>
                    <li className="dropdownlink">
                      <Link to="/myClasses">Manage Class</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-link">
                <Link to="/myClasses">
                  <FaSchool /> Attendance
                </Link>
                <div className="dropdown">
                  <ul>
                    <li className="dropdownlink">
                      <Link to="/myClasses">Create Class</Link>
                    </li>
                    <li className="dropdownlink">
                      <Link to="/myClasses">Manage Class</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="log-sign">
          <Link className="side-btn" to="/myClasses">
            <BiUser />
            Link
          </Link>
          <button onClick={logout}>Logout</button>
          <BiUser />
        </div>
      </header>
    </div>
  );
}

export default MainNavBar;
