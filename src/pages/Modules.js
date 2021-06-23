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
import "../App.css";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

AOS.init();

function Modules() {
  // Admin Role validations for access Control
  let history = useHistory();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  const [query, setQuery] = useState("");
  const [searchServerError, setSearchServerError] = useState(false);
  const [resultsFound, setResultsFound] = useState(false);
  const [searched, setSearched] = useState("");
  const [lecturerData, setLecturerData] = useState([]);
  const [moduleTableData, setModuleTableData] = useState([]);

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
    axios.get(`${server}modules`).then((response) => {
      setModuleTableData(response.data);
    });
  }, []);

  function searchModule() {
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

  function redirectModule(id) {
    history.push(`/modules/byId/${id}`);
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
          <h1> Manage Modules</h1>
          <div className="cont-2-create" data-aos="fade-up">
            <h6>Search for a Module</h6>
            <div className="search-cont">
              <input
                placeholder="search by module code"
                value={query}
                className="search-bar"
                onChange={(e) => setQuery(e.target.value)}
              />
              <button id="btn-search" onClick={searchModule}>
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
                <div className="module-lect-cont">
                  {lecturerData.map((data, key) => {
                    return (
                      <div
                        className="lecturer-box"
                        onClick={() => {
                          history.push(`/lecturer/byId/${data.id}`);
                        }}
                      >
                        <img src={Profile} alt="lecturer"></img>
                        <label>{data.name}</label>
                        <p>{data.username}</p>
                        <p>{data.email}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="module-cont" data-aos="fade-up">
            <div className="module-sub-cont">
              <h6>List of all Modules</h6>
              <div className="module-table">
                <div className="header-module">
                  <p id="module-name-h">NAME</p>
                  <p id="module-code-h">MODULE CODE</p>
                  <p id="module-dean-h">MODULE LEADER</p>
                  <p id="module-date-h">CREATED AT</p>
                </div>
                <div className="scrolling-intake">
                  {moduleTableData.map((module, key) => {
                    return (
                      <div
                        className="module-row"
                        onClick={() => {
                          redirectModule(module.id);
                        }}
                      >
                        <p id="module-name-d">{module.name}</p>
                        <p id="module-code-d">{module.moduleCode}</p>
                        <p id="module-dean-d">{module.deanName}</p>
                        <p id="module-date-d">{module.createdAt}</p>
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

export default Modules;
