import React, { Fragment, useEffect, useState } from "react";
import { Card, Badge, Image, Button, Tooltip, OverlayTrigger, Row, Col, Container, InputGroup, FormControl } from "react-bootstrap";
import { AiOutlineTag, AiOutlineEye, AiFillDelete, AiFillEdit, AiOutlineUpload, AiFillCloseCircle, AiOutlineCheck, AiOutlineHistory } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdDateRange, MdCancel, MdLocationOn } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { FcApproval, FcCancel, FcCheckmark } from "react-icons/fc";
import Axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import ActionModal from "../components/ActionModal";
import CustomSpinner from "../Spinner/Spinner";
import { TiCancel } from "react-icons/ti";
import ImageModal from "../components/ImageModal";

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (delete)
const deleteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Confirm KYC verification
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (Comfirm)
const editTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Decline KYC verification
  </Tooltip>
);

const processTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Process KYC verification
  </Tooltip>
);

const EditInput = ({ action, setAction, fetchData }) => {
  const { token } = useSelector((state) => state.adminSignin);
  const [updateData, setUpdateData] = useState({
    message: "",
    error: "",
  });

  const handleNameChange = (event) => {
    const { value, name } = event.target;

    setUpdateData({ ...updateData, [name]: value });
  };
  const editSubcategory = (_id) => {
    const payload = new FormData();
    let url = "";
    payload.append("verification_id", action.id);

    if (action.message === "Process") {
      payload.append("message", updateData.message);
      url = "https://dev.bellefu.com/api/admin/verification/process/kyc";
    } else {
      payload.append("decline_reason", updateData.message);
      url = "https://dev.bellefu.com/api/admin/verification/decline/kyc";
    }

    Axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        fetchData();
        setAction((prev) => ({
          ...prev,
          view: false,
        }));
      })
      .catch((err) => {
        setUpdateData((prev) => ({
          ...prev,
          error: "Opps, looks like there was an error!",
        }));
      });
  };
  return (
    <ActionModal
      show={action.view}
      handleYes={() => {
        editSubcategory(action.id);
      }}
      handleNo={() => {
        setAction((prev) => ({
          ...prev,
          view: false,
        }));
      }}
    >
      <p className="text-center">Are you sure you want to {action.message === "Process" ? "Process" : "Decline"} the verification with id {action.id} ?</p>
      <InputGroup>
        <textarea
          style={{ marginTop: 5, width: "100%", padding: "10px" }}
          rows={4}
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Enter reason ..."
          name="message"
          value={updateData.message}
          onChange={handleNameChange}
        ></textarea>
      </InputGroup>
      <small className="text-danger">{updateData.error}</small>
    </ActionModal>
  );
};

