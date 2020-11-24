import React from "react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineWarning } from "react-icons/ai";

export default function UpdateModal(props) {
  const { text, handleClose, handleUpdate, show } = props;
  return (
    <Modal {...props} show={show} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header>
        <p style={{ textAlign: "center", width: "100%" }}>{text}?</p>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
