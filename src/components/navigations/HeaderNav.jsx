import React, { useState } from "react";
import { Navbar, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import SideNav from "../navigations/SideNav";
import NotificationSlide from "../navigations/NotificationSlide";
import logo from "../images/logo.png";
import { AiFillBell } from "react-icons/ai";

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (CHANGE CONTRY)
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Change Contry
  </Tooltip>
);

//THIS IS A HEADER COMPOENT
export default function HeaderNav() {
  const [toggleNotification, setTogglenotification] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <div>
      <Navbar style={styles.head} className=" shadow-sm fixed-top">
        <Navbar.Brand href="#home">
          <img src={logo} style={styles.logo} />
        </Navbar.Brand>
        <Navbar.Brand href="#home">
          <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
            <Button variant="outline-warning" style={styles.contrey_btn}>
              country
            </Button>
          </OverlayTrigger>
        </Navbar.Brand>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Brand styles={styles.language}>
            <Button
              style={{ position: "relative" }}
              variant="transparent"
              onClick={() => {
                setTogglenotification(!toggleNotification);
              }}
            >
              <AiFillBell style={{ color: "white", fontSize: "1.2em", cursor: "pointer" }} />
              <span style={styles.notfiCount} className="text-center ">
                {count}
              </span>
            </Button>
          </Navbar.Brand>
          <Navbar.Brand styles={styles.language}>
            <Button variant="warning" style={styles.post_free_add_btn}>
              EN
            </Button>
          </Navbar.Brand>
          <Navbar.Brand className="d-lg-none d-xs-block  d-sm-block d-md-block">
            <SideNav />
          </Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
      <NotificationSlide setCount={setCount} notif={toggleNotification} setNotif={setTogglenotification} />
    </div>
  );
}

//THE COMPONET STYLES GOES HERE.....
const styles = {
  head: {
    backgroundColor: "#76ba1b",
  },
  post_free_add_btn: {
    color: "white",
    backgroundColor: "#ffa500",
    border: "none",
  },
  auth: {
    color: "white",
  },
  contrey_btn: {
    color: "white",
    fontSize: "0.6em",
  },
  logo: {
    height: "30px",
    backgroundColor: "white",
    borderRadius: "5px",
  },

  nav_icon: {
    border: "5px solid red",
  },
  notfiCount: {
    color: "white",
    fontSize: 13,
    backgroundColor: "red",
    position: "absolute",
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    top: 2,
    right: 2,
  },
};
