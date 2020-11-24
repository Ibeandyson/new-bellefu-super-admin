import React, { useEffect, useState } from "react";
import { Card, Badge, Image, Button, Tooltip, OverlayTrigger, Row, Col, Container, InputGroup, FormControl } from "react-bootstrap";
import { AiOutlineTag, AiOutlineEye, AiFillDelete, AiFillEdit, AiOutlineUpload } from "react-icons/ai";
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
    Delete Subcategories
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (Comfirm)
const editTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Edit Subcategories
  </Tooltip>
);

const EditInput = ({ action, setAction, fetchSubcategories, initialData }) => {
  const { token } = useSelector((state) => state.adminSignin);
  const [updateData, setUpdateData] = useState({
    icon: "",
    name: "",
    error: "",
  });

  useEffect(() => {
    setUpdateData((prev) => ({ ...prev, icon: initialData.icon, name: initialData.name }));
  }, [initialData]);

  const handleNameChange = (event) => {
    const { value, files, name } = event.target;

    if (name === "name") {
      setUpdateData({ ...updateData, [name]: value });
    }
    if (name === "icon") {
      setUpdateData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };
  const editSubcategory = (_id) => {
    const payload = new FormData();
    if (updateData.icon === "") {
      payload.set("subcat_name", updateData.name);
    } else if (updateData.name === "") {
      payload.set("subcat_icon", updateData.icon);
    } else {
      payload.append("subcat_name", updateData.name);
      payload.append("subcat_icon", updateData.icon);
    }
    Axios.post("https://bellefu.com/api/admin/subcategory/update/" + _id, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        fetchSubcategories();
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
      <p>Edit {action.id} ?</p>
      <InputGroup>
        <FormControl
          style={{ marginTop: 20 }}
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Subcategory"
          name="name"
          value={updateData.name}
          onChange={handleNameChange}
        />
      </InputGroup>
      <label
        style={{
          marginTop: 20,
          padding: "5px 10px",
          backgroundColor: "#eee",
          border: "1px solid #666",
          borderRadius: "4px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <input style={{ display: "none" }} type="file" name="icon" onChange={handleNameChange} />
        {updateData.icon === "" ? (
          <>
            Select an image <AiOutlineUpload style={{ fontSize: 24, marginLeft: 10 }} />
          </>
        ) : (
          updateData.icon.name
        )}
      </label>
      <small className="text-danger">{updateData.error}</small>
    </ActionModal>
  );
};

export default function SubCategoryTable() {
  const { token } = useSelector((state) => state.adminSignin);
  const [load, setLoad] = useState(false);
  const [initialState, setinitialState] = useState({
    name: "",
    icon: "",
  });
  const [categories, setCategories] = useState([]);
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

  function fetchSubcategories() {
    setLoad(true);
    Axios.get("https://bellefu.com/api/admin/subcategory/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setCategories(res.data.subcategories.data);
        setNext(res.data.subcategories.next_page_url);
        setPages({
          current: res.data.subcategories.current_page,
          last: res.data.subcategories.last_page,
        });
      })
      .catch(() => {
        setLoad(false);
      });
  }

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleDeleteButton = (id, message, action) => {
    setAction({
      view: true,
      id,
      message,
      action: action,
    });
  };

  const handleEditButton = (id, message, action) => {
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
      setCategories(categories.concat(res.data.subcategories.data));
      setNext(res.data.subcategories.next_page_url);
      setPages({
        current: res.data.subcategories.current_page,
        last: res.data.subcategories.last_page,
      });
    });
  };

  const deleteSubcategory = (title) => {
    Axios.get("https://bellefu.com/api/admin/subcategory/delete/" + title, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        fetchSubcategories();
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
              dataLength={categories.length}
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
                        }}
                        className="uk-table-expand"
                      >
                        #ID
                      </th>
                      <th style={{ color: "white", fontWeight: "bold" }}>Category</th>
                      <th style={{ color: "white", fontWeight: "bold", maxWidth: 120 }}>Icon</th>
                      <th style={{ color: "white", fontWeight: "bold" }}>Name</th>

                      <th style={{ color: "white", fontWeight: "bold" }}>Product Count</th>
                      <th
                        //   className="uk-table-expand"

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
                    {categories.map((item, key) => (
                      <tr>
                        <td>
                          <p style={styles.titel}>{item.id}</p>
                        </td>
                        <td>{item.category.name}</td>
                        <td>
                          <p style={styles.titel}>
                            <img style={{ maxWidth: 100 }} src={"https://bellefu.com/images/categories/" + item.images} alt="" />
                          </p>
                        </td>

                        <td>
                          <p style={styles.titel}>{item.name}</p>
                        </td>

                        <td>{item.products_count}</td>
                        <td>
                          <div className="btn-group" role="group">
                            <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={editTooltip}>
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() => {
                                  const obj = categories.find((o, indx) => indx === key);
                                  setinitialState((prev) => ({ ...prev, name: obj.name }));
                                  handleEditButton(item.slug, "EDIT");
                                  // setUpdateData((prev) => ({ ...prev, name: item.name }));
                                }}
                              >
                                <AiFillEdit style={{ color: "#fff", fontSize: 24 }} />
                              </Button>
                            </OverlayTrigger>

                            <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={deleteTooltip}>
                              <Button
                                size="sm"
                                onClick={() => {
                                  handleDeleteButton(item.slug, `Are you sure you want to delete ${item.name} ?`, deleteSubcategory);
                                }}
                                variant="light"
                                style={{ marginLeft: 10 }}
                                variant="danger"
                              >
                                <AiFillDelete style={{ color: "#fff", fontSize: 24 }} />
                              </Button>
                            </OverlayTrigger>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </InfiniteScroll>
          )}
        </Card.Body>
      </Card>
      {action.message !== "EDIT" && (
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
      )}
      {action.message === "EDIT" && <EditInput initialData={initialState} action={action} setAction={setAction} fetchSubcategories={fetchSubcategories} />}
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
