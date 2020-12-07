import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
function ImageModal({ data, url, id, close }) {
  return (
    <>
      <div
        id={id}
        onClick={(e) => {
          if (e.target.id === id) {
            close();
          }
        }}
        className="imageModal"
        style={{
          position: "fixed",
          zIndex: 10000,
          background: "rgba(0,0,0,0.6)",
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
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Button onClick={close} style={{ width: 40, height: 40, padding: 5, margin: 10 }} variant="danger">
              <AiOutlineClose style={{ fontSize: 48, color: "#fff" }} />
            </Button>
          </div>
          <div style={{ maxWidth: 620, maxHeight: "65vh", minWidth: 300, minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {data !== undefined && data !== null ? (
              <Carousel>
                {data.map((item) => (
                  <Carousel.Item>
                    <img className="d-block w-100" src={url + item} alt={item} />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <h1 style={{ color: "#fff", margin: 40 }}>No Image To Display </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageModal;
