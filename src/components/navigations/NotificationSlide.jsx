import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";

import { MdCancel } from "react-icons/md";
import { AiFillBell, AiOutlineArrowUp } from "react-icons/ai";
import { useSelector } from "react-redux";
import Axios from "axios";
import CustomSpinner from "../Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

export default function NotificationSlide({ notif, setNotif, setCount }) {
  const { token } = useSelector((state) => state.adminSignin);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState({
    current: 0,
    last: 0,
  });
  const [next, setNext] = useState("");

  useEffect(() => {
    setLoad(true);
    Axios.get("https://dev.bellefu.com/api/user/notification/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setData(res.data.notifications.data);
        setCount(res.data.notifications.total);
        setNext(res.data.notifications.next_page_url);
        setPages({
          current: res.data.notifications.current_page,
          last: res.data.notifications.last_page,
        });
      })
      .catch((err) => {
        setLoad(false);
        setData([]);
        setNext([]);
        setPages({
          current: 0,
          last: 0,
        });
      });
  }, []);

  const nextData = () => {
    setLoad(true);
    Axios.get(next, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      setLoad(false);
      setData(data.concat(res.data.notifications.data));
      setNext(res.data.notifications.next_page_url);
      setPages({
        current: res.data.notifications.current_page,
        last: res.data.notifications.last_page,
      });
    });
  };

  return (
    <div
      id="n-parent"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.id === "n-parent") {
          setNotif(!notif);
        }
      }}
      className={notif ? "_notif-bar open" : "_notif-bar"}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.89)",
          padding: "20px 15px",
          width: "100%",
          minWidth: 300,
          maxWidth: 420,
          marginLeft: "auto",
          overflowY: "scroll",
          overflowX: "hidden",
          zIndex: 5000,
          cursor: "unset"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            onClick={() => {
              setNotif(!notif);
            }}
            variant="transparent"
          >
            <MdCancel style={styles.close_icon} />
          </Button>
          <p style={{ color: "#fff", fontWeight: "bold" }}>Notifications</p>
        </div>
        <Row className="mt-2" style={{ minWidth: "100%", marginBottom: 10 }}>
          {data.map((item, key) => (
            <Col xs={12} className="mt-2">
              <Card className="border-0" style={styles.card}>
                <Card.Header style={{ backgroundColor: item.data.color }} className="">
                  <Link style={{ textDecoration: "none" }} to={item.data.action}>
                    <p className="_notification-title">{item.data.title}</p>
                  </Link>
                </Card.Header>
                <Card.Body>
                  <Link style={{ textDecoration: "none" }} to={item.data.action}>
                    <p className="_notification-message">{item.data.message}</p>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {pages.current < pages.last && load ? (
          <CustomSpinner />
        ) : pages.current < pages.last && !load ? (
          <Button onClick={nextData} style={{ color: "#ffa500" }} variant="transparent">
            See more...
          </Button>
        ) : null}
      </div>
    </div>
  );
}

const styles = {
  close_icon: {
    fontSize: "1.9em",
    color: "#ffa500",
  },
  title: {
    color: "white",
    fontSize: "0.7em",
    marginTop: "-100px",
    marginBottom: "-100px",
  },
  msg: {
    color: "black",
    fontSize: "0.7em",
    marginTop: "-10px",
    marginBottom: "-30px",
  },
  card: {
    minWidth: "100%",
    backgroundColor: "whitesmoke",
    maxWidth: 300,
    minHeight: 100,
  },
};
