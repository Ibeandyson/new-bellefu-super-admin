import React, { useEffect, useState } from "react";
import {
  Card,
  Badge,
  Image,
  Button,
  Tooltip,
  OverlayTrigger,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import { FaLockOpen, FaLock } from "react-icons/fa";
import pic from "../images/pic.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUserAction,
  deleteUserAction,
  unblockUserAction,
} from "../../redux/action/userActions";
import ActionModal from "../components/ActionModal";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import Spinner from "../Spinner/Spinner";

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (delete)
const deleteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Delete User
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (block )
const blockTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Block User
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (unblock )
const unblockTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Unblock User
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (view)
const viewTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    View User
  </Tooltip>
);

export default function UsersListTable() {
  const dispatch = useDispatch();
  const { admin } = useSelector((state) => state.adminSignin);
  const [url, seturl] = useState("api/admin/customer/list/all");
  const [load, setLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    avatar: null,
    email: "",
    phone: "",
    bio: "",
    time: "",
    gender: "",
    username: "",
  });
  const [pages, setPages] = useState({
    current: 0,
    last: 0,
  });
  const [next, setNext] = useState([]);
  const [action, setAction] = useState({
    view: false,
    id: "",
    message: "",
    action: () => {},
  });
  const blockUser = (username) => {
    dispatch(blockUserAction(admin.token, username));
  };

  const unblockUser = (username) => {
    dispatch(unblockUserAction(admin.token, username));
  };

  const deleteUser = (username) => {
    dispatch(deleteUserAction(admin.token, username));
  };

  const handleDeleteButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action: deleteUser,
    });
  };

  const handleBlockButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action: blockUser,
    });
  };

  const handleUnblockButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action: unblockUser,
    });
  };

  //USE EFFECT FOR FETCHING USERS

  function fetchUserList() {
    setLoad(true);
    Axios.get("https://dev.bellefu.com/" + url, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setUsers(res.data.users.data);
        setNext(res.data.users.next_page_url);
        setPages({
          current: res.data.users.current_page,
          last: res.data.users.last_page,
        });
      })
      .catch((err) => {
        setLoad(false);
        setUsers([]);
        setNext([]);
        setPages({
          current: 0,
          last: 0,
        });
      });
  }

  useEffect(() => {
    fetchUserList();
  }, [url]);

  //   HANDLES NEXT DATA

  const nextData = () => {
    setLoad(true);
    Axios.get(next, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      setLoad(false);
      setUsers((prev) => [...prev, res.data.users.data]);
      setNext(res.data.users.next_page_url);
      setPages({
        current: res.data.users.current_page,
        last: res.data.users.last_page,
      });
    });
  };

  return (
    <div>
      <Card className="border-0">
        <Card.Header>
          <label htmlFor="url">Filter USER</label>
          <select
            name="url"
            id="url"
            className="custom-select"
            style={{ width: "100%" }}
            onChange={(e) => {
              seturl(e.target.value);
            }}
          >
            <option value="api/admin/customer/list/all">
              All Customer List
            </option>
            <option value="api/admin/customer/list/blocked">
              Blocked Customer List
            </option>
            <option value="api/admin/customer/list/phone/verified">
              Phone Verified Customer List
            </option>
            <option value="api/admin/customer/list/id/verified">
              ID Verified Customer List
            </option>
            <option value="api/admin/customer/list/kyc/verified">
              KYC Verified Customer List
            </option>
          </select>
        </Card.Header>
        <Card.Body>
          {load ? (
            <Spinner />
          ) : (
            <table class="uk-table uk-table-responsive uk-table-divider">
              <thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
                <tr>
                  <th
                    style={{ color: "white", fontWeight: "bold" }}
                    className="uk-table-expand"
                  >
                    avater
                  </th>
                  <th style={{ color: "white", fontWeight: "bold" }}>Name</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>Email</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>Sex</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>Status</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>Joined</th>
                  <th
                    className="uk-table-expand"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, key) => (
                  <tr key={key}>
                    <td>
                      <Image
                        src={user.avatar === null ? pic : user.avatar}
                        style={styles.image}
                        roundedCircle
                      />
                    </td>
                    <td>
                      <p style={styles.name}>
                        {item.profile.first_name + " " + item.profile.last_name}
                      </p>
                    </td>
                    <td>
                      <p style={styles.name}>{item.email} </p>
                    </td>
                    <td>{item.profile.gender === "M" ? "Male" : "Female"}</td>
                    <td>
                      {item.status.toLowerCase() === "active" ? (
                        <Badge variant="primary" className="ml-2">
                          {item.status}
                        </Badge>
                      ) : (
                        <Badge variant="danger" className="ml-2">
                          {item.status}
                        </Badge>
                      )}
                      {item.verification_level !== "none" ? (
                        <Badge variant="success" className="ml-2">
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="danger" className="ml-2">
                          Unverified
                        </Badge>
                      )}
                    </td>
                    <td>
                      {differenceInCalendarDays(
                        new Date(),
                        new Date(item.profile.created_at)
                      )}{" "}
                      days
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 50, hide: 100 }}
                          overlay={viewTooltip}
                        >
                          <Button
                            onClick={() => {
                              const obj = users.find(
                                (o, index) => index === key
                              );
                              setUser({
                                name:
                                  obj.profile.first_name +
                                  " " +
                                  obj.profile.last_name,
                                avatar: obj.avatar,
                                email: obj.email,
                                phone: obj.phone,
                                bio: obj.bio,
                                time: differenceInCalendarDays(
                                  new Date(),
                                  new Date(obj.profile.created_at)
                                ),
                                gender: obj.profile.gender,
                                username: obj.username,
                              });
                            }}
                            class="uk-button uk-button-default"
                            type="button"
                            uk-toggle="target: #offcanvas-flip"
                            size="sm"
                            variant="light"
                          >
                            <AiOutlineEye style={{ color: "#ffa500" }} />
                          </Button>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 50, hide: 100 }}
                          overlay={blockTooltip}
                        >
                          <Button
                            class="uk-button uk-button-default"
                            type="button"
                            size="sm"
                            variant="light"
                            onClick={() => {
                              handleBlockButton(
                                item.username,
                                `Are you sure you want to block ${
                                  item.profile.first_name +
                                  " " +
                                  item.profile.last_name
                                }`,
                                blockUser
                              );
                            }}
                          >
                            <FaLock style={{ color: "black" }} />
                          </Button>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 50, hide: 100 }}
                          overlay={unblockTooltip}
                        >
                          <Button
                            onClick={() => {
                              handleUnblockButton(
                                item.username,
                                `Are you sure you want to unblock ${
                                  item.profile.first_name +
                                  " " +
                                  item.profile.last_name
                                }`,
                                unblockUser
                              );
                            }}
                            class="uk-button uk-button-default"
                            type="button"
                            size="sm"
                            variant="light"
                          >
                            <FaLockOpen style={{ color: "green" }} />
                          </Button>
                        </OverlayTrigger>

                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 50, hide: 100 }}
                          overlay={deleteTooltip}
                        >
                          <Button
                            onClick={() => {
                              handleDeleteButton(
                                item.username,
                                `Are you sure you want to delete ${
                                  item.profile.first_name +
                                  " " +
                                  item.profile.last_name
                                }`,
                                deleteUser
                              );
                            }}
                            size="sm"
                            variant="light"
                          >
                            <IoMdTrash style={{ color: "red" }} />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                ))}
                <InfiniteScroll
                  dataLength={users.length}
                  next={nextData}
                  hasMore={pages.current !== pages.last ? true : false}
                  loader={
                    <h4 style={{ textAlign: "center", color: "gray" }}>
                      Loading...
                    </h4>
                  }
                  endMessage={<p style={{ textAlign: "center" }}></p>}
                ></InfiniteScroll>
              </tbody>
            </table>
          )}
        </Card.Body>
      </Card>

      {/* ============OFFCANVA FOR VIEW USER========== */}
      <div
        id="offcanvas-flip"
        uk-offcanvas="flip: true; overlay: true"
        style={{ marginTop: "4%" }}
      >
        <div class="uk-offcanvas-bar" style={{ width: "80%" }}>
          <MdCancel
            style={styles.close_icon}
            className="uk-offcanvas-close"
            uk-close
            type="button"
          />
          <Container>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card className="border-0">
                  <Card.Header style={{ backgroundColor: "#76ba1b" }}>
                    <b style={{ color: "white" }}>User Info</b>
                  </Card.Header>
                  <Card.Body>
                    <ProfileInfo user={user} />
                  </Card.Body>
                </Card>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                className="mt-4"
              ></Col>
            </Row>
          </Container>
        </div>
      </div>
      <ActionModal
        show={action.view}
        text={action.message}
        handleYes={() => {
          action.action(action.id);
          setAction((prev) => ({
            ...prev,
            view: false,
          }));
          setTimeout(() => {
            fetchUserList();
          }, 1000);
        }}
        handleNo={() => {
          setAction((prev) => ({
            ...prev,
            view: false,
          }));
        }}
      />
    </div>
  );
}

