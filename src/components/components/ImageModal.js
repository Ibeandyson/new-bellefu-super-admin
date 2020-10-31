import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
function ImageModal({ src, alt }) {
  const [close, setClose] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => {
          setClose(true);
        }}
        style={{ cursor: "pointer", maxWidth: 100 }}
        alt=""
      />
      {close && (
        <div
          className="imageModal"
          style={{
            position: "fixed",
            zIndex: 10000,
            background: "rgba(0,0,0,0.3)",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            padding: "70px 40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <Button
              onClick={() => {
                setClose(false);
              }}
              style={{ position: "absolute", top: 0, right: 0, width: 50, height: 50, padding: 5 }}
              variant="danger"
            >
              <AiOutlineClose style={{ fontSize: 48, color: "#fff" }} />
            </Button>
            <img src={src} alt={alt} className="_mod-image" />
          </div>
        </div>
      )}
    </>
  );
}

export default ImageModal;
