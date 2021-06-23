import React, { useState, useEffect } from "react";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import SideBar from "../components/Sidebar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "../App.css";
const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

const Dashboard = () => {
  //  Going to be used in all pages for authorization
  let history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  // Count the number of lecturerrs
  const [lecturerCount, setLecturerCount] = useState();
  const [studentCount, setStudentCount] = useState();

  useEffect(() => {
    axios.get(`${server}lecturer/login`).then((response) => {
      setUserId(response.data.userId);
      setUserName(response.data.userName);

      if (response.data.loggedIn === true) {
        history.push("/home");
      } else {
        history.push("/login");
      }
    });

    // Count the number of lecturerrs
    axios.get(`${server}lecturer/countAll`).then((response) => {
      setLecturerCount(response.data.count);
    });

    // Count the number of students
    axios.get(`${server}students/countAll`).then((count) => {
      setStudentCount(count.data);
    });
  }, [history]);

  return (
    <div className="dashboard">
      <SideBar />
      <div className="main-section1">
        <p>
          <a href="/">Dashboard</a>
        </p>
        <div className="db-chart1">
          <h4>Total sign-ins</h4>
          <Line
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"],
              datasets: [
                {
                  label: "Lecturers",
                  data: [12, 14, 17, 23, 24, 25, 44],
                  backgroundColor: [
                    "rgba(86, 204, 242, 0.2)",
                    "rgba(86, 204, 242, 0.2)",
                    "rgba(86, 204, 242, 0.2)",
                    "rgba(86, 204, 242, 0.2)",
                    "rgba(86, 204, 242, 0.2)",
                    "rgba(86, 204, 242, 0.2)",
                  ],
                  borderColor: [
                    "rgba(86, 204, 242, 1)",
                    "rgba(86, 204, 242, 1)",
                    "rgba(86, 204, 242, 1)",
                    "rgba(86, 204, 242, 1)",
                    "rgba(86, 204, 242, 1)",
                    "rgba(86, 204, 242, 1)",
                  ],
                  borderWidth: 2,
                  hoverBorderColor: [
                    "rgba(27, 177, 225, 1)",
                    "rgba(27, 177, 225, 1)",
                    "rgba(27, 177, 225, 1)",
                    "rgba(27, 177, 225, 1)",
                    "rgba(27, 177, 225, 1)",
                    "rgba(27, 177, 225, 1)",
                  ],
                },
                {
                  label: "Students",
                  data: [22, 24, 27, 33, 44, 35, 54],
                  backgroundColor: [
                    "rgba(86, 204, 242, 0)",
                    "rgba(86, 204, 242, 0)",
                    "rgba(86, 204, 242, 0)",
                    "rgba(86, 204, 242, 0)",
                    "rgba(86, 204, 242, 0)",
                    "rgba(86, 204, 242, 0)",
                  ],
                  borderColor: [
                    "rgba(66, 66, 66, 1)",
                    "rgba(66, 66, 66, 1)",
                    "rgba(66, 66, 66, 1)",
                    "rgba(66, 66, 66, 1)",
                    "rgba(66, 66, 66, 1)",
                    "rgba(66, 66, 66, 1)",
                  ],
                  borderWidth: 2,
                  hoverBorderColor: [
                    "rgba(27, 177, 225, 1)",
                    "rgba(27, 177, 225, 1)",
                    "rgba(27, 177, 225, 1)",
                    "rgba(27, 177, 225, 1)",
                    "rgba(27, 177, 225, 1)",
                    "rgba(27, 177, 225, 1)",
                  ],
                },
              ],
            }}
            height={250}
            width={500}
            borderRadius={20}
            options={{
              maintainAspectRatio: false,
              layout: {
                padding: {
                  top: 10,
                  left: 10,
                  right: 10,
                  bottom: 20,
                },
              },
              scales: {
                y: {
                  display: false,
                  suggestedMax: 100,
                },
              },
            }}
          />
        </div>
      </div>
      <div className="db-section2">
        <div className="donut-chart">
          <h4>Resgistered Users</h4>
          <Doughnut
            data={{
              labels: ["Lecturers", "Students"],
              datasets: [
                {
                  label: "Digital IDs",
                  data: [lecturerCount, studentCount],
                  backgroundColor: [
                    "rgba(86, 204, 242, 1)",
                    "rgba(86, 204, 242, 0.7)",
                  ],
                },
              ],
            }}
            height={250}
            width={500}
            borderRadius={20}
            options={{
              layout: {
                padding: {
                  top: 20,
                  bottom: 20,
                },
              },
            }}
          />
        </div>
        <div className="db-chart3">
          <h4 className="db-progress-bar">Deployed Tags</h4>
          <Bar
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"],
              datasets: [
                {
                  label: "Deployed Tags",
                  data: [42, 14, 23, 23, 23, 23, 23],
                  backgroundColor: [
                    "rgba(86, 204, 242, 1)",
                    "rgba(86, 204, 242, 0.7)",
                    "rgba(86, 204, 242, 0.7)",
                    "rgba(86, 204, 242, 0.7)",
                    "rgba(86, 204, 242, 0.7)",
                    "rgba(86, 204, 242, 0.7)",
                    "rgba(86, 204, 242, 0.7)",
                  ],
                },
              ],
            }}
            height={230}
            width={500}
            options={{
              layout: {
                padding: {
                  top: 30,
                  bottom: 20,
                  left: 50,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