function ProfileInfo({ user }) {
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
              <Image
                src={user.avatar === null ? pic : user.avatar}
                style={styles.proPic}
              />
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card.Header className="bg-light pb-0 mt-3">
                <p style={styles.proText}>
                  <b className="mr-3 ">Name:</b>
                  {user.name}
                </p>
              </Card.Header>
              <Card.Header className="bg-light pb-0">
                <p style={styles.proText}>
                  <b className="mr-3 pt-2">Username:</b>
                  {user.username}
                </p>
              </Card.Header>
              <Card.Header className="bg-light pb-0">
                <p style={styles.proText}>
                  <b className="mr-3 pt-2">Sex:</b>
                  {user.gender}
                </p>
              </Card.Header>
              <Card.Header className="bg-light pb-0">
                <p style={styles.proText}>
                  <b className="mr-3 pt-2">Phone:</b>
                  {user.phone}
                </p>
              </Card.Header>
              <Card.Header className="bg-light pb-0">
                <p style={styles.proText}>
                  <b className="mr-3 pt-2">Email:</b>
                  {user.email}
                </p>
              </Card.Header>
              <Card.Header className="bg-light pb-0">
                <p style={styles.proText}>
                  <b className="mr-3 pt-2">Joined:</b>
                  {user.time}
                </p>
              </Card.Header>
              <Card.Header className="bg-light pb-0">
                <p style={styles.proText}>
                  <b className="mr-3 pt-2">Bio:</b>
                  {user.bio}
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
  image: {
    height: "50px",
  },
  proPic: {
    height: "300px",
    width: "300px",
  },
  proText: {
    opacity: "0.8",
    fontSize: "15px",
    color: "black",
  },
  avater: {
    height: "100px",
  },
  iconD: {
    color: "#ffa500",
    fontSize: "30px",
  },
  text: {
    fontSize: "15px",
    color: "black",
  },
  icon: {
    fotsize: "30px",
    color: "#ffa500",
  },
  close_icon: {
    fontSize: "1.9em",
    color: "#ffa500",
  },
  name: {
    opacity: "0.9",
    fontSize: "15px",
    width: "150px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  category: {
    fontSize: "0.7em",
    color: "#ffa500",
    backgroundColor: "whitesmoke",
    padding: "3px",
  },
  subCategory: {
    fontSize: "0.7em",
    color: "#ffa500",
    backgroundColor: "whitesmoke",
    padding: "3px",
  },
  location: {
    fontSize: "0.7em",
  },
  date: {
    fontSize: "0.7em",
  },
  price: {
    fontSize: "0.9em",
    color: "#ffa500",
    backgroundColor: "whitesmoke",
    padding: "3px",
  },
};
