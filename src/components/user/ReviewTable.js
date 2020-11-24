import React, { useEffect, useState } from "react";
import { Card, Badge, Image, Button, Tooltip, OverlayTrigger, Row, Col, Container } from "react-bootstrap";
import { AiFillCheckCircle, AiFillStar, AiOutlineEye, AiOutlineHistory } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import {  AiFillPhone, AiFillEye } from "react-icons/ai";
import {  MdLocationOn } from "react-icons/md";
import { IoIosArrowDroprightCircle, IoIosTime, IoIosArrowDropleftCircle, IoMdMailOpen } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { FaSlackHash } from "react-icons/fa";
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
  const [ad, setad] = useState({
    name: "",
    phone: "",
    description: "",
    images: [],
    email: "",
    name: "",
    price: "",
    likeCount: "",
    created: "",
    id: "",
    city: "",
    country: "",
    views: 0,
    slug: "",
  });
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
    Axios.get("https://bellefu.com/" + url, {
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
            <option value="api/admin/review/list/pending">Pending Reviews</option>
            <option value="api/admin/review/list/probing">Probing Reviews</option>
            <option value="api/admin/review/list/resolved">Resolved Reviews</option>
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
                  <th style={{ color: "white", fontWeight: "bold" }}>Product</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>Product Id</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>User</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>rating</th>
                  <th style={{ color: "white", fontWeight: "bold" }}>Status</th>
                  <th className="uk-table-expand" style={{ color: "white", fontWeight: "bold" }}>
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
                          <Button
                            class="uk-button uk-button-default"
                            type="button"
                            uk-toggle="target: #offcanvas-flip"
                            size="sm"
                            variant="light"
                            onClick={() => {
                              const obj = reviews.find((o, index) => index === key);
                              setad({
                                name: obj.product.user.username,
                                price: obj.product.currency_symbol + obj.product.price,
                                likeCount: obj.product.favourites_count,
                                phone: obj.product.phone,
                                description: obj.product.description,
                                images: obj.product.images,
                                created: format(new Date(item.created_at), "dd-MMM-yyyy"),
                                email: obj.product.user.email,
                                id: obj.product.id,
                                city: obj.product.city,
                                country: obj.product.country.native,
                                views: obj.product.inorganic_views,
                                isFave: obj.product.is_user_favourite,
                                plan: obj.product.plan,
                                title: obj.product.title,
                                slug: obj.product.slug,
                              });
                            }}
                          >
                            <AiOutlineEye style={{ color: "#ffa500" }} />
                          </Button>
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
                  loader={<h4 style={{ textAlign: "center", color: "gray" }}>Loading...</h4>}
                  endMessage={<p style={{ textAlign: "center" }}></p>}
                ></InfiniteScroll>
              </tbody>
            </table>
          )}
        </Card.Body>
      </Card>

      {/* ============OFFCANVA FOR VIEW AD========== */}
      <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true" style={{ marginTop: "4%" }}>
        <div class="uk-offcanvas-bar" style={{ width: "80%" }}>
          <MdCancel style={styles.close_icon} className="uk-offcanvas-close" uk-close type="button" />
          <Container>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <Card className="border-0">
                  <Card.Header style={{ backgroundColor: "#76ba1b" }}>
                    <b style={{ color: "white" }}> Ad</b>
                  </Card.Header>
                  <Card.Body>
                    <ProductTitle ad={ad} />
                    <div
                      class="uk-position-relative uk-visible-toggle uk-dark"
                      tabindex="-1"
                      uk-slideshow="animation: pull"
                      uk-slideshow="min-height: 100; max-height: 400"
                    >
                      <ul uk-lightbox="animation: slide" class="uk-slideshow-items">
                        {ad.images.map((item, index) => (
                          <li>
                            <a class="uk-cover-container uk-inline" href={"https://bellefu.com/images/products/" + item} data-caption={"Caption " + index}>
                              <img src={"https://bellefu.com/images/product/" + ad.slug + "/" + item} alt="" uk-cover />
                            </a>
                          </li>
                        ))}
                      </ul>

                      <button
                        class="uk-border-pill uk-button uk-button-default uk-button-small uk-position-center-left  "
                        href="#"
                        uk-slidenav-previous
                        uk-slideshow-item="previous"
                      >
                        <IoIosArrowDropleftCircle style={{ fontSize: "2em", color: "#ffa500" }} />
                      </button>
                      <button
                        class="uk-border-pill uk-button uk-border-remove uk-button-default uk-button-small  uk-position-center-right  "
                        href="#"
                        uk-slidenav-next
                        uk-slideshow-item="next"
                      >
                        <IoIosArrowDroprightCircle style={{ fontSize: "2em", color: "#ffa500" }} />
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-4">
                <AdDetails ad={ad} />
              </Col>
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

