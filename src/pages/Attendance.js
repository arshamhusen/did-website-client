import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import NavBar from "../components/mainNavBar";
import "../styles/myClasses.css";
import Countdown from "react-countdown";
import RenderPresent from "../components/renderPresent";
import PieChart from "../components/AttendanceChart";
import { ExportToExcel } from "../components/exportExcelAttendance";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

function Attendance() {
  let history = useHistory();
  let { id } = useParams();
  const [classInfo, setClassInfo] = useState({});
  const [randNum, setRandNum] = useState(
    Math.floor(Math.random() * (999 - 101 + 1) + 100)
  );
  const [otp, setOtp] = useState("");
  const [isEnded, setisEnded] = useState(false);
  const [attendedList, setAttendededList] = useState([]);

  const data = { otp: randNum };
  useEffect(() => {
    Axios.get(`${server}classes/byId/${id}`).then((response) => {
      setClassInfo(response.data);
      setOtp(response.data.otp);
    });
    generateNum();
    Axios.get(`${server}attendance/genAttendance/${id}`).then((response) => {
      console.log(response.data);
    });
    const interval = setInterval(function () {
      console.log(randNum);
      Axios.post(`${server}classes/changeOTP/${id}`, data).then((response) => {
        setOtp(response.data);
        console.log(response);
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  function generateNum() {
    setInterval(function () {
      setRandNum(Math.floor(Math.random() * (999 - 101 + 1) + 100));
      console.log(randNum);
      return randNum;
    }, 59000);
  }

  const getAttendanceList = () => {
    Axios.get(`${server}attendance/findAttendance/${id}`).then((response) => {
      setAttendededList(response.data);
      console.log(response.data);
    });
  };

  function handlePause() {
    Axios.post(`${server}classes/endAttendance/${id}`).then((response) => {
      if (response.data.msg) {
        setisEnded(!isEnded);
        getAttendanceList();
      } else {
        alert("The attendance session has already ended");
      }
    });
    document.getElementById("end-button").style.backgroundColor = "#6cc4ff";
    document.getElementById("button-div").style.marginTop = 0;
  }

  function handlePresent(id) {
    Axios.get(`${server}attendance/change/${id}`).then((response) => {
      console.log(response.data);
      getAttendanceList();
    });
  }

  const fileName = JSON.stringify(classInfo.name + classInfo.createdAt);

  return (
    <div className="myclass">
      <NavBar />
      <div className="myclass-cont">
        <div className="main-blur-cont">
          <div className="att-cont-sub1">
            <div className="att-chart-cont">
              <h1>Attendance for {classInfo.name} Class</h1>
              <PieChart data={id} />
            </div>
            {!isEnded && <RenderPresent data={id} />}
          </div>
          <div className="att-cont-sub2">
            {!isEnded && (
              <>
                <div className="OTP-cont">
                  <h1>{otp}</h1>
                </div>
                <p>
                  <Countdown date={Date.now() + 60000} /> until new OTP
                </p>
              </>
            )}
            <div className="class-info-cont">
              <p>Name:</p>
              <label>{classInfo.name}</label>
              <p>Module Code:</p>
              <label>{classInfo.module}</label>
              <p>Location:</p>
              <label>{classInfo.location}</label>
              <p>Intake:</p>
              <label>
                {classInfo.intake} - {classInfo.selectedTutorial}
              </label>
              <p>Type:</p>
              <label>{classInfo.type}</label>
              <p>Starts at::</p>
              <label>{classInfo.startTime}</label>
              <p>Ends at::</p>
              <label>{classInfo.endTime}</label>
              <p>Date:</p>
              <label>{new Date(classInfo.date).toString()}</label>
              <div id="button-div" className="btn-cont-pu">
                <button onClick={() => history.push("/myClasses")}>
                  Go Back
                </button>
                <button id="end-button" onClick={handlePause}>
                  {!isEnded ? "End" : "Completed"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {isEnded && (
          <div className="main-blur-cont1">
            <h1>Attendance Record</h1>
            <div className="att-table">
              <div className="att-header">
                <label id="att-tp">TP Number</label>
                <label id="att-name">Student Full Name</label>
                <label id="att-status">Status</label>
                <label id="att-action">Action</label>
              </div>
              <div className="att-row">
                {attendedList.map((student, key) => {
                  return (
                    <div className="att-data">
                      <label id="att-tp">{student.studentTp}</label>
                      <label id="att-name">{student.studentName}</label>
                      {student.isPresent === true && (
                        <label id="att-status-p">Present</label>
                      )}
                      {student.isPresent === true && (
                        <div id="att-action"></div>
                      )}
                      {student.isPresent === false && (
                        <label id="att-status-a">Absent</label>
                      )}
                      {student.isPresent === false && (
                        <button
                          onClick={(e) => handlePresent(student.id)}
                          className="att-btn"
                          id="att-action"
                        >
                          Mark as present
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="export-btn-cont">
              <ExportToExcel apiData={attendedList} fileName={fileName} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
