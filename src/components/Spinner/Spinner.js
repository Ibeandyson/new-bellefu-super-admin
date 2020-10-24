import React from "react";
import spinner from "../images/spinner.svg";

function CustomSpinner({ small }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={spinner}
        width={small !== undefined ? "40px" : "50px"}
        alt="loader"
      />
    </div>
  );
}

export default CustomSpinner;
