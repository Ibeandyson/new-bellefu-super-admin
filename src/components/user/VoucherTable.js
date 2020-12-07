import React, { useEffect, useState } from "react";
import { Card, Badge, Image, Button, Tooltip, OverlayTrigger, Row, Col, Container } from "react-bootstrap";
import { AiFillCheckCircle, AiFillStar, AiOutlineEye, AiOutlineHistory } from "react-icons/ai";
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
import { FcViewDetails } from "react-icons/fc";
import CustomSpinner from "../Spinner/Spinner";

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
    Probe vouchers
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (view)
const viewTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    View User
  </Tooltip>
);

export default function VoucherTable() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.adminSignin);
  const [load, setLoad] = useState(false);
  const [vouchers, setVouchers] = useState([]);
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
    Axios.get("https://bellefu.com/api/admin/review/resolve/" + _id, {
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
        fetchVouchers();
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
    Axios.get("https://bellefu.com/api/admin/review/probe/" + _id, {
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
        fetchVouchers();
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
    Axios.get("https://bellefu.com/api/admin/review/delete/" + _id, {
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
        fetchVouchers();
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

  function fetchVouchers() {
    setLoad(true);
    Axios.get("https://bellefu.com/api/admin/voucher/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setVouchers(res.data.vouchers.data);
        setNext(res.data.vouchers.next_page_url);
        setPages({
          current: res.data.vouchers.current_page,
          last: res.data.vouchers.last_page,
        });
      })
      .catch((err) => {
        setLoad(false);
        setVouchers([]);
        setNext([]);
        setPages({
          current: 0,
          last: 0,
        });
      });
  }

  useEffect(() => {
    fetchVouchers();
  }, []);

  //   HANDLES NEXT DATA

  const nextData = () => {
    Axios.get(next, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      setVouchers(vouchers.concat(res.data.vouchers.data));

      setNext(res.data.vouchers.next_page_url);
      setPages({
        current: res.data.vouchers.current_page,
        last: res.data.vouchers.last_page,
      });
    });
  };

  return (
    <div>
      {snack.view && <CustomAlert />}
      <Card className="border-0">
        <Card.Body>
          {load ? (
            <Spinner />
          ) : (
            <InfiniteScroll
              dataLength={vouchers.length}
              next={nextData}
              hasMore={pages.current !== pages.last ? true : false}
              loader={<CustomSpinner />}
              endMessage={<p style={{ textAlign: "center" }}></p>}
            >
              <table class="uk-table uk-table-responsive uk-table-divider">
                <thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
                  <tr>
                    <th style={{ color: "white", fontWeight: "bold" }}>Date</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Generated By</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Code</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Amount</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Consumed By</th>
                    {/* <th className="uk-table-expand" style={{ color: "white", fontWeight: "bold" }}>
                    Action
                  </th> */}
                  </tr>
                </thead>
                <tbody>
                  {vouchers.map((item, key) => (
                    <>
                      <tr key={key}>
                        <td>{format(new Date(item.created_at), "dd-MMM-yyy")}</td>
                        <td>
                          <p style={styles.name}>#{item.generated_by}</p>
                        </td>
                        <td>
                          <p style={styles.name}>{item.code}</p>
                        </td>
                        <td>
                          <p style={styles.name}>{item.amount} </p>
                        </td>
                        <td>
                          {item.consumed_by === null ? (
                            <Badge variant="success" style={{ padding: 5 }} className="ml-2">
                              active
                            </Badge>
                          ) : (
                            item.consumed_by
                          )}
                        </td>
                        {/* <td>
                        <div className="btn-group" role="group">
                          <Button variant="info">
                            <FcViewDetails />
                          </Button>
                          <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={blockTooltip}>
                            <Button
                              class="uk-button uk-button-default"
                              type="button"
                              size="sm"
                              variant="light"
                              onClick={() => {
                                handleResolveButton(item.id, "Are you sure you want to probe this resolve ?", resolveReview);
                              }}
                            >
                              <AiFillCheckCircle style={{ color: "green", fontSize: 24 }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={unblockTooltip}>
                            <Button
                              onClick={() => {
                                handleProbeButton(item.id, "Are you sure you want to probe this review ?", probeReview);
                              }}
                              class="uk-button uk-button-default"
                              type="button"
                              size="sm"
                              variant="light"
                            >
                              <AiOutlineHistory style={{ color: "blue", fontSize: 24 }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={deleteTooltip}>
                            <Button
                              onClick={() => {
                                handleDeleteButton(item.id, "Are you sure you want to delete this ?", deleteUser);
                              }}
                              size="sm"
                              variant="light"
                            >
                              <IoMdTrash style={{ color: "red", fontSize: 24 }} />
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td> */}
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </InfiniteScroll>
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
            fetchVouchers();
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
    minWidth: "150px",
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
