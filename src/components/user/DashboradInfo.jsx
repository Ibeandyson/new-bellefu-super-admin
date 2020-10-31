import React from "react";
import { Card, Image, Col, Row } from "react-bootstrap";
import pic from "../images/pic.jpg";
import { AiOutlineHeart, AiOutlineGift, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { IoMdTime } from "react-icons/io";

export default function DashboradInfo() {
  return (
    <div>
      <Card className="border-0 text-center" style={{ padding: "20px" }}>
        <Row>
          <Col xs={6} sm={6} md={6} lg={2} xl={2}>
            <Image src={pic} style={styles.avater} roundedCircle />
          </Col>
          <Col xs={6} sm={6} md={6} lg={2} xl={2}>
            <p style={styles.data}> 0</p>
            <span>
              <AiOutlineGift style={styles.icon} className="mr-2" />
              <label style={styles.text}> My Ads</label>
            </span>
          </Col>
          <Col xs={6} sm={6} md={6} lg={2} xl={2}>
            <p style={styles.data}> 0345</p>
            <span>
              <AiOutlineHeart style={styles.icon} className="mr-2" />
              <label style={styles.text}>Favourite</label>
            </span>
          </Col>
          <Col xs={6} sm={6} md={6} lg={2} xl={2}>
            <p style={styles.data}>0</p>
            <span>
              <IoMdTime style={styles.icon} className="mr-2" />
              <label style={styles.text}>Pending Ads</label>
            </span>
          </Col>
          <Col xs={6} sm={6} md={6} lg={2} xl={2}>
            <p style={styles.data}>18</p>
            <span>
              <MdDateRange style={styles.icon} className="mr-2" />
              <label style={styles.text}>Expired Ads</label>
            </span>
          </Col>
          <Col xs={6} sm={6} md={6} lg={2} xl={2}>
            <p style={styles.data}> 34</p>
            <span>
              <AiOutlineEyeInvisible style={styles.icon} className="mr-2" />
              <label style={styles.text}>Hiden Ads</label>
            </span>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

const styles = {
  avater: {
    height: "60px",
  },
  icon: {
    color: "#ffa500",
  },
  text: {
    opacity: "0.7",
    fontSize: "0.9em",
  },
  data: {
    fontSize: "0.7em",
    marginBottom: "-3px",
    marginTop: "15px",
  },
};
