import React, { useState } from "react";
import "../App.css";
export default function intakeTableData({ data }) {
  const [selectedRow, setSelectedRow] = "";
  const columns = data[0] && Object.keys(data[0]);
  return (
    <table cellPadding={0} cellSpacing={0}>
      <div className="head-table">
        <thead>
          <tr>
            {data[0] &&
              columns.map((heading) => <th>{heading.toUpperCase()}</th>)}
          </tr>
        </thead>
      </div>
      <div className="scroll-table">
        <tbody>
          {data.map((row) => (
            <tr
              onClick={(e) => {
                console.log(e.target.closest("td"));
              }}
            >
              {columns.map((column) => (
                <td>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </div>
    </table>
  );
}
