import React, { useEffect, useState } from "react";
import { Card, Badge, Image, Button, Tooltip, OverlayTrigger, Row, Col, Container, Spinner } from "react-bootstrap";
import { AiOutlineTag, AiOutlineEye, AiFillPhone, AiFillEye, AiFillEdit } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { MdDateRange, MdCancel, MdLocationOn } from "react-icons/md";
import { IoMdTrash, IoIosArrowDroprightCircle, IoIosTime, IoIosArrowDropleftCircle, IoMdMailOpen } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { FaSlackHash } from "react-icons/fa";
import pic from "../images/pic.jpg";
import land from "../images/land.PNG";
import Axios from "axios";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";
import ActionModal from "../components/ActionModal";
import CustomSpinner from "../Spinner/Spinner";
import { nullCheck } from "../../Utils";
import UpdateModal from "../components/UpdateModal";

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (delete)
const deleteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Delete Ad
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (view)
const viewTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    View Ad
  </Tooltip>
);

// /THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (Update)
const updateTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Update Ad
  </Tooltip>
);

export default function ActiveAdTable() {
  const { token } = useSelector((state) => state.adminSignin);
  const [updateData, setUpdateData] = useState({
    view: false,
    id: "",
    data: {
      title: "",
      category: "",
      subcategory: "",
      address: "",
    },
    preLoad: {
      categories: [],
      subcategories: [],
    },
  });
  const [load, setLoad] = useState(false);
  const [ads, setads] = useState([]);
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

  function fetchAds() {
    setLoad(true);
    Axios.get("https://bellefu.com/api/admin/product/list/approved", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setads(res.data.products.data);
        setNext(res.data.products.next_page_url);
        setPages({
          current: res.data.products.current_page,
          last: res.data.products.last_page,
        });
      })
      .catch(() => {
        setLoad(false);
        setads([]);
        setNext([]);
        setPages({
          current: 0,
          last: 0,
        });
      });
  }

  useEffect(() => {
    fetchAds();
  }, []);

  useEffect(() => {
    Axios.get("https://bellefu.com/api/category/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      const data = res.data.categories;
      setUpdateData((prev) => ({ ...prev, preLoad: { subcategories: [], categories: data } }));
    });
  }, []);

  useEffect(() => {
    Axios.get("https://bellefu.com/api/admin/subcategory/listfor/" + updateData.data.category, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      const data = res.data.subcategories;
      setUpdateData((prev) => ({ ...prev, preLoad: { ...updateData.preLoad, subcategories: data } }));
    });
  }, [updateData.data.category]);

  const nextData = () => {
    Axios.get(next, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      setads(ads.concat(res.data.products.data));
      setNext(res.data.products.next_page_url);
      setPages({
        current: res.data.products.current_page,
        last: res.data.products.last_page,
      });
    });
  };

  const handleDeleteButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action: action,
    });
  };

  const deleteAd = (title) => {
    Axios.get("https://bellefu.com/api/admin/product/delete/" + title, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        fetchAds();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDataUpdate = () => {
    Axios.post("https://bellefu.com/api/admin/product/update/" + updateData.id, updateData.data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(() => {
      fetchAds();
      setUpdateData((prev) => ({ ...prev, view: false }));
    });
  };

  const handleUpdateChange = (event) => {
    const { value, name } = event.target;
    setUpdateData((prev) => ({
      ...prev,
      data: {
        ...updateData.data,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          {load ? (
            <CustomSpinner />
          ) : (
            <InfiniteScroll
              dataLength={ads.length}
              next={nextData}
              hasMore={pages.current !== pages.last ? true : false}
              loader={<CustomSpinner />}
              endMessage={<p style={{ textAlign: "center" }}></p>}
            >
              <table class="uk-table uk-table-responsive uk-table-divider">
                <thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
                  <tr>
                    <th style={{ color: "white", fontWeight: "bold" }} className="uk-table-expand">
                      Ads
                    </th>
                    <th style={{ color: "white", fontWeight: "bold" }} className="uk-width-*">
                      {" "}
                    </th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Username</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Status</th>
                    <th className="uk-table-expand" style={{ color: "white", fontWeight: "bold" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ads.map((item, key) => (
                    <tr key={key}>
                      <td className="uk-text-center">
                        <Image src={`https://bellefu.com/images/products/${item.slug}/` + item.images[0]} style={styles.image} />
                      </td>
                      <td>
                        <p style={styles.titel}>{item.title}</p>

                        {/* <Badge variant="danger" className="ml-2">
                      Ugent
                    </Badge> */}
                        <Badge variant="success" style={{ padding: "5px 10px" }} className="ml-2">
                          {item.plan}
                        </Badge>

                        {item.is_user_favourite && (
                          <Badge style={{ padding: "5px 10px" }} variant="info" className="ml-2">
                            user favourite
                          </Badge>
                        )}
                        <div className="mt-3">
                          <AiOutlineTag style={styles.icon} className="mr-2" />
                          <span style={styles.category} className="ml-2 mt-3">
                            {nullCheck(item.category).name}
                          </span>
                          <span style={styles.subCategory} className="ml-2 mt-5">
                            {nullCheck(item.subcategory).name}
                          </span>
                        </div>
                        <div className="mt-3">
                          <GoLocation style={styles.icon} className="mr-1" />
                          <span style={styles.location} className="ml-1 ">
                            {nullCheck(item.country).native}
                          </span>
                          <MdDateRange style={styles.icon} className="mr-1 ml-1" />
                          <span style={styles.date} className="ml-1 ">
                            Post Date: {format(new Date(item.created_at), "dd-MMM-yyyy")}
                          </span>
                          <span className="ml-2" style={styles.price}></span>
                        </div>
                      </td>
                      <td>{nullCheck(item.user).username}</td>
                      <td>
                        <Badge style={{ backgroundColor: "green", color: "white" }} className="ml-2">
                          {item.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={viewTooltip}>
                            <Button
                              class="uk-button uk-button-default"
                              type="button"
                              uk-toggle="target: #offcanvas-flip"
                              size="sm"
                              variant="light"
                              onClick={() => {
                                const obj = ads.find((o, index) => index === key);
                                setad({
                                  name: obj.user.username,
                                  price: obj.currency_symbol + obj.price,
                                  likeCount: obj.favourites_count,
                                  phone: obj.phone,
                                  description: obj.description,
                                  images: obj.images,
                                  created: format(new Date(item.created_at), "dd-MMM-yyyy"),
                                  email: obj.user.email,
                                  id: obj.id,
                                  city: obj.city,
                                  country: obj.country.native,
                                  views: obj.inorganic_views,
                                  isFave: obj.is_user_favourite,
                                  plan: obj.plan,
                                  title: obj.title,
                                  slug: obj.slug,
                                });
                              }}
                            >
                              <AiOutlineEye style={{ color: "#ffa500" }} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={updateTooltip}>
                            <Button
                              size="sm"
                              onClick={() => {
                                const obj = ads.find((o, index) => index === key);
                                setUpdateData((prev) => ({
                                  ...prev,
                                  id: obj.slug,
                                  view: true,
                                  data: {
                                    title: obj.title,
                                    category: nullCheck(item.category).slug,
                                    subcategory: nullCheck(item.subcategory).slug,
                                    address: obj.address,
                                  },
                                }));
                              }}
                              variant="light"
                            >
                              <AiFillEdit style={{ color: "purple" }} />
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={deleteTooltip}>
                            <Button
                              size="sm"
                              onClick={() => {
                                handleDeleteButton(item.slug, `Are you sure you want to delete the product ${item.title}`, deleteAd);
                              }}
                              variant="light"
                            >
                              <IoMdTrash style={{ color: "red" }} />
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
        }}
        handleNo={() => {
          setAction((prev) => ({
            ...prev,
            view: false,
          }));
        }}
      />

      <UpdateModal
        show={updateData.view}
        text={`Update ${updateData.data.title}`}
        handleClose={() => {
          setUpdateData((prev) => ({ ...prev, view: false }));
        }}
        handleUpdate={handleDataUpdate}
      >
        <div>
          <label style={{ width: "100%", marginTop: 12 }}>Title</label>
          <input
            name="title"
            type="text"
            className="form-control"
            style={{ width: "100%", marginTop: 5 }}
            onChange={handleUpdateChange}
            value={updateData.data.title}
          />
          <label style={{ width: "100%", marginTop: 12 }}>Address</label>
          <input
            name="address"
            type="text"
            className="form-control"
            style={{ width: "100%", marginTop: 5 }}
            onChange={handleUpdateChange}
            value={updateData.data.address}
          />

          <label style={{ width: "100%", marginTop: 12 }}>Categories</label>
          <select
            name="category"
            className="custom-select"
            style={{ width: "100%", marginTop: 5 }}
            onChange={handleUpdateChange}
            value={updateData.data.category}
          >
            {updateData.preLoad.categories !== undefined && updateData.preLoad.categories.map((item, key) => <option value={item.slug}>{item.name}</option>)}
          </select>

          <label style={{ width: "100%", marginTop: 12 }}>Subtegories</label>
          <select
            name="subcategory"
            className="custom-select"
            style={{ width: "100%", marginTop: 5 }}
            onChange={handleUpdateChange}
            value={updateData.data.subcategory}
          >
            {updateData.preLoad.subcategories.map((item, key) => (
              <option value={item.slug}>{item.name}</option>
            ))}
          </select>
        </div>
      </UpdateModal>
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
