import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../App.css";
import { useParams } from "react-router-dom";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

function ValidateAccount() {
  let { id } = useParams();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userData, setUserData] = useState([]);

  const body = {
    password: password,
  };

  const Mailto = ({ email, subject = "", body = "", children }) => {
    let params = subject || body ? "?" : "";
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };

  useEffect(() => {
    Axios.get(`${server}students/byId/${id}`).then((Response) => {
      if (Response.data.emailVerified === true) {
        setIsVerified(!isVerified);
        setUserData(Response.data);
      }
    });
  }, []);

  const submitHandler = () => {
    if (password.trim() === "") {
      setErrorMessage("Please enter the password");
      setError(!error);
    } else {
      Axios.post(
        `http://localhost:3001/students/validateAccount/${id}`,
        body
      ).then((Response) => {
        alert(JSON.stringify(Response.data));
      });
    }
  };
  return (
    <div className="validate-cont">
      <h1> Welcome to Digital Identity</h1>
      {!isVerified && (
        <>
          {" "}
          <h5>
            Click on the button below to verify your Account and please type
            your password for additional security
          </h5>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {!error && <p>{errorMessage}</p>}
          <button onClick={submitHandler}>Verify Account</button>{" "}
          <Mailto
            email="arushamhussain02@outlook.com"
            subject="Cannot verify My account!"
            body="Type the issue here.. Note: The system does not detect your default mail service. You should send this mail using your student Email!"
          >
            <h5>Problem verifying your account?</h5>
          </Mailto>
          ,
        </>
      )}
      {isVerified && (
        <>
          {" "}
          <h5>
            Your Account has already being verified. Please proceed with your
            login!
          </h5>
        </>
      )}
    </div>
  );
}

export default ValidateAccount;
