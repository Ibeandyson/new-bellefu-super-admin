import React from "react";
import { Alert } from "react-bootstrap";

function CustomAlert({ children, type }) {
  return (
    <div style={{ position: "fixed", top: 20, right: "0" }}>
      <Alert key={0} variant={type}>
        {children}
      </Alert>
    </div>
  );
}

export default CustomAlert;
