import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";

import { MdCancel } from "react-icons/md";
import { AiFillBell, AiFillDelete, AiOutlineArrowUp } from "react-icons/ai";
import { useSelector } from "react-redux";
import Axios from "axios";
import CustomSpinner from "../Spinner/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import img from "../images/notifSpinner.svg";
import { Link } from "react-router-dom";

export default function NotificationSlide({ notif, setNotif, setCount }) {
  const { token } = useSelector((state) => state.adminSignin);
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [del, setdel] = useState([]);
  const [pages, setPages] = useState({
    current: 0,
    last: 0,
  });
  const [next, setNext] = useState("");

  function fetchNotif() {
    setLoad(true);
    setdel([]);
    Axios.get("https://bellefu.com/api/user/notification/list", {
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
        res.data.notifications.data.map(() => {
          setdel((prev) => [...prev, <AiFillDelete style={{ color: "#fff", fontSize: 24 }} />]);
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
  }

  useEffect(() => {
    fetchNotif();
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

  const handleReadOne = (id) => {
    Axios.get("https://bellefu.com/api/user/notification/read/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(() => {
      fetchNotif();
    });
  };

  const handleReadAll = () => {
    Axios.get("https://bellefu.com/api/user/notification/read/all", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(() => {
      fetchNotif();
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
          cursor: "unset",
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
          <div>
            <p style={{ color: "#fff", fontWeight: "bold" }}>Notifications</p>
            <Button onClick={handleReadAll} variant="transparent" style={{ marginLeft: "auto", color: "#ffa500", padding: 0 }}>
              Mark all as read
            </Button>
          </div>
        </div>
        <Row className="mt-2" style={{ minWidth: "100%", marginBottom: 10 }}>
          {data.map((item, key) => (
            <Col key={key} xs={12} className="mt-2">
              <Card className="border-0" style={styles.card}>
                <Card.Header style={{ backgroundColor: item.data.color, display: "flex", alignItems: "center", justifyContent: "center" }} className="">
                  <p className="_notification-title">{item.data.title}</p>
                  <Button
                    onClick={(e) => {
                      handleReadOne(item.id);
                    }}
                    variant="transparent"
                    style={{ marginLeft: "auto", color: "#ffa500", padding: 0, textDecoration: "underline" }}
                  >
                    Mark as read
                  </Button>
                </Card.Header>
                <Link
                  onClick={(e) => {
                    handleReadOne(item.id);
                  }}
                  style={{ textDecoration: "none" }}
                  to={item.data.action}
                >
                  <Card.Body>
                    <Link style={{ textDecoration: "none" }} to={item.data.action}>
                      <p className="_notification-message">{item.data.message}</p>
                    </Link>
                  </Card.Body>
                </Link>
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
