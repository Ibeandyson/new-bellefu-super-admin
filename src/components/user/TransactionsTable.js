import React from "react";

export default function TransactionsTable() {
  return (
    <div>
      <table class="uk-table uk-table-responsive uk-table-divider">
        <thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
          <tr>
            <th
              style={{ color: "white", fontWeight: "bold" }}
              className="uk-table-expand"
            >
              Date
            </th>
            <th style={{ color: "white", fontWeight: "bold" }}>Amount</th>
            <th style={{ color: "white", fontWeight: "bold" }}>Plan</th>
            <th style={{ color: "white", fontWeight: "bold" }}>First Name</th>
            <th style={{ color: "white", fontWeight: "bold" }}>Last Name</th>
            <th style={{ color: "white", fontWeight: "bold" }}>Username</th>
            <th
              className="uk-table-expand"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
