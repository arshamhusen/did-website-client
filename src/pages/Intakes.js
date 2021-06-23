import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../styles/intakes.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";
// Icons
import { BiBookAdd } from "react-icons/bi";
const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

AOS.init();

function Intakes() {
  //  Going to be used in all pages for authorization
  let history = useHistory();
  const [tableData, setTableData] = useState([]);
  const [query, setQuery] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  const [years, setYears] = useState([
    { intakeYear: "", value: "" },
    { intakeYear: "2021", value: "2021" },
    { intakeYear: "2020", value: "2020" },
    { intakeYear: "2019", value: "2019" },
    { intakeYear: "2018", value: "2018" },
    { intakeYear: "2017", value: "2017" },
    { intakeYear: "2016", value: "2016" },
  ]);
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [searchServerError, setSearchServerError] = useState(false);
  const [resultsFound, setResultsFound] = useState(false);
  const [searched, setSearched] = useState("");
  const [modules, setModules] = useState([]);
  const [students, setStudents] = useState([]);

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

  // To populate table data from the backend
  useEffect(() => {
    axios.get(`${server}intakes/findAll`).then((response) => {
      setTableData(response.data);
    });
    setSelectedModule();
    const dayArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    var d = new Date();
    console.log(dayArray[d.getDay()]);
  }, [selectedModule]);

  const handleInitialValues = {
    name: "",
    intakeCode: "",
    intakeYear: "",
  };

  const handleValidationSchema = Yup.object().shape({
    name: Yup.string().required(),
    intakeCode: Yup.string().required(),
    intakeYear: Yup.string()
      .required("Please Select a year!")
      .min(4, "Please Enter a valid date"),
  });

  const handleOnSubmit = (data) => {
    axios.post(`${server}intakes/create`, data).then((response) => {
      setServerMessage(response.data.msg);
      setServerError(response.data.err);
    });

    axios.get(`${server}intakes/findAll`).then((response) => {
      setTableData(response.data);
    });
  };

  function searchIntake() {
    const data = { search: query.trim() };
    axios.post(`${server}intakes/search`, data).then((response) => {
      if (response.data.err) {
        setSearchServerError(!searchServerError);
      } else {
        setSearchServerError(searchServerError);
        setModules([]);
        setResultsFound(!resultsFound);
        setSearched(response.data);
      }
    });
  }

  function getModules() {
    axios.get(`${server}modules/${searched.id}`).then((response) => {
      setModules(response.data);
    });
  }

  function getStudents() {
    axios.get(`${server}students/byIntake/${searched.id}`).then((response) => {
      console.log(response);
      setStudents(response.data);
    });
  }

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
      <div className="intake-main-cont">
        <h1>Manage Intakes</h1>
        <div className="cont-2-create" data-aos="fade-up">
          <h6>Search for an Intake</h6>
          <div className="search-cont">
            <input
              value={query}
              className="search-bar"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button id="btn-search" onClick={searchIntake}>
              Search
            </button>
          </div>
          {searchServerError && <p id="error-msg">Not Found</p>}
          {resultsFound && (
            <div className="search-result">
              <h5>{searched.intakeCode}</h5>
              <div className="result-cont">
                <label>Name:</label>
                <p>{searched.name}</p>
                <label>Intake Code:</label>
                <p>{searched.intakeCode}</p>
                <label>Intake Year:</label>
                <p>{searched.intakeYear}</p>
              </div>
              <h5>Modules under {searched.intakeCode}</h5>
              <p onClick={getModules}>Expand All</p>
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
                    history.push(`/modules/byIntakeId/${searched.id}`);
                  }}
                >
                  <label id="add">Add a new module</label>
                  <BiBookAdd />
                </div>
              </div>
              <h5>Students under {searched.intakeCode}</h5>
              <p onClick={getStudents}>Expand All</p>
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
          )}
        </div>
        <div className="intake-cont">
          <div className="cont-1-create" data-aos="fade-up">
            <h6>Create An Intake</h6>
            <div className="formik-container">
              <Formik
                initialValues={handleInitialValues}
                validationSchema={handleValidationSchema}
                onSubmit={handleOnSubmit}
              >
                <Form>
                  <label>Intake Name:</label>
                  <Field
                    id="intake-name"
                    name="name"
                    placeholder="Ex: Information System Security"
                  ></Field>
                  <ErrorMessage name="name" id="error" component="span" />
                  <label>Intake Code:</label>
                  <Field
                    id="intake-code"
                    name="intakeCode"
                    placeholder="Ex: UC3F2011IT"
                  ></Field>
                  <ErrorMessage name="intakeCode" id="error" component="span" />
                  <label>Intake Year:</label>
                  <Field id="drop-down-select" as="select" name="intakeYear">
                    {years.map((year) => {
                      return (
                        <option key={year.intakeYear} value={year.intakeYear}>
                          {year.value}
                        </option>
                      );
                    })}
                  </Field>
                  <ErrorMessage name="intakeYear" id="error" component="span" />
                  {serverError && <p id="error">{serverError}</p>}
                  {serverMessage && <p id="success-msg"> 🙂 {serverMessage}</p>}
                  <button type="submit">Create Intake</button>
                </Form>
              </Formik>
            </div>
          </div>
          <div className="cont-1-create" data-aos="fade-up">
            <h6>List of All Intakes</h6>
            <div className="intake-table">
              <div className="header-intake">
                <p id="intake-name-h">NAME</p>
                <p id="intake-code-h">INTAKE CODE</p>
                <p id="intake-year-h">YEAR</p>
              </div>
              <div className="scrolling-intake">
                {!tableData && <p>No data</p>}
                {tableData.map((data, key) => {
                  return (
                    <div
                      className="intake-row"
                      onClick={() => {
                        redirectToIntake(data.id);
                      }}
                    >
                      <p id="intake-name-h">{data.name}</p>
                      <p id="intake-code-h">{data.intakeCode}</p>
                      <p id="intake-year-h">{data.intakeYear}</p>
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

export default Intakes;
