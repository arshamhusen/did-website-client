import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/intakes.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/moduleById.css";
import "../styles/students.css";
import "../styles/modules.css";
import "../App.css";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

AOS.init();

function Students() {
  // Admin Role validations for access Control
  let history = useHistory();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  const [query, setQuery] = useState("");
  const [searchServerError, setSearchServerError] = useState(false);
  const [resultsFound, setResultsFound] = useState(false);
  const [searched, setSearched] = useState("");
  const [studentTableData, setStudentTableData] = useState([]);

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
    axios.get(`${server}students`).then((response) => {
      console.log(response.data);
      setStudentTableData(response.data);
    });
  }, []);

  function searchModule() {
    const data = { search: query.trim() };
    axios.post(`${server}students/byId/:id`, data).then((response) => {
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

  function redirectstudents(id) {
    history.push(`/student/byId/${id}`);
  }

  return (
    <div className="intakes">
      <SideBar />
      <div className="intake-main-cont">
        <h1> Manage Students</h1>
        <div className="cont-2-create" data-aos="fade-up">
          <h6>Search for a Student</h6>
          <div className="search-cont">
            <input
              placeholder="search by student ID"
              value={query}
              className="search-bar"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button id="btn-search" onClick={searchModule}>
              Search
            </button>
          </div>
          {searchServerError && <p id="error-msg">Not Found</p>}
          {resultsFound && <div className="search-result"></div>}
        </div>

        <div className="module-cont" data-aos="fade-up">
          <div className="module-sub-cont">
            <h6>List of all Students</h6>
            <div className="module-table">
              <div className="header-module">
                <p id="students-id-h">ID</p>
                <p id="students-name-h">NAME</p>
                <p id="students-sid-h">STUDENT ID</p>
                <p id="students-email-h">EMAIL</p>
                <p id="students-phone-h">CONTACT</p>
                <p id="students-intake-h">INTAKE</p>
                <p id="students-date-h">JOINED DATE</p>
              </div>
              <div className="scrolling-intake">
                {studentTableData.map((students, key) => {
                  return (
                    <div
                      className="module-row"
                      onClick={() => {
                        redirectstudents(students.id);
                      }}
                    >
                      <p id="students-id-d">{students.id}</p>
                      <p id="students-name-d">{students.name}</p>
                      <p id="students-sid-d">{students.studentId}</p>
                      <p id="students-email-d">{students.email}</p>
                      <p id="students-phone-d">{students.phoneNum}</p>
                      <p id="students-intake-d">{students.Intake}</p>
                      <p id="students-date-d">{students.createdAt}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;
