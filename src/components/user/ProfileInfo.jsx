import React, { useEffect, useState } from "react";
import { Col, Row, Card, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import pic from "../images/pic.jpg";

export default function ProfileInfo() {
  const { user } = useSelector((state) => state.adminSignin.admin);

  const [profile, setProfile] = useState({
    name: user.profile.first_name + " " + user.profile.last_name,
    username: user.username,
    phone: user.phone,
    email: user.email,
    bio: user.bio,
    avatar: user.avatar,
  });

  console.log(user);

  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="text-center"
            >
              <Image src={profile.avatar !== null ? profile.avatar : pic} style={styles.proPic} />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card.Header className="bg-light pb-0 mt-3">
                <p style={styles.text}>
                  <b className="mr-3 ">Name:</b>
                  {profile.name}
                </p>
              </Card.Header>
              <Card.Header className="bg-light pb-0">
                <p style={styles.text}>
                  <b className="mr-3 pt-2">Username:</b>
                  {profile.username}
                </p>
              </Card.Header>
              <Card.Header className="bg-light pb-0">
                <p style={styles.text}>
                  <b className="mr-3 pt-2">Phone:</b>
                  {profile.phone}
                </p>
              </Card.Header>
              <Card.Header className="bg-light pb-0">
                <p style={styles.text}>
                  <b className="mr-3 pt-2">Email:</b>
                  {profile.email}
                </p>
              </Card.Header>
              <Card.Header className="bg-light pb-0">
                <p style={styles.text}>
                  <b className="mr-3 pt-2">Bio:</b> {profile.bio}
                </p>
              </Card.Header>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

const styles = {
  proPic: {
    height: "300px",
    width: "300px",
  },
  text: {
    opacity: "0.8",
    fontSize: "15px",
  },
};
