import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillDelete, AiOutlineCloudUpload } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import ActionModal from "../components/ActionModal";
import ImageUploader from "react-images-upload";
import CustomAlert from "../components/Alert";
import jsonToFormData from "json-form-data";
import { GiCancel } from "react-icons/gi";
import { useRef } from "react";

function SliderTable() {
  const { token } = useSelector((state) => state.adminSignin);
  const [images, setImages] = useState([]);
  const [uploadImage, setImageUpload] = useState({
    slider_images: [],
  });
  const [uploadLoad, setUploadLoad] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({
    view: false,
    message: "",
    type: "",
  });
  const [action, setAction] = useState({
    view: false,
    id: "",
    message: "",
    action: () => {},
  });
  const [load, setLoad] = useState(false);

  function fetchSlider() {
    setLoad(true);
    Axios.get("https://bellefu.com/api/admin/config/home_slider/list", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setImages(res.data.home_sliders);
      })
      .catch(() => {
        setLoad(false);
        setImages([]);
      });
  }

  useEffect(() => {
    fetchSlider();
  }, []);

  const deleteImage = (title) => {
    Axios.delete(
      `https://bellefu.com/api/admin/config/home_slider/delete/${title}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(() => {
        fetchSlider();
      })
      .catch((err) => {
        console.log(err.message);
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

  const handleImageUpload = () => {
    setUploadLoad(true);
    let options = {
      initialFormData: new FormData(),
      showLeafArrayIndexes: true,
      includeNullValues: false,
      mapping: function (value) {
        if (typeof value === "boolean") {
          return +value ? "1" : "0";
        }
        return value;
      },
    };
    const payload = jsonToFormData(uploadImage, options);

    Axios.post(
      "https://bellefu.com/api/admin/config/home_slider/save",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        setImageUpload({
          slider_images: [],
        });
        setUploadLoad(false);
        setUploadMessage({
          view: true,
          message: "Upload Successful",
          type: "success",
        });

        setTimeout(() => {
          setUploadMessage({
            view: false,
            message: "",
            type: "",
          });
        }, 2500);
      })
      .catch(() => {
        setUploadLoad(false);
        setUploadMessage({
          view: true,
          message: "Oops!, an error occured. Try Again!",
          type: "error",
        });

        setTimeout(() => {
          setUploadMessage({
            view: false,
            message: "",
            type: "",
          });
        }, 2500);
      });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        {uploadImage.slider_images.length >= 1 && (
          <Button
            onClick={() => {
              document.getElementById("uploaderInput").value = "";
              setImageUpload({
                slider_images: [],
              });
            }}
            style={{ marginRight: 20 }}
            vaiant="secondary"
          >
            <GiCancel />
          </Button>
        )}
        <Button variant="light">
          <label>
            <input
              multiple={true}
              type="file"
              id="uploaderInput"
              onChange={(e) =>
                setImageUpload({ slider_images: e.target.files })
              }
              accept="img/*"
              style={{ display: "none" }}
            />
            {uploadImage !== [] ? (
              uploadImage.slider_images.length + " files uploaded"
            ) : (
              <>
                Upload New Slider Image
                <AiOutlineCloudUpload />
              </>
            )}
          </label>
        </Button>
        <div style={{ marginLeft: 20 }}>
          <Button
            disabled={uploadLoad || uploadImage.slider_images.length < 1}
            onClick={handleImageUpload}
            variant="warning"
          >
            Submit <FiSend />
          </Button>
        </div>
        {uploadMessage.view && (
          <CustomAlert type={uploadMessage.type}>
            {uploadMessage.message}
          </CustomAlert>
        )}
      </div>

      <Table className="_sliderTable" striped bordered hover size="sm">
        <thead
          style={{ backgroundColor: "#76ba1b", color: "white", padding: 20 }}
        >
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th col={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {images.map((item) => (
            <tr>
              <td>
                <img src={item} alt="" />
              </td>
              <td>{item.split(".")[0]}</td>
              <td col={2}>
                <div className="flex">
                  <Button
                    onClick={() => {
                      // handleDeleteButton(
                      //   item.trim(),
                      //   "Are you sure you want to delete " + item + " ?",
                      //   deleteImage
                      // );
                      deleteImage(item);
                    }}
                    variant="danger"
                  >
                    <AiFillDelete />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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

export default SliderTable;
