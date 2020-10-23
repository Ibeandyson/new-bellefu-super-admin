import React from "react";
import spinner from "../images/spinner.svg";

function CustomSpinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={spinner} width="50px" alt="loader" />
    </div>
  );
}

export default CustomSpinner;
