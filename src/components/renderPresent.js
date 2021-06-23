import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/myClasses.css";
const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

const RenderPresent = (props) => {
  let id = props.data;
  const [presentStudents, setPresentStudents] = useState([]);
  // Auto rendering
  useEffect(() => {
    getPresentStudents();

    const interval = setInterval(() => {
      getPresentStudents();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getPresentStudents = async () => {
    Axios.get(`${server}attendance/findAttended/${id}`).then((response) => {
      setPresentStudents(response.data);
    });
  };

  return (
    <div className="attended-students">
      {presentStudents.map((present, key) => {
        return (
          <div className="student-div">
            <p>{present.studentName}</p>
          </div>
        );
      })}
    </div>
  );
};
export default RenderPresent;
