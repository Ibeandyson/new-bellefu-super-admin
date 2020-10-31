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
import {
  AiFillCheckCircle,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHistory,
} from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

import { FaLockOpen, FaLock } from "react-icons/fa";
import pic from "../images/pic.jpg";
import { useDispatch, useSelector } from "react-redux";
import ActionModal from "../components/ActionModal";
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import Spinner from "../Spinner/Spinner";
import { format } from "date-fns";
import CustomAlert from "../components/Alert";

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (delete)
const deleteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Delete Review
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (block )
const blockTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Resolve Review
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (unblock )
const unblockTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Probe Reviews
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (view)
const viewTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    View User
  </Tooltip>
);

function ratingStar({ rating }) {
  return (
    <>
      {Number(rating) === 0 ? (
        ""
      ) : Number(rating) === 1 ? (
        <>
          <AiFillStar style={{ color: "#ffa500" }} />
        </>
      ) : Number(rating) === 2 ? (
        <>
          <AiFillStar style={{ color: "#ffa500" }} />
          <AiFillStar style={{ color: "#ffa500" }} />
        </>
      ) : Number(rating) === 3 ? (
        <>
          <AiFillStar style={{ color: "#ffa500" }} />
          <AiFillStar style={{ color: "#ffa500" }} />
          <AiFillStar style={{ color: "#ffa500" }} />
        </>
      ) : Number(rating) === 1 ? (
        <>
          <AiFillStar style={{ color: "#ffa500" }} />
          <AiFillStar style={{ color: "#ffa500" }} />
          <AiFillStar style={{ color: "#ffa500" }} />
          <AiFillStar style={{ color: "#ffa500" }} />
        </>
      ) : Number(rating) === 1 ? (
        <>
          <AiFillStar style={{ color: "#ffa500" }} />
          <AiFillStar style={{ color: "#ffa500" }} />
          <AiFillStar style={{ color: "#ffa500" }} />
          <AiFillStar style={{ color: "#ffa500" }} />
          <AiFillStar style={{ color: "#ffa500" }} />
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default function ReviewTable() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.adminSignin);
  const [url, seturl] = useState("api/admin/review/list/all");
  const [load, setLoad] = useState(false);
  const [reviews, setreviews] = useState([]);
  const [pages, setPages] = useState({
    current: 0,
    last: 0,
  });
  const [snack, setSnack] = useState({
    view: false,
    message: "",
    type: "",
  });
  const [next, setNext] = useState([]);
  const [action, setAction] = useState({
    view: false,
    id: "",
    message: "",
    action: () => {},
  });
  const resolveReview = (_id) => {
    Axios.get("https://dev.bellefu.com/api/admin/review/resolve/" + _id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        setSnack({
          view: true,
          message: "Resolve successful",
          type: "success",
        });
        fetchReviews();
        setTimeout(() => {
          setSnack({
            view: false,
            message: "",
            type: "",
          });
        }, 2300);
      })
      .catch(() => {
        setSnack({
          view: true,
          message: "Opps, something went wrong",
          type: "error",
        });

        setTimeout(() => {
          setSnack({
            view: false,
            message: "",
            type: "",
          });
        }, 2300);
      });
  };

  const probeReview = (_id) => {
    Axios.get("https://dev.bellefu.com/api/admin/review/probe/" + _id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        setSnack({
          view: true,
          message: "Probe successful",
          type: "success",
        });
        fetchReviews();
        setTimeout(() => {
          setSnack({
            view: false,
            message: "",
            type: "",
          });
        }, 2300);
      })
      .catch(() => {
        setSnack({
          view: true,
          message: "Opps, something went wrong",
          type: "error",
        });

        setTimeout(() => {
          setSnack({
            view: false,
            message: "",
            type: "",
          });
        }, 2300);
      });
  };

  const deleteUser = (_id) => {
    Axios.get("https://dev.bellefu.com/api/admin/review/delete/" + _id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        setSnack({
          view: true,
          message: "Delete successful",
          type: "success",
        });
        fetchReviews();
        setTimeout(() => {
          setSnack({
            view: false,
            message: "",
            type: "",
          });
        }, 2300);
      })
      .catch(() => {
        setSnack({
          view: true,
          message: "Opps, something went wrong",
          type: "error",
        });

        setTimeout(() => {
          setSnack({
            view: false,
            message: "",
            type: "",
          });
        }, 2300);
      });
  };

  const handleDeleteButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action,
    });
  };

  const handleResolveButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action,
    });
  };

  const handleProbeButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action,
    });
  };

  //USE EFFECT FOR FETCHING reviews

  function fetchReviews() {
    setLoad(true);
    Axios.get("https://dev.bellefu.com/" + url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setreviews(res.data.reviews.data);
        setNext(res.data.reviews.next_page_url);
        setPages({
          current: res.data.reviews.current_page,
          last: res.data.reviews.last_page,
        });
      })
      .catch((err) => {
        setLoad(false);
        setreviews([]);
        setNext([]);
        setPages({
          current: 0,
          last: 0,
        });
      });
  }

  useEffect(() => {
    fetchReviews();
  }, [url]);

  //   HANDLES NEXT DATA

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
      setreviews((prev) => [...prev, res.data.reviews.data]);
      setNext(res.data.reviews.next_page_url);
      setPages({
        current: res.data.reviews.current_page,
        last: res.data.reviews.last_page,
      });
    });
  };

  return (
    <div>
      {snack.view && <CustomAlert />}
      <Card className="border-0">
        <Card.Header>
          <label htmlFor="url">Filter Reviews</label>
          <select
            name="url"
            id="url"
            className="custom-select"
            style={{ width: "100%" }}
            onChange={(e) => {
              seturl(e.target.value);
            }}
          >
            <option value="api/admin/review/list/all">All Reviews</option>
            <option value="api/admin/review/list/pending">
              Pending Reviews
            </option>
            <option value="api/admin/review/list/probing">
              Probing Reviews
            </option>
            <option value="api/admin/review/list/resolved">
              Resolved Reviews
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
                  <th style={{ color: "white", fontWeight: "bold" }}>Date</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>
                    Product
                  </th>
                  <th style={{ color: "white", fontWeight: "bold" }}>
                    Product Id
                  </th>
                  <th style={{ color: "white", fontWeight: "bold" }}>User</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>rating</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>Status</th>
                  <th
                    className="uk-table-expand"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((item, key) => (
                  <>
                    <tr key={key}>
                      <td>{format(new Date(item.created_at), "dd-MMM-yyy")}</td>
                      <td>
                        <p style={styles.name}>{item.product.title}</p>
                      </td>
                      <td>
                        <p style={styles.name}>#{item.product_id}</p>
                      </td>
                      <td>
                        <p style={styles.name}>{item.user.username} </p>
                      </td>
                      <td>
                        <ratingStar rating={item.rating} />
                      </td>
                      <td>
                        <Badge variant="primary" className="ml-2">
                          {item.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
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
                                handleResolveButton(
                                  item.id,
                                  "Are you sure you want to probe this resolve ?",
                                  resolveReview
                                );
                              }}
                            >
                              <AiFillCheckCircle
                                style={{ color: "green", fontSize: 24 }}
                              />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 50, hide: 100 }}
                            overlay={unblockTooltip}
                          >
                            <Button
                              onClick={() => {
                                handleProbeButton(
                                  item.id,
                                  "Are you sure you want to probe this review ?",
                                  probeReview
                                );
                              }}
                              class="uk-button uk-button-default"
                              type="button"
                              size="sm"
                              variant="light"
                            >
                              <AiOutlineHistory
                                style={{ color: "blue", fontSize: 24 }}
                              />
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
                                  item.id,
                                  "Are you sure you want to delete this ?",
                                  deleteUser
                                );
                              }}
                              size="sm"
                              variant="light"
                            >
                              <IoMdTrash
                                style={{ color: "red", fontSize: 24 }}
                              />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="6">
                        {" "}
                        <b>Message :</b> {item.message}
                      </td>
                    </tr>
                  </>
                ))}
                <InfiniteScroll
                  dataLength={reviews.length}
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
            fetchReviews();
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
