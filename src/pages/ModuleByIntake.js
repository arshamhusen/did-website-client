import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/intakes.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AOS from "aos";
import "../App.css";
import "aos/dist/aos.css";
import "../styles/moduleByIntake.css";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

AOS.init();

function ModuleByIntake() {
  // Admin Role validations for access Control
  let { id } = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  const [intake, setIntake] = useState([]);

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

    axios.get(`${server}intakes/find/${id}`).then((response) => {
      setIntake(response.data);
    });
  }, [history, id]);

  // Formik functions
  const handleInitialValues = {
    name: "",
    moduleCode: "",
    deanName: "",
  };

  const handleValidationSchema = Yup.object().shape({
    name: Yup.string().required("Please enter a Module name!"),
    moduleCode: Yup.string().required("Please enter a Module Code!"),
    deanName: Yup.string().required("Please enter the Module leader name!"),
  });

  const handleSubmit = (data) => {
    axios.post(`${server}modules/create/${id}`, data).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="ModuleByIntake">
      <SideBar />
      <div className="mbi-main-container">
        <div className="route">
          <Link to="/modules">
            <p>Modules</p>
          </Link>
          <p>/</p>
          <Link>
            <p>{intake.intakeCode}</p>
          </Link>
        </div>
        <h1>Manage Modules</h1>
        <div className="mbi-create-cont">
          <h4>Create a module for {intake.intakeCode}</h4>
          <Formik
            initialValues={handleInitialValues}
            validationSchema={handleValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <label>Module name: </label>
              <Field
                id="module-name"
                name="name"
                placeholder="Ex: Penetration Testing"
              ></Field>
              <ErrorMessage name="name" id="error" component="span" />
              <label>Module Code: </label>
              <Field
                id="module-code"
                name="moduleCode"
                placeholder="Ex: CT0-3-3-PNT"
              ></Field>
              <ErrorMessage name="moduleCode" id="error" component="span" />
              <label>Module Leader: </label>
              <Field
                id="module-code"
                name="deanName"
                placeholder="Ex: John Appleseed"
              ></Field>
              <ErrorMessage name="deanName" id="error" component="span" />
              <button type="submit">Create Module</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ModuleByIntake;
