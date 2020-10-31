import React, { useEffect, useState } from "react";
import { Card, Badge, Image, Button, Tooltip, OverlayTrigger, Row, Col, Container, InputGroup, FormControl } from "react-bootstrap";
import { AiOutlineTag, AiOutlineEye, AiFillEdit, AiFillDelete, AiOutlineUpload } from "react-icons/ai";
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
    Delete Category
  </Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (Comfirm)
const editTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Edit category
  </Tooltip>
);

export default function CategoryTable() {
  const { token } = useSelector((state) => state.adminSignin);
  const [load, setLoad] = useState(false);
  const [updateVal, setUpdateVal] = useState({
    name: "",
    icon: "",
    error: "",
  });
  const [categories, setCategories] = useState([]);
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

  const EditInput = ({ action, setAction, fetchCategories }) => {
    const { token } = useSelector((state) => state.adminSignin);
    const [updateData, setUpdateData] = useState({
      icon: "",
      name: "",
      error: "",
    });

    const handleNameChange = (event) => {
      const { value, files, name } = event.target;

      if (name === "name") {
        setUpdateData({ ...updateData, [name]: value });
      }
      if (name === "icon") {
        setUpdateData((prev) => ({ ...prev, [name]: files[0] }));
      }
    };
    const editCategory = (_id) => {
      const payload = new FormData();
      if (updateData.icon === "") {
        payload.set("cat_name", updateData.name);
      } else if (updateData.name === "") {
        payload.set("cat_icon", updateData.icon);
      } else {
        payload.append("cat_name", updateData.name);
        payload.append("cat_icon", updateData.icon);
      }
      Axios.post("https://dev.bellefu.com/api/admin/category/update/" + _id, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then(() => {
          fetchCategories();
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
          editCategory(action.id);
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

  function fetchCategories() {
    setLoad(true);
    Axios.get("https://dev.bellefu.com/api/category/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setCategories(res.data.categories);
      })
      .catch(() => {
        setLoad(false);
      });
  }

  useEffect(() => {
    fetchCategories();
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

  const deleteCategory = (title) => {
    Axios.get("https://dev.bellefu.com/api/admin/category/delete/" + title, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        fetchCategories();
        setAction((prev) => ({
          ...prev,
          view: false,
        }));
      })
      .catch((err) => {
        console.log(err.message);
        setAction((prev) => ({
          ...prev,
          view: false,
        }));
      });
  };

  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          {load ? (
            <CustomSpinner />
          ) : (
            // <InfiniteScroll
            //   dataLength={loadCountries.data.length}
            //   next={nextData}
            //   hasMore={
            //     countries.length === loadCountries.data.length ? false : true
            //   }
            //   loader={<CustomSpinner />}
            //   endMessage={
            //     <p style={{ textAlign: "center" }}>Nothing else to see !</p>
            //   }
            // >
            <div style={{ overflowX: "scroll" }}>
              <table class="uk-table uk-table-responsive uk-table-divider">
                <thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
                  <tr>
                    <th style={{ color: "white", fontWeight: "bold", width: 60 }} className="uk-table-expand">
                      #ID
                    </th>
                    <th
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        maxWidth: 120,
                      }}
                    >
                      Image
                    </th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Name</th>
                    <th
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        minWidth: 200,
                      }}
                    >
                      Subcategories
                    </th>
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
                      <td>
                        <p style={styles.titel}>
                          <img src={"https://dev.bellefu.com/images/categories/"+item.image} style={{ width: "100%" }} alt="" />
                        </p>
                      </td>

                      <td>
                        <p style={styles.titel}>{item.name}</p>
                      </td>

                      <td style={{ display: "flex", flexWrap: "wrap" }}>
                        <small>{item.subcategories.map((item) => item.name + ", ")}</small>
                      </td>

                      <td>{item.products_count}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={editTooltip}>
                            <Button
                              size="sm"
                              onClick={() => {
                                handleEditButton(item.slug, "EDIT");
                              }}
                              variant="success"
                              style={{ marginRight: 10 }}
                            >
                              <AiFillEdit style={{ color: "#fff", fontSize: 24 }} />
                            </Button>
                          </OverlayTrigger>

                          <OverlayTrigger placement="bottom" delay={{ show: 50, hide: 100 }} overlay={deleteTooltip}>
                            <Button
                              size="sm"
                              onClick={() => {
                                handleDeleteButton(item.slug, `Are you sure you want to delete ${item.name} ?`, deleteCategory);
                              }}
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
            // </InfiniteScroll>
          )}
        </Card.Body>
      </Card>

      {action.message === "EDIT" ? (
        <EditInput action={action} setAction={setAction} fetchCategories={fetchCategories} />
      ) : (
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
