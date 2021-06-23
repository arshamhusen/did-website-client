import React, { useState, useEffect } from "react";
import "../styles/myClasses.css";
import NavBar from "../components/mainNavBar";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import TimePicker from "react-time-picker";
import DatePicker from "react-date-picker";
import Lottie from "react-lottie";
import animationData from "../lottie/44910-nfc-card-read.json";
import animationData1 from "../lottie/58028-tick.json";
import animationData2 from "../lottie/4903-failed (1).json";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

function MyClasses() {
  let history = useHistory();
  const [clicked, setClicked] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState("");
  const [module, setModule] = useState([]);
  const [startTime, setStartTime] = useState("08:30");
  const [endTime, setEndTime] = useState("08:30");
  const [date, setDate] = useState(new Date());
  const [intakeList, setIntakeList] = useState([]);
  const [checked, setChecked] = React.useState();
  const [selectedIntake, setSelectedIntake] = useState("");
  const [loaded, setloaded] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [randNum, setRandNum] = useState(
    Math.floor(Math.random() * (999 - 101 + 1) + 100)
  );
  const [classId, setClassId] = useState("");
  const [nfcCode, setNfcCode] = useState("");
  const [nfcDiv, setNfcDiv] = useState(false);
  const [nfcWritten, setNfcWritten] = useState(false);
  const [nfcWaiting, setNfcWaiting] = useState(true);
  const [nfcFail, setNfcFail] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    Axios.get(`${server}lecturer/login`).then((response) => {
      setUserId(response.data.userId);
      setUserName(response.data.userName);
      // yearGenerator();
      if (response.data.loggedIn === true) {
        setloaded(!loaded);
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

  // Find Module Information related to lecturer
  useEffect(() => {
    console.log(userId);
    generateNum();
    // changeOTP();
    let id = userId;
    Axios.get(`${server}lecturer/findModule/${id}`).then((response) => {
      setModule(response.data);
    });
    Axios.get(`${server}intakes/findAll`).then((response) => {
      setIntakeList(response.data);
    });
  }, [userId]);

  const data = {
    date: date,
    startTime: startTime,
    endTime: endTime,
    module: module.moduleCode,
    intake: selectedIntake,
    type: checked,
    selectedTutorial: selectedTutorial,
    name: name,
    location: location,
    lecturerId: userId,
    otp: randNum,
  };

  function generateNum() {
    setInterval(function () {
      setRandNum(Math.floor(Math.random() * (999 - 101 + 1) + 100));
      return randNum;
    }, 30000);
  }

  function submitHandler() {
    let id = userId;
    console.log(date);
    Axios.post(`${server}classes/create`, data).then((response) => {
      setClassId(response.data.classId);
      setNfcCode(response.data.nfcCode);
      setClicked(!clicked);
    });
  }

  return (
    <div className="myclass">
      <NavBar />
      <div className="myclass-cont">
        {nfcDiv && (
          <div className="nfc-div">
            <h1>Create NFC Tag</h1>
            <div className="lottie-ani">
              {nfcWritten && (
                <Lottie options={defaultOptions} height={200} width={200} />
              )}
              {nfcWaiting && (
                <Lottie options={defaultOptions1} height={200} width={200} />
              )}
              {nfcFail && (
                <Lottie options={defaultOptions2} height={200} width={200} />
              )}
            </div>
            <div className="nfc-btn-cont">
              {/* <Nfc
                      write={nfcCode}
                      writeCallback={(error) => {
                        if (error) {
                          console.log(
                            "There was a problem writing into the tag please try again! Error:",
                            error
                          );
                        } else {
                          console.log(
                            "Class written to the tag successfully :D"
                          );
                        }
                      }}
                      timeout={15}
                    /> */}
              <button onClick={!nfcDiv}>Proceed</button>
            </div>
          </div>
        )}
        {!loaded && <div class="loader"></div>}
        <div className="create-class-con">
          <div className="create-class-cont">
            <h2>Create a Class for Attendance </h2>
            <div className="form-main-cont">
              <div className="form-1">
                <label>Date</label>
                <DatePicker
                  format={"dd-MM-y"}
                  calendarIcon={null}
                  clearIcon={null}
                  onChange={setDate}
                  value={date}
                />
                <label>Duration</label>
                <div className="time-div">
                  <TimePicker
                    clearIcon={null}
                    clockIcon={null}
                    value={startTime}
                    onChange={setStartTime}
                  />
                  <label>to</label>
                  <TimePicker
                    clearIcon={null}
                    clockIcon={null}
                    value={endTime}
                    onChange={setEndTime}
                  />
                </div>
                <label>Module</label>
                <div className="input-div">
                  <label>{module.moduleCode}</label>
                </div>
                <label>Intake</label>
                <select
                  className="select-style"
                  onChange={(e) => setSelectedIntake(e.target.value)}
                >
                  <option>Please Select</option>
                  <option value="all">All</option>
                  {intakeList.map((intake, key) => {
                    return (
                      <option value={intake.intakeCode}>
                        {intake.intakeCode}
                      </option>
                    );
                  })}
                </select>
                <label>Class Tutorial:</label>
                <select
                  className="select-style"
                  onChange={(e) => setSelectedTutorial(e.target.value)}
                >
                  <option>Please Select</option>
                  <option value="all">All</option>
                  <option value="T1">T1</option>
                  <option value="T2">T2</option>
                  <option value="T3">T3</option>
                </select>
              </div>
              <div className="form-2">
                <label>Lecture/Lab</label>
                <div className="check-box">
                  <label>
                    <input
                      type="checkbox"
                      value="Lecture"
                      onChange={(checked) => setChecked(checked.target.value)}
                    />
                    <span class="checkmark"></span>
                    Lecture
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Lab"
                      onChange={(checked) => setChecked(checked.target.value)}
                    />
                    <span class="checkmark-2"></span>
                    Lab
                  </label>
                </div>
                <label>Class Name:</label>
                <input
                  className="special-input"
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <label>Location</label>
                <input
                  className="special-input"
                  onChange={(e) => setLocation(e.target.value)}
                ></input>
              </div>
            </div>
            <button onClick={submitHandler}>Create Class</button>
          </div>
          {clicked && (
            <div className="nfc-popup" id="unblurred">
              <div className="blur-cont">
                <h2>Class created Successfully!</h2>
                <h4>Class details:</h4>
                <p>Name:</p>
                <label>{name}</label>
                <p>Module Code:</p>
                <label>{module.moduleCode}</label>
                <p>Location:</p>
                <label>{location}</label>
                <p>Intake:</p>
                <label>
                  {selectedIntake} - {selectedTutorial}
                </label>
                <p>Type:</p>
                <label>{checked}</label>
                <p>Starts at::</p>
                <label>{startTime}</label>
                <p>Ends at::</p>
                <label>{endTime}</label>
                <p>Date:</p>
                <label>{new Date(date).toString()}</label>
                <p id="nfc-warning">
                  To create an NFC tag using the create button your device
                  requires NFC functionality. To enable it on Chrome in your
                  android device, open a new tab and navigate to chrome://flags,
                  search form WebNFC and enable it.
                </p>
                <div className="btn-cont-pu">
                  <button onClick={() => setClicked(!clicked)}>
                    Back to previous page
                  </button>
                  <button onClick={(e) => setNfcDiv(!nfcDiv)}>
                    Create an NFC tag
                  </button>
                  <button
                    onClick={() =>
                      history.push(`/attendance/byClassId/${classId}`)
                    }
                  >
                    Only online classes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyClasses;
