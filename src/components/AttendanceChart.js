import { Pie } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../styles/myClasses.css";

const server = "https://w0x0sy03tc.execute-api.us-east-2.amazonaws.com/latest/";

function AttendanceChart(props) {
  let id = props.data;
  const [totalCount, setTotalCount] = useState();
  const [presentCount, setPresentCount] = useState();
  const chartInfo = () => {
    Axios.get(`${server}attendance/countInfo/${id}`).then((response) => {
      console.log(id);
      setTotalCount(response.data.totalCount);
      setPresentCount(response.data.presentCount);
      console.log(response.data);
    });
  };

  useEffect(() => {
    chartInfo();

    const interval = setInterval(() => {
      chartInfo();
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <Pie
        data={{
          labels: ["Present", "Absent"],
          datasets: [
            {
              label: "Digital IDs",
              data: [presentCount, totalCount - presentCount],
              backgroundColor: [
                "rgba(86, 204, 242, 1)",
                "rgba(230, 90, 74, 0.7)",
              ],
            },
          ],
        }}
        height={350}
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
  );
}

export default AttendanceChart;
