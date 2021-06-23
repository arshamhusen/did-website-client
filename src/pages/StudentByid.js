import React, { useState, useEffect } from "react";
import SideBar from "../components/Sidebar";
import { useHistory, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import "../styles/studentById.css";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";

AOS.init();

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

function StudentByid() {
  //  Going to be used in all pages for authorization
  let { id } = useParams();
  let history = useHistory();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  const [student, setStudent] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [userActivity, setUserActivity] = useState([]);

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
        alert("You need to login first");
        history.push("/login");
      }
    });
  }, [history]);

  // UseEffect to load student data on load

  useEffect(() => {
    axios.get(`${server}students/byId/${id}`).then((response) => {
      setStudent(response.data);
    });

    // Get attendance data from the server dammnn
    axios.get(`${server}students/attendanceAPI/${id}`).then((response) => {
      setAttendanceData(response.data);
    });

    axios.get(`${server}attendance/byStudent/${id}`).then((response) => {
      setUserActivity(response.data);
    });
  }, [id]);

  return (
    <div className="student-by-id">
      <SideBar />
      <div className="mbi-main-container">
        <div className="route">
          <Link to="/students">
            <p>Students</p>
          </Link>
          <p>/</p>
          <Link>
            <p>{student.studentId}</p>
          </Link>
        </div>
        <h1> Manage Students </h1>
        <div className="sbi-main-cont">
          <h2>Student Name</h2>
          <div className="student-info">
            <label>Name:</label>
            <p>{student.name}</p>
            <label>Student ID:</label>
            <p>{student.studentId}</p>
            <label>Email:</label>
            <p>{student.email}</p>
            <label>Phone Number:</label>
            <p>{student.phoneNum}</p>
            <label>Intake:</label>
            <p>{student.Intake}</p>
          </div>
          <div className="reset-pass">
            <button>Delete User</button>
            <label>Reset Password:</label>
            <input></input>
            <button id="reset-btn">Reset</button>
          </div>
          <h2>Attendances</h2>
          <div className="student-module-attendance">
            {attendanceData.map((attendance, key) => {
              return (
                <div className="chart">
                  <h4>{attendance.moduleName}</h4>
                  <div className="percentage">
                    <h3>
                      {Math.round(
                        (attendance.presentCount / attendance.classCount) * 100
                      ).toFixed(0)}
                      %
                    </h3>
                  </div>
                  <div className="doughnut-chart">
                    <Doughnut
                      data={{
                        labels: ["Present", "Absent"],
                        datasets: [
                          {
                            label: "Digital IDs",
                            data: [
                              attendance.presentCount,
                              attendance.classCount - attendance.presentCount,
                            ],
                            backgroundColor: [
                              "rgba(61, 151, 179, 0.5)",
                              "rgba(220,20,60, 0.5)",
                            ],
                          },
                        ],
                      }}
                      height={240}
                      width={300}
                      borderRadius={10}
                      options={{
                        layout: {
                          padding: {
                            top: 10,
                            bottom: 10,
                          },
                        },
                        legend: {
                          display: false,
                        },
                      }}
                    />
                  </div>
                  <label id="eligibility">{attendance.eligibility}</label>
                </div>
              );
            })}
          </div>
          <h2>Recent Activity</h2>
          <div className="attendance-table">
            <div className="header-attendance">
              <p id="attendance-name-h">Class Name:</p>
              <p id="attendance-name-h">Class Date:</p>
              <p id="attendance-name-h">Attended Date:</p>
            </div>
            <div className="scrolling-attendance">
              {userActivity.map((activity, key) => {
                return (
                  <div className="attendance-row">
                    <p id="attendance-name-h">{activity.className}</p>
                    <p id="attendance-name-h">{activity.classDate}</p>
                    <p id="attendance-name-h">{activity.createdAt}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentByid;
