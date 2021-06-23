import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "../styles/menu.css";
import { ReactComponent as Icon } from "../assets/check.svg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi";
import { FaUserTie, FaUserEdit } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { BiHelpCircle } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import axios from "axios";
import "../App.css";
// ..
AOS.init();
function Menu() {
  let history = useHistory();
  const [notifications, setNotifications] = useState([]);
  const [loggedIn, setLoggedIn] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/lecturer/login").then((response) => {
      setUserId(response.data.userId);
      setUserName(response.data.userName);
      if (response.data.loggedIn === true) {
        console.log("oops");
      } else {
        history.push("/login");
      }
    });
    axios.get("http://localhost:3001/lecturer/login").then((response) => {
      setUserId(response.data.userId);
      setUserName(response.data.userName);
      // yearGenerator();
      if (response.data.loggedIn === true) {
        console.log("hey");
        if (response.data.userName === "Admin") {
          setAdmin(response.data.userName);
        } else {
          console.log("not admin");
        }
      } else {
        alert("You need to login first");
        history.push("/login");
      }
    });
  }, [history]);

  const [admin, setAdmin] = useState("");

  const logout = () => {
    axios.get("http://localhost:3001/lecturer/logout").then((Response) => {
      const status = Response.data.loggedIn;
      setNotifications(status);
      alert("Successfully logged out!");
      history.push("/login");
    });
  };

  return (
    <div>
      <MenuBar>
        <MenuItem icon={<IoMdNotificationsOutline />}>
          <div className={admin ? "drop-down-1" : "drop-down-1-l"}>
            {notifications && <p>No notifications</p>}
            <p>{notifications}</p>
            <button
              onClick={() => {
                setAdmin("Admin");
              }}
            >
              Hello
            </button>
          </div>
        </MenuItem>
        <MenuItem icon={<FiSettings />} />
        <MenuItem icon={<FaUserTie />}>
          <div className={admin ? "drop-down" : "drop-down-l"}>
            <div className={admin ? "drop-down-item" : "drop-down-item-l"}>
              <button
                onClick={() => {
                  history.push("/profile");
                }}
              >
                <FaUserEdit />
                <label>Edit Account</label>
              </button>
            </div>
            <div className={admin ? "drop-down-item" : "drop-down-item-l"}>
              <button
                onClick={() => {
                  history.push("/help");
                }}
              >
                <BiHelpCircle />
                <label>Help Center</label>
              </button>
            </div>
            <div className={admin ? "drop-down-item" : "drop-down-item-l"}>
              <button onClick={logout}>
                <IoMdLogOut />
                <label>Logout</label>
              </button>
            </div>
          </div>
        </MenuItem>
      </MenuBar>
    </div>
  );
}

function MenuBar(props) {
  return (
    <nav className="menu-bar">
      <ul className="menu-nav"> {props.children}</ul>
    </nav>
  );
}

function MenuItem(props) {
  let history = useHistory();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    axios.get("http://localhost:3001/lecturer/login").then((response) => {
      setUserId(response.data.userId);
      setUserName(response.data.userName);
      if (response.data.loggedIn === true) {
        console.log("oops");
      } else {
        history.push("/login");
      }
    });
    axios.get("http://localhost:3001/lecturer/login").then((response) => {
      setUserId(response.data.userId);
      setUserName(response.data.userName);
      // yearGenerator();
      if (response.data.loggedIn === true) {
        console.log("hey");
        if (response.data.userName === "Admin") {
          setAdmin(response.data.userName);
        } else {
          console.log("not admin");
        }
      } else {
        alert("You need to login first");
        history.push("/login");
      }
    });
  }, [history]);

  const [admin, setAdmin] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className="menu-item">
      <a href="#!" className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        {props.icon}
      </a>
      {isOpen && props.children}
    </li>
  );
}

export default Menu;
