import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/intakes.css";
import Admin from "../assets/adminn.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";

// Icons
import { BiBookAdd } from "react-icons/bi";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

AOS.init();

function IntakeById() {
  //  Going to be used in all pages for authorization
  let { id } = useParams();
  let history = useHistory();
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  const [searchServerError, setSearchServerError] = useState(false);
  const [searched, setSearched] = useState("");
  const [modules, setModules] = useState([]);
  const [students, setStudents] = useState([]);
  const [intake, setIntake] = useState([]);
  const [dataFound, setDataFound] = useState("");

  const [selectedModule, setSelectedModule] = useState();

  // Admin Role validations for access Control

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
        history.push("/login");
      }
    });
  }, [history]);

  useEffect(() => {
    axios.get(`${server}intakes/find/${id}`).then((response) => {
      setIntake(response.data);
    });
    axios.get(`${server}students/byIntake/${id}`).then((response) => {
      setStudents(response.data);
      setDataFound("yes");
    });
    axios.get(`${server}modules/${id}`).then((response) => {
      setModules(response.data);
    });
  }, [id]);

  function redirectModule(id) {
    history.push(`/modules/byId/${id}`);
  }

  function redirectToStudent(id) {
    history.push(`/student/byId/${id}`);
  }

  function redirectToIntake(id) {
    history.push(`/intake/byId/${id}`);
  }
  return (
    <div className="intakes">
      <SideBar />
      {!admin && (
        <div className="no-access">
          <img src={Admin} alt="cannot access"></img>
          <label>You need Administrator rights to access 😢 </label>
        </div>
      )}
      {admin && (
        <div className="intake-main-cont">
          <div className="route">
            <Link to="/intakes">
              <p>Intakes </p>
            </Link>
            <p>/</p>
            <Link>
              <p> {intake.intakeCode}</p>
            </Link>
          </div>
          <h1>Manage Intakes</h1>
          <div className="cont-2-create" data-aos="fade-up">
            {searchServerError && <p id="error-msg">Not Found</p>}
            <div className="search-result">
              <h5>{intake.intakeCode}</h5>
              <div className="result-cont">
                <label>Name:</label>
                <p>{intake.name}</p>
                <label>Intake Code:</label>
                <p>{intake.intakeCode}</p>
                <label>Intake Year:</label>
                <p>{intake.intakeYear}</p>
              </div>
              <h5>Modules under {intake.intakeCode}</h5>
              <div className="search-module-container">
                {modules.map((module, key) => {
                  return (
                    <div
                      className="module-box"
                      onClick={() => {
                        redirectModule(module.id);
                      }}
                    >
                      <label id="module-name">{module.name}</label>
                      <p id="module-code">{module.moduleCode}</p>
                      <p>{module.deanName}</p>
                    </div>
                  );
                })}
                <div
                  className="module-box"
                  onClick={() => {
                    history.push(`/modules/byIntakeId/${intake.id}`);
                  }}
                >
                  <label id="add">Add a new module</label>
                  <BiBookAdd />
                </div>
              </div>
              <h5>Students under {intake.intakeCode}</h5>

              <div className="student-table">
                <div className="header">
                  <label>NAME</label>
                  <label>STUDENT ID</label>
                  <label>EMAIL</label>
                  <label>PHONE NUMBER</label>
                  <label>GENDER</label>
                  <label>INTAKE</label>
                  <label>JOINED DATE</label>
                </div>
                <div className="scrolling">
                  {!students && <p>No data</p>}
                  {students.map((student, key) => {
                    return (
                      <div
                        className="student-row"
                        onClick={() => {
                          redirectToStudent(student.id);
                        }}
                      >
                        <p id="student-name">{student.name}</p>
                        <p id="student-id">{student.studentId}</p>
                        <p>{student.email}</p>
                        <p id="student-num">{student.phoneNum}</p>
                        <p>{student.gender}</p>
                        <p id="student-intake">{student.Intake}</p>
                        <p>{student.createdAt}</p>
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

export default IntakeById;
