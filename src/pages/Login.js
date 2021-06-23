import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../components/navBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../App.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

function Login() {
  let history = useHistory();
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const handleInitialValues = {
    username: "",
    password: "",
  };
  const handleValidationSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  Axios.defaults.withCredentials = true;

  const handleSubmit = (data) => {
    Axios.post(`${server}lecturer/login`, data).then((response) => {
      setServerError(response.data.err);
      setServerMessage();
      if (response.data.username === "Admin") {
        history.push("/home");
      } else if (response.data.username) {
        history.push("/myClasses");
      }
    });
  };

  useEffect(() => {
    Axios.get(`${server}lecturer/login`).then((response) => {
      if (response.data.loggedIn === true) {
        if (response.data.username === "Admin") {
          history.push("/home");
        } else {
          history.push("/myClasses");
        }
      } else {
        history.push("/login");
      }
    });
  }, [history]);

  const disappear = () => {
    document.getElementById("error-cont-login").style.display = "none";
    history.push("/login");
  };

  return (
    <div className="login">
      <NavBar />
      <div className="main-cont">
        <div className="login-cont">
          <h3>Login</h3>
          <div className="form-cont">
            <Formik
              initialValues={handleInitialValues}
              onSubmit={handleSubmit}
              validationSchema={handleValidationSchema}
            >
              <Form>
                <label>Username:</label>
                <Field
                  id="input-name"
                  name="username"
                  placeholder="Ex: APU-9179384"
                ></Field>
                <ErrorMessage name="username" id="error" component="span" />
                <label>Password:</label>
                <Field
                  id="input-password"
                  name="password"
                  type="password"
                ></Field>
                <ErrorMessage name="password" id="error" component="span" />
                <div className="btn-cont">
                  <button type="submit">Login</button>
                  <p>
                    If you forgot your password, please send a mail to
                    helpdid@gmail.com
                  </p>
                </div>
              </Form>
            </Formik>
            {serverError && (
              <div
                className="error-cont-login"
                id="error-cont-login"
                data-aos="fade-down"
              >
                <span id="close" onClick={disappear}>
                  <AiOutlineCloseCircle />
                </span>
                <h2> Error: </h2>
                <p>{serverError}</p>
              </div>
            )}
            {serverMessage && (
              <div
                className="msg-cont-login"
                id="msg-cont-login"
                data-aos="fade-down"
              >
                <p>{serverMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
