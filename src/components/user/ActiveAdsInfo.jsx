import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Card } from "react-bootstrap";
import { AiOutlineGift } from "react-icons/ai";
import { useSelector } from "react-redux";
import CustomSpinner from "../Spinner/Spinner";

export default function ActiveAdsInfo() {
  const { token } = useSelector((state) => state.adminSignin);
  const [data, setData] = useState({
    view: false,
    count: 0,
  });

  useEffect(() => {
    Axios.get("https://dev.bellefu.com/api/admin/product/list/approved", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        const count = res.data.products.total;
        setData({
          view: true,
          count,
        });
      })
      .catch(() => {
        setData({
          view: true,
          count: "N/A",
        });
      });
  }, []);

  return (
    <div>
      <Card className="border-0">
        <Card.Header
          className="border-0"
          style={{ backgroundColor: "#76ba1b" }}
        >
          <AiOutlineGift style={styles.icon} className="mr-4" />
          <b style={{ color: "white" }}>Active Ads</b>
        </Card.Header>
        <Card.Body className="pb-0 pt-1">
          <div className="text-center">
            <label style={styles.text}>
              <b>{data.view ? data.count : <CustomSpinner small />}</b>
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
