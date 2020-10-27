import React from "react";
import { Card, Dropdown, Image } from "react-bootstrap";
import { GoDashboard } from "react-icons/go";
import {
  AiOutlineUser,
  AiOutlineGift,
  AiOutlineMessage,
  AiOutlineAccountBook,
  AiOutlineSetting,
} from "react-icons/ai";
import { TiGroupOutline } from "react-icons/ti";
import { IoMdTime, IoIosLogIn } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { FiList, FiUserPlus, FiUsers } from "react-icons/fi";
import pic from "../images/pic.jpg";
import { Link } from "react-router-dom";
export default function DashBoardNav() {
  return (
    <div>
      <Card className="border-0 ">
        <div className="p-2">
          <div className="text-center pt-3">
            <Image src={pic} style={styles.avater} roundedCircle />
          </div>
          <div className="p-3">
            <h6 className="p-3" style={styles.head}>
              Admin
            </h6>
            <ul style={styles.list}>
              <Link
                to="/admin_dashboard"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li
                  className="pb-3"
                  onMouseOver={listHover}
                  onMouseLeave={listHoverNone}
                >
                  <GoDashboard className="mr-3" style={styles.icon} />
                  Dasboard
                </li>
              </Link>
              <Link
                to="/admin_profile"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li
                  className="pb-3"
                  onMouseOver={listHover}
                  onMouseLeave={listHoverNone}
                >
                  <AiOutlineUser className="mr-3" style={styles.icon} />
                  Profile
                </li>
              </Link>
            </ul>
            <h6 className="p-3" style={styles.head}>
              Ads
            </h6>
            <ul style={styles.list}>
              <Link
                to="/active_ads"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li
                  className="pb-3"
                  onMouseOver={listHover}
                  onMouseLeave={listHoverNone}
                >
                  <AiOutlineGift className="mr-3" style={styles.icon} />
                  Active Ads
                </li>
              </Link>
              <Link
                to="/pending_ads"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li
                  className="pb-3"
                  onMouseOver={listHover}
                  onMouseLeave={listHoverNone}
                >
                  <IoMdTime className="mr-3" style={styles.icon} />
                  Pending Ads
                </li>
              </Link>
              <Link
                to="/expired_ads"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li
                  className="pb-3"
                  onMouseOver={listHover}
                  onMouseLeave={listHoverNone}
                >
                  <MdDateRange className="mr-3" style={styles.icon} />
                  Expired Ads
                </li>
              </Link>
            </ul>
            <h6 className="p-3" style={styles.head}>
              Category
            </h6>
            <ul style={styles.list}>
              <Link
                to="/category-list"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li
                  className="pb-3"
                  onMouseOver={listHover}
                  onMouseLeave={listHoverNone}
                >
                  <FiList className="mr-3" style={styles.icon} />
                  Category List
                </li>
              </Link>
              <Link
                to="/main_category"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li
                  className="pb-3"
                  onMouseOver={listHover}
                  onMouseLeave={listHoverNone}
                >
                  <FiUserPlus className="mr-3" style={styles.icon} />
                  Create Category
                </li>
              </Link>
              <Link
                to="/sub_category"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li
                  className="pb-3"
                  onMouseOver={listHover}
                  onMouseLeave={listHoverNone}
                >
                  <FiUsers className="mr-3" style={styles.icon} />
                  Create Sub Category
                </li>
              </Link>
            </ul>
            <h6 className="p-3" style={styles.head}>
              Account
            </h6>
            <ul style={styles.list}>
              <Link
                to="/user_list"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <li
                  className="pb-3"
                  onMouseOver={listHover}
                  onMouseLeave={listHoverNone}
                >
                  <TiGroupOutline className="mr-3" style={styles.icon} />
                  Users
                </li>
              </Link>

              <li
                className="pb-3"
                onMouseOver={listHover}
                onMouseLeave={listHoverNone}
              >
                <AiOutlineMessage className="mr-3" style={styles.icon} />
                Message
              </li>
              <li
                className="pb-3"
                onMouseOver={listHover}
                onMouseLeave={listHoverNone}
              >
                <AiOutlineAccountBook className="mr-3" style={styles.icon} />
                Transaction
              </li>
              <li
                className="pb-3"
                onMouseOver={listHover}
                onMouseLeave={listHoverNone}
              >
                <Dropdown>
                  <Dropdown.Toggle
                    style={{ padding: 0, fontSize: 13 }}
                    variant="transparent"
                    id="dropdown-basic"
                  >
                    <AiOutlineSetting className="mr-3" style={styles.icon} />
                    Settings
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      style={{ fontSize: 13 }}
                      href="/home-page-slider"
                    >
                      Home Page Slider
                    </Dropdown.Item>
                    <Dropdown.Item style={{ fontSize: 13 }} href="/country">
                      Country
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
              <li
                className="pb-0"
                onMouseOver={listHover}
                onMouseLeave={listHoverNone}
              >
                <IoIosLogIn className="mr-3" style={styles.icon} />
                Logout
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

const listHover = (e) => {
  e.target.style.color = "#ffa500";
};

const listHoverNone = (e) => {
  e.target.style.color = "black";
};

const styles = {
  list: {
    listStyleType: "none",
    fontSize: "13px",
    opacity: "0.7",
    cursor: "pointer",
    font: "bold",
  },
  head: {
    fontSize: "0.9em",
    color: "#ffa500",
  },
  avater: {
    height: "110px",
  },
};
