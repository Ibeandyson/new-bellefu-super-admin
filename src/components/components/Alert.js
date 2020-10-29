import React from "react";
import { Alert } from "react-bootstrap";

function CustomAlert({ children, type }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 80,
        right: 20,
        minHeight: "max-content",
      }}
    >
      <Alert key={4} variant={type}>
        {children}
      </Alert>
    </div>
  );
}

export default CustomAlert;