function ProductTitle({ ad }) {
  return (
    <div>
      {/* ===FOR DESKTOP VIEW=== */}
      <div className="d-none d-lg-block  d-md-none" style={{ marginBottom: "15px" }}>
        <span
          className="mb-5"
          style={{
            fontSize: "15px",

            color: "black",
          }}
        >
          <b>{ad.title}</b>
        </span>
        <Badge variant="success" style={{ padding: "5px 10px" }} className="ml-2">
          {ad.plan}
        </Badge>

        {ad.isFave && (
          <Badge style={{ padding: "5px 10px" }} variant="info" className="ml-2">
            user favourite
          </Badge>
        )}
      </div>

      {/* ===FOR MOBILE VIEW=== */}
      <div className=" d-lg-none  d-xs-block d-sm-block d-md-block " style={{ marginBottom: "15px" }}>
        <span
          className="mb-5"
          style={{
            fontSize: "15px",
          }}
        >
          <b>{ad.title}</b>
        </span>
        <Badge variant="success" style={{ padding: "5px 10px" }} className="ml-2">
          {ad.plan}
        </Badge>

        {ad.isFave && (
          <Badge style={{ padding: "5px 10px" }} variant="info" className="ml-2">
            user favourite
          </Badge>
        )}
      </div>
    </div>
  );
}

// =====Ad Details====
function AdDetails({ ad }) {
  return (
    <div>
      <Row>
        <Col>
          <Card className="border-0">
            <Card.Header className="border-0" style={{ backgroundColor: "#76ba1b" }}>
              <b style={{ color: "white" }}> Details</b>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                  <div className="mt-3">
                    <MdLocationOn style={styles.icon} className="mr-3" />{" "}
                    <span style={styles.text}>
                      <b>Location</b>
                    </span>
                  </div>
                  <p className="ml-5" style={styles.text}>
                    {ad.city} {ad.country}
                  </p>
                </Col>
                <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                  <div className="mt-3">
                    <GiReceiveMoney style={styles.icon} className="mr-3" />{" "}
                    <span style={styles.text}>
                      <b>Price</b>
                    </span>
                  </div>
                  <p className="ml-5 " style={styles.text}>
                    {ad.price}
                  </p>
                </Col>
                <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                  <div className="mt-3">
                    <IoIosTime style={styles.iconD} className="mr-3" />{" "}
                    <span style={styles.text}>
                      <b>Posted</b>
                    </span>
                  </div>
                  <p className="ml-5" style={styles.text}>
                    {ad.created}
                  </p>
                </Col>
                <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                  <div className="mt-3">
                    <AiFillPhone style={styles.iconD} className="mr-3" />{" "}
                    <span style={styles.text}>
                      <b>Phone Number</b>
                    </span>
                  </div>
                  <p className="ml-5 " style={styles.text}>
                    {ad.phone}
                  </p>
                </Col>
                <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                  <div className="mt-3">
                    <AiFillEye style={styles.iconD} className="mr-3" />{" "}
                    <span style={styles.text}>
                      <b>Ad Views</b>
                    </span>
                  </div>
                  <p className="ml-5" style={styles.text}>
                    {ad.views}
                  </p>
                </Col>
                <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                  <div className="mt-3">
                    <FaSlackHash style={styles.iconD} className="mr-3" />{" "}
                    <span style={styles.text}>
                      <b>Ad ID</b>
                    </span>
                  </div>
                  <p className="ml-5 " style={styles.text}>
                    {ad.id}
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row>
            <Col xm={12} sm={12} md={12} lg={6} xl={6}>
              <Card className="border-0 mt-4">
                <Card.Header className="border-0" style={{ backgroundColor: "#76ba1b" }}>
                  <b style={{ color: "white" }}>Ad Discription</b>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col xm={12} sm={12} md={12} lg={12} xl={12}>
                      <span style={styles.text} dangerouslySetInnerHTML={{ __html: ad.description }}></span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xm={12} sm={12} md={12} lg={6} xl={6} className="mt-4">
              <UserAdInfo ad={ad} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

// ======user info dt own a Ad=====
function UserAdInfo({ ad }) {
  return (
    <div>
      <Card className="border-0 ">
        <Card.Header className="border-0" style={{ backgroundColor: "#76ba1b" }}>
          <b style={{ color: "white" }}>Advertiser Info</b>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xm={12} sm={12} md={12} lg={12} xl={12} className="text-center">
              <Image src={pic} style={styles.avater} roundedCircle />
            </Col>
            <Col xm={12} sm={12} md={12} lg={6} xl={6} className="text-center mt-2">
              <p style={styles.text}>
                <b>{ad.name}</b>
              </p>
            </Col>
            <Col xm={12} sm={12} md={12} lg={6} xl={6} className="text-center mt-2">
              <div>
                <IoIosTime style={styles.icon} className="mr-3" />{" "}
                <span style={styles.text}>
                  <b>{ad.time}</b>
                </span>
              </div>
            </Col>
            <Col xm={12} sm={12} md={12} lg={6} xl={6} className="text-center mt-2">
              <div>
                <AiFillPhone style={styles.icon} className="mr-3" />{" "}
                <span style={styles.text}>
                  <b>{ad.phone}</b>
                </span>
              </div>
            </Col>
            <Col xm={12} sm={12} md={12} lg={6} xl={6} className="text-center mt-2">
              <div>
                <IoMdMailOpen style={styles.icon} className="mr-3" />{" "}
                <a href={`mailto:${ad.email}?subject=subject text`}>
                  <span style={styles.text}>
                    <b>Reply By Mail</b>
                  </span>
                </a>
              </div>
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

  avater: {
    height: "100px",
  },
  titel: {
    opacity: "0.9",
    fontSize: "20px",
    width: "300px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  location: {
    fontSize: "0.7em",
  },
};
