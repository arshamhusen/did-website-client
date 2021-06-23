import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/intakes.css";
import AOS from "aos";
import "../App.css";
import "aos/dist/aos.css";
import "../styles/moduleById.css";
import Profile from "../assets/guy.png";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

AOS.init();
function ModuleById() {
  // Admin Role validations for access Control
  let { id } = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  const [module, setModule] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);

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

    axios.get(`${server}modules/find/${id}`).then((response) => {
      setModule(response.data);
    });
  }, [history, id]);

  useEffect(() => {
    // Get the lecturer information for lecturers
    axios.get(`${server}lecturer/findAll/byModule/${id}`).then((response) => {
      setLecturerData(response.data);
    });
  }, [id]);

  return (
    <div className="ModuleById">
      <SideBar />
      <div className="mbi-main-container">
        <div className="route">
          <Link to="/modules">
            <p>Modules</p>
          </Link>
          <p>/</p>
          <Link>
            <p>{module.moduleCode}</p>
          </Link>
        </div>
        <h1>Manage Modules</h1>
        <div className="mbid-main-cont">
          <h2>{module.name}</h2>
          <div className="module-info">
            <label>Name:</label>
            <p>{module.name}</p>
            <label>Module Code:</label>
            <p>{module.moduleCode}</p>
            <label>Module Leader:</label>
            <p>{module.deanName}</p>
          </div>
          <h2>Lecturers under the module</h2>
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
          <button>Delete Module</button>
        </div>
      </div>
    </div>
  );
}

export default ModuleById;
