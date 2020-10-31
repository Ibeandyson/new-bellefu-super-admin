import React from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineWarning } from "react-icons/ai";

export default function InfoModal(props) {
  const { text, handleYes, handleNo, header, show } = props;
  return (
    <Modal
      {...props}
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        {header === undefined ? (
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <AiOutlineWarning fontSize={44} color="warning" />
          </div>
        ) : (
          header
        )}
      </Modal.Header>
      <Modal.Body>
        <p style={{ textAlign: "center" }}>{text}</p>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Button block variant="secondary" onClick={handleNo}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
