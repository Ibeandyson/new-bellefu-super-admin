import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "react-bootstrap";
import { AiOutlineGift } from "react-icons/ai";
import { useSelector } from "react-redux";
import CustomSpinner from "../Spinner/Spinner";

export default function ActiveAdsInfo({ data }) {
  return (
    <div>
      <Card className="border-0">
        <Card.Header className="border-0" style={{ backgroundColor: "#76ba1b" }}>
          <AiOutlineGift style={styles.icon} className="mr-4" />
          <b style={{ color: "white" }}>Active Ads</b>
        </Card.Header>
        <Card.Body className="pb-0 pt-1">
          <div className="text-center">
            <label style={styles.text}>
              <b>{data}</b>
            </label>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

const styles = {
  icon: {
    fontSize: "20px",
    color: "#ffa500",
    backgroundColor: "whitesmoke",
    borderRadius: "50px",
    padding: "2px",
  },
  text: {
    opacity: "0.7",
    fontSize: "1em",
  },
};
