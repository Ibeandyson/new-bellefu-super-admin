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
import { AiOutlineTag, AiOutlineEye } from "react-icons/ai";
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

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (delete)
const deleteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Disable Country
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (Comfirm)
const editTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Enable Coutry
  </Tooltip>
);

export default function CountryList() {
  const { token } = useSelector((state) => state.adminSignin);
  const [load, setLoad] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loadCountries, setloadCountries] = useState({
    data: [],
    count: 20,
    new: 20,
  });
  const [action, setAction] = useState({
    view: false,
    id: "",
    message: "",
    action: () => {},
  });

  const handleAction = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action,
    });
  };

  function fetchCountry() {
    setLoad(true);
    Axios.get("https://dev.bellefu.com/api/admin/country/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setCountries(res.data.countries);
        const data = [];
        res.data.countries.forEach((item, index) => {
          if (index < loadCountries.count) {
            data.push(item);
          }
        });

        setloadCountries((prev) => ({
          ...prev,
          data: [...data],
        }));
      })
      .catch(() => {
        setLoad(false);
      });
  }

  useEffect(() => {
    fetchCountry();
  }, []);

  const nextData = () => {
    const newData = [];
    setloadCountries((prev) => ({
      ...prev,
      new: loadCountries.new + 20,
    }));

    countries.forEach((item, index) => {
      if (index < loadCountries.new + 20 && index > loadCountries.count) {
        newData.push(item);
      }
    });
    setTimeout(() => {
      setloadCountries((prev) => ({
        ...prev,
        data: loadCountries.data.concat(newData),
        count: loadCountries.count + 20,
      }));
    }, 1200);
  };

  console.log(loadCountries.data);

  const handleDisableButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action: action,
    });
  };

  const handleEnableButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action: action,
    });
  };

  const disableCountry = (title) => {
    Axios.get("https://dev.bellefu.com/api/admin/country/disable/" + title, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        fetchCountry();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const enableCountry = (title) => {
    Axios.get("https://dev.bellefu.com/api/admin/country/enable/" + title, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        fetchCountry();
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
              dataLength={loadCountries.data.length}
              next={nextData}
              hasMore={
                countries.length === loadCountries.data.length ? false : true
              }
              loader={<CustomSpinner />}
              endMessage={
                <p style={{ textAlign: "center" }}>Nothing else to see !</p>
              }
            >
              <table class="uk-table uk-table-responsive uk-table-divider">
                <thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
                  <tr>
                    <th
                      style={{ color: "white", fontWeight: "bold" }}
                      className="uk-table-expand"
                    >
                      Code
                    </th>
                    <th style={{ color: "white", fontWeight: "bold" }}>
                      Local Name
                    </th>
                    <th style={{ color: "white", fontWeight: "bold" }}>
                      Country Name
                    </th>
                    <th style={{ color: "white", fontWeight: "bold" }}>
                      Status
                    </th>
                    <th
                      className="uk-table-expand"
                      style={{ color: "white", fontWeight: "bold" }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loadCountries.data.map((item, key) => (
                    <tr>
                      <td>
                        <p style={styles.titel}>
                          {item.emoji}
                          {item.iso2}
                        </p>
                      </td>
                      <td>
                        <p style={styles.titel}>{item.native}</p>
                      </td>

                      <td>
                        <p style={styles.titel}>{item.name}</p>
                      </td>
                      <td>active</td>
                      <td>
                        <div className="btn-group" role="group">
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 50, hide: 100 }}
                            overlay={editTooltip}
                          >
                            <Button
                              size="sm"
                              onClick={() => {
                                handleEnableButton(
                                  item.slug,
                                  `Are you sure you want to enable ${item.name} ?`,
                                  enableCountry
                                );
                              }}
                              variant="light"
                            >
                              <Button variant="light">
                                <FcApproval
                                  style={{ color: "#fff", fontSize: 24 }}
                                />
                              </Button>
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 50, hide: 100 }}
                            overlay={deleteTooltip}
                          >
                            <Button
                              size="sm"
                              onClick={() => {
                                handleDisableButton(
                                  item.slug,
                                  `Are you sure you want to disable ${item.name} ?`,
                                  disableCountry
                                );
                              }}
                              variant="light"
                            >
                              <Button
                                style={{ marginLeft: 10 }}
                                variant="danger"
                              >
                                <TiCancel
                                  style={{ color: "#fff", fontSize: 24 }}
                                />
                              </Button>
                            </Button>
                          </OverlayTrigger>
                        </div>
                      </td>
                    </tr>
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
