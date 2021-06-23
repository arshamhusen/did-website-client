import React from "react";
import AOS from "aos";
import NavBar from "../components/navBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

function Register() {
  // const [fileInputState, setFileInputState] = useState("");
  // const [previewSource, setPreviewSource] = useState("");
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [networkError, setNetworkError] = useState("");

  // // Handle file input changes
  // const handleFileInputChange = (e) => {
  //   const file = e.target.files[0];
  //   previewFile(file);
  // };

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  // // Uploads the image to the server
  // const uploadImage = async (base64EncodedImage) => {
  //   console.log(base64EncodedImage);
  //   axios
  //     .post("${server}api/upload", base64EncodedImage)
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleValidation = (e) => {
    setErrors(validateUserInfo(values));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateUserInfo(values));
    if (Object.keys(errors).length === 0) {
      registerUser(values);
      // if (!previewSource) return;
      // uploadImage(previewSource);
      // return true;
    }
  };

  const registerUser = async (values) => {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
    };
    console.log(data);
    axios.post(`${server}lecturer/register`, data).then((response) => {
      setServerMessage(response.data.msg);
      setServerError(response.data.err);
    });
  };

  // This function checks if the entered Mail exists

  // Validating user information

  const validateUserInfo = (values) => {
    let errors = {};

    if (!values.name.trim()) {
      errors.name = "Full Name required";
    }

    if (!values.username.trim()) {
      errors.username = "Employee ID required";
    }

    if (!values.email.trim()) {
      errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }

    if (!values.password.trim()) {
      errors.password = "password required";
    } else if (values.password.length < 6 || values.password.length > 20) {
      errors.password = "The password must be between 6 to 20 characters";
    } else if (!/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(values.password)) {
      errors.password = "The password must contain a special character";
    } else if (!/\d/.test(values.password)) {
      errors.password = "Password must have a decimal number";
    }

    if (!values.conPassword.trim()) {
      errors.conPassword = "Please confirm password";
    } else if (values.password !== values.conPassword) {
      errors.conPassword = "Passwords do not match";
    }

    return errors;
  };

  const disappear = () => {
    document.getElementById("error-cont").style.display = "none";
  };

  const disappearMsg = () => {
    document.getElementById("msg-cont").style.display = "none";
  };

  return (
    <div className="register">
      <NavBar />
      <div className="register-cont">
        <form onSubmit={handleSubmit}>
          <div className="reg-form" data-aos="fade-up">
            <h3>Create a Lecturer Account</h3>
            {/* <div className="upload-pic" data-aos="fade-up">
              {previewSource && <img src={previewSource} alt="preview"></img>}
              {!previewSource && <img src={Guy} alt="preview"></img>}
            </div>
            <input
              id="upload-pic"
              type="file"
              name="image"
              onChange={handleFileInputChange}
              value={fileInputState}
            ></input>
            {!previewSource && <p>Upload a picture</p>}
            {previewSource && (
              <p id="uploaded" data-aos="fade-up">
                Image uploaded
              </p>
            )} */}
            <div className="form-container">
              <label>Full Name:</label>
              <input
                name="name"
                placeholder="Ex: John Appleseed"
                onChange={handleChange}
                value={values.name}
              ></input>
              {errors.name && <p id="error-msg">{errors.name}</p>}
              <label>Username:</label>
              <input
                name="username"
                placeholder="Ex: john.appleseed"
                onChange={handleChange}
                value={values.username}
              ></input>
              {errors.username && <p id="error-msg">{errors.username}</p>}
              <label>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Ex: john.appleseed@staffmail.apu.edu.my"
                onChange={handleChange}
                value={values.email}
              ></input>
              {errors.email && <p id="error-msg">{errors.email}</p>}
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Must contain uppercase, lowercase, decimals and special characters"
                onChange={handleChange}
                value={values.password}
                onBlur={handleValidation}
              ></input>
              {errors.password && <p id="error-msg">{errors.password}</p>}
              <label>Confirm Password:</label>
              <input
                type="password"
                name="conPassword"
                placeholder="Must contain uppercase, lowercase, decimals and special characters"
                onChange={handleChange}
                value={values.conPassword}
                onBlur={handleValidation}
              ></input>
              {errors.conPassword && <p id="error-msg">{errors.conPassword}</p>}
              <p>
                By clicking register, You are accepting these{" "}
                <a href="/">terms and conditions!</a>
              </p>
            </div>
            <button type="submit" id="register-btn" onBlur={handleValidation}>
              Create Account
            </button>
            {serverMessage && (
              <div className="msg-cont" id="msg-cont" data-aos="msg-cont">
                <span id="close" onClick={disappearMsg}>
                  <AiOutlineCloseCircle />
                </span>
                <p>{serverMessage}</p>
                <Link to="/login">Continue to login</Link>
              </div>
            )}
            {serverError && (
              <div className="error-cont" id="error-cont" data-aos="fade-down">
                <span id="close" onClick={disappear}>
                  <AiOutlineCloseCircle />
                </span>
                <h2> Error: </h2>
                <p>{serverError}</p>
              </div>
            )}
            {networkError && (
              <div className="error-cont" id="error-cont" data-aos="fade-down">
                <span id="close" onClick={disappear}>
                  <AiOutlineCloseCircle />
                </span>
                <h2> Error: </h2>
                <p>{networkError}</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