export default function KycVerify() {
  const { token } = useSelector((state) => state.adminSignin);
  const [load, setLoad] = useState(false);

  const [data, setData] = useState([]);
  const [action, setAction] = useState({
    view: false,
    id: "",
    message: "",
    action: () => {},
  });
  const [pages, setPages] = useState({
    current: 0,
    last: 0,
  });
  const [next, setNext] = useState("");

  const handleAction = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action,
    });
  };

  function fetchData() {
    setLoad(true);
    Axios.get("https://dev.bellefu.com/api/admin/verification/list/kyc", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setData(res.data.verifications.data);
        setNext(res.data.verifications.next_page_url);
        setPages({
          current: res.data.verifications.current_page,
          last: res.data.verifications.last_page,
        });
      })
      .catch(() => {
        setLoad(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleApproveButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action: action,
    });
  };

  const handleProcessButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action: action,
    });
  };

  const handleDeclineButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action: action,
    });
  };

  const nextData = () => {
    Axios.get(next, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      setData(data.concat(res.data.verifications.data));
      setNext(res.data.verifications.next_page_url);
      setPages({
        current: res.data.verifications.current_page,
        last: res.data.verifications.last_page,
      });
    });
  };

  const approveId = (_id) => {
    Axios.get("https://dev.bellefu.com/api/admin/verification/approve/kyc/" + _id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        fetchData();
        setAction((prev) => ({
          ...prev,
          view: false,
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          {load ? (
            <CustomSpinner />
          ) : (
            <InfiniteScroll
              dataLength={data.length}
              next={nextData}
              hasMore={pages.current === pages.last ? false : true}
              loader={<CustomSpinner />}
              endMessage={<p style={{ textAlign: "center" }}>Nothing else to see !</p>}
            >
              <div style={{ overflowX: "scroll" }}>
                <table class="uk-table uk-table-responsive uk-table-divider">
                  <thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
                    <tr>
                      <th
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          width: 60,
                          maxWidth: 10,
                        }}
                        className="uk-table-expand"
                      >
                        #ID
                      </th>
                      <th style={{ color: "white", fontWeight: "bold" }}>Date</th>
                      <th style={{ color: "white", fontWeight: "bold" }}>Username</th>
                      <th style={{ color: "white", fontWeight: "bold" }}>User Email</th>
                      <th style={{ color: "white", fontWeight: "bold" }}>User Location</th>
                      <th style={{ color: "white", fontWeight: "bold" }}>Status</th>
                      <th
                        className="uk-table-expand"
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          minWidth: 190,
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, key) => (
                      <Fragment key={key}>
                        <tr>
                          <td>
                            <p style={styles.titel}>{item.id}</p>
                          </td>
                          <td>
                            <p style={styles.titel}>{format(new Date(item.created_at), "dd-MMM-yyyy hh:mm")}</p>
                          </td>

                          <td>
                            <p style={styles.titel}>{item.user.username}</p>
                          </td>

                          <td>{item.user.email}</td>

                          <td>
                            <p style={styles.titel}>{item.user.country.name}</p>
                          </td>
                          <td>
                            {item.status === "declined" ? (
                              <Badge variant="danger">{item.status}</Badge>
                            ) : item.status === "completed" ? (
                              <Badge variant="success">{item.status}</Badge>
                            ) : (
                              <Badge variant="info">{item.status}</Badge>
                            )}
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={deleteTooltip}>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    handleApproveButton(item.id, `Are you sure you want to verify verification with id #${item.id} ?`, approveId);
                                  }}
                                  disabled={item.status !== "pending"}
                                  style={{ marginRight: 10 }}
                                  variant="success"
                                >
                                  <AiOutlineCheck style={{ color: "#fff", fontSize: 24 }} />
                                </Button>
                              </OverlayTrigger>

                              <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={processTooltip}>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    handleProcessButton(item.id, `Process`, approveId);
                                  }}
                                  disabled={item.status !== "pending"}
                                  style={{ marginRight: 10 }}
                                  variant="info"
                                >
                                  <AiOutlineHistory style={{ color: "#fff", fontSize: 24 }} />
                                </Button>
                              </OverlayTrigger>

                              <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={editTooltip}>
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() => {
                                    handleDeclineButton(item.id, "EDIT");
                                  }}
                                  disabled={item.status !== "pending"}
                                >
                                  <AiFillCloseCircle style={{ color: "#fff", fontSize: 24 }} />
                                </Button>
                              </OverlayTrigger>
                            </div>
                          </td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </InfiniteScroll>
          )}
        </Card.Body>
      </Card>
      {action.message !== "EDIT" ||
        (action.message !== "Process" && (
          <ActionModal
            show={action.view}
            text={action.message}
            handleYes={() => {
              action.action(action.id);
            }}
            handleNo={() => {
              setAction((prev) => ({
                ...prev,
                view: false,
              }));
            }}
          />
        ))}
      {action.message === "EDIT" || (action.message === "Process" && <EditInput action={action} setAction={setAction} fetchData={fetchData} />)}
    </div>
  );
}

const styles = {
  image: {
    height: "100px",
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
  titel: {
    opacity: "0.9",
    fontSize: "20px",
    width: "300px",
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
