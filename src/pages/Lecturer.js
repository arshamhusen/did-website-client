import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/intakes.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/moduleById.css";
import Profile from "../assets/guy.png";
import "../styles/modules.css";
import "../styles/lecturers.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../App.css";

// Icons
import { AiOutlineUserAdd } from "react-icons/ai";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

AOS.init();

function Lecturers() {
  // Admin Role validations for access Control
  let history = useHistory();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  const [query, setQuery] = useState("");
  const [searchServerError, setSearchServerError] = useState(false);
  const [resultsFound, setResultsFound] = useState(false);
  const [searched, setSearched] = useState("");
  const [lecturerTableData, setLecturerTableData] = useState([]);

  useEffect(() => {
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
      } else {
        alert("You need to login first");
        history.push("/login");
      }
    });
  }, [history]);

  // Render all the modules from the api
  useEffect(() => {
    axios.get(`${server}lecturer`).then((response) => {
      setLecturerTableData(response.data);
    });
  }, []);

  function searchLecturer() {
    const data = { search: query.trim() };
    axios.post(`${server}modules/search`, data).then((response) => {
      console.log(response);
      if (response.data.err) {
        setSearchServerError(!searchServerError);
      } else {
        setSearchServerError(searchServerError);
        setResultsFound(!resultsFound);
        setSearched(response.data);
        getLecturers();
      }
    });
  }

  function getLecturers() {
    const id = searched.id;
    axios.get(`${server}lecturer/findAll/byModule`, id).then((response) => {
      console.log(response.data);
    });
  }

  function redirectlecturer(id) {
    history.push(`/lecturer/byId/${id}`);
  }

  return (
    <div className="intakes">
      <SideBar />
      {!admin && (
        <div className="no-access">
          <img alt="cannot access"></img>
          <label>You need Administrator rights to access 😢 </label>
        </div>
      )}
      {admin && (
        <div className="intake-main-cont">
          <h1> Manage Lecturers</h1>
          <div className="cont-2-create" data-aos="fade-up">
            <h6>Search for a Lecturer</h6>
            <div className="search-cont">
              <input
                placeholder="search by employee ID"
                value={query}
                className="search-bar"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button id="btn-search" onClick={searchLecturer}>
                Search
              </button>
            </div>
            {searchServerError && <p id="error-msg">Not Found</p>}
            {resultsFound && (
              <div className="search-result">
                <h5>
                  {searched.moduleCode} - {searched.name}
                </h5>
                <div className="result-cont">
                  <label>Name:</label>
                  <p>{searched.name}</p>
                  <label>Code:</label>
                  <p>{searched.moduleCode}</p>
                  <label>Module Leader:</label>
                  <p>{searched.deanName}</p>
                </div>
                <h5>Lectures under - {searched.moduleCode} </h5>
                <p>Expand All</p>
              </div>
            )}
          </div>

          <div className="module-cont" data-aos="fade-up">
            <div className="module-sub-cont">
              <h6>List of all Lecturers</h6>
              <div className="module-table">
                <div className="header-module">
                  <p id="lecturer-id-h">ID</p>
                  <p id="lecturer-name-h">NAME</p>
                  <p id="lecturer-eid-h">EMPLOYEE ID</p>
                  <p id="lecturer-email-h">EMAIL</p>
                  <p id="lecturer-date-h">CREATED AT</p>
                </div>
                <div className="scrolling-intake">
                  {lecturerTableData.map((lecturer, key) => {
                    return (
                      <div
                        className="lecturer-row"
                        onClick={() => {
                          redirectlecturer(lecturer.id);
                        }}
                      >
                        <p id="lecturer-id-d">{lecturer.id}</p>
                        <p id="lecturer-name-d">{lecturer.name}</p>
                        <p id="lecturer-eid-d">{lecturer.username}</p>
                        <p id="lecturer-email-d">{lecturer.email}</p>
                        <p id="lecturer-date-d">{lecturer.createdAt}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lecturers;
