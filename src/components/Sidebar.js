import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Menu from "../components/Menu";
import Profile from "../assets/guy.png";
// Icons and Styling
import "../styles/sideBar.css";
import { AiOutlineIdcard, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { HiAcademicCap } from "react-icons/hi";
import { GoDashboard } from "react-icons/go";
import logo from "../assets/Group 76.svg";
import { FaUniversity, FaClipboardList } from "react-icons/fa";
import { BiCurrentLocation, BiHome, BiHomeCircle } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";
const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

const Navbar = ({ show }) => {
  //  Going to be used in all pages for authorization
  let history = useHistory();
  const [loggedIn, setLoggedIn] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    axios.get(`${server}lecturer/login`).then((response) => {
      setUserId(response.data.userId);
      setUserName(response.data.userName);
      if (response.data.loggedIn === true) {
        console.log("oops");
      } else {
        history.push("/login");
      }
    });
    axios.get(`${server}lecturer/login`).then((response) => {
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
      }
    });
  }, [history]);

  return (
    <div className="navbar-container">
      <div className="top-bar-cont">
        <div className="location-bar">
          <BiCurrentLocation />
          <h3>Asia Pacific University</h3>
        </div>
        <div className="menu-cont">
          <img src={Profile} alt="profile" />
          <label id="greet">Welcome {userName}!</label>
          <Menu />
        </div>
      </div>
      <div className="nav-bar">
        <div className="img-container">
          <Link to="/home">
            <img src={logo} alt="logo" className="logo"></img>
          </Link>
          <label>Digital Identity Management System</label>
        </div>
        {/* Nav items  for lecturers*/}
        {/* {!admin && (
          <div>
            <>
              <ul>
                <li>
                  <Link
                    id="side-nav-items"
                    to="/lecturerHome"
                    className=" active "
                  >
                    <div className={admin ? "sidebar-nav" : "sidebar-nav-l"}>
                      <BiHomeCircle />
                      <h4>Home</h4>
                    </div>
                  </Link>
                  <Link
                    id="side-nav-items"
                    to="/myClasses"
                    className=" active "
                  >
                    <div className={admin ? "sidebar-nav" : "sidebar-nav-l"}>
                      <GiTeacher />
                      <h4>My Classes</h4>
                    </div>
                  </Link>
                  <Link id="side-nav-items" to="/students" className=" active ">
                    <div className={admin ? "sidebar-nav" : "sidebar-nav-l"}>
                      <AiOutlineUsergroupAdd />
                      <h4>Attendances</h4>
                    </div>
                  </Link>
                </li>
              </ul>
            </>
          </div>
        )} */}
        {/* Nav items  for Admin*/}
        {admin && (
          <>
            <ul>
              <li>
                <Link id="side-nav-items" to="/home" className=" active ">
                  <div className="sidebar-nav">
                    <GoDashboard />
                    <h4>Dashboard</h4>
                  </div>
                </Link>
                <Link id="side-nav-items" to="/intakes" className=" active ">
                  <div className="sidebar-nav">
                    <HiAcademicCap />
                    <h4>Intakes</h4>
                  </div>
                </Link>
                <Link id="side-nav-items" to="/modules" className=" active ">
                  <div className="sidebar-nav">
                    <BsBook />
                    <h4>Modules</h4>
                  </div>
                </Link>
                <Link id="side-nav-items" to="/lecturers" className=" active ">
                  <div className="sidebar-nav">
                    <GiTeacher />
                    <h4>Lecturers</h4>
                  </div>
                </Link>
                <Link id="side-nav-items" to="/students" className=" active ">
                  <div className="sidebar-nav">
                    <AiOutlineUsergroupAdd />
                    <h4>Students</h4>
                  </div>
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
