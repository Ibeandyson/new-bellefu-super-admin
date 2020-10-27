import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillDelete, AiOutlineCloudUpload } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import ActionModal from "../components/ActionModal";
import CustomAlert from "../components/Alert";

function SliderTable() {
  const { admin } = useSelector((state) => state.adminSignin);
  const [images, setImages] = useState([]);
  const [uploadImage, setImageUpload] = useState([]);
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
    Axios.get("https://dev.bellefu.com/api/admin/config/home_slider/list", {
      headers: {
        Authorization: `Bearer ${admin.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setImages([]);
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
    // Axios.get("https://dev.bellefu.com/api/admin/product/delete/" + title, {
    //   headers: {
    //     Authorization: `Bearer ${admin.token}`,
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // })
    //   .then(() => {
    //     fetchSlider();
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
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
    const formdata = new FormData();
    formdata.set("slider_images", uploadImage);
    console.log(formdata);
    console.log(uploadImage);
    Axios.post(
      "https://dev.bellefu.com/api/admin/config/home_slider/save",
      formdata,
      {
        headers: {
          Authorization: `Bearer ${admin.token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
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
          type: "erroe",
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
      {uploadMessage.view && (
        <CustomAlert type={uploadMessage.type}>
          {uploadMessage.message}
        </CustomAlert>
      )}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
        <Button variant="light">
          <label>
            <input
              multiple
              accept="img/*"
              type="file"
              name=""
              style={{ display: "none" }}
              id=""
              onChange={(e) => {
                let data = e.target.files;
                let fileList = [];

                for (let i = 0; i < data.length; i++) {
                  fileList.push(data[i]);
                }
                setImageUpload(fileList);
              }}
            />
            {uploadImage !== [] ? (
              uploadImage.length + " files uploaded"
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
            disabled={uploadLoad}
            onClick={handleImageUpload}
            variant="warning"
          >
            Submit <FiSend />
          </Button>
        </div>
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
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td col={2}>
              <div className="flex">
                <Button variant="danger">
                  <AiFillDelete />
                </Button>
              </div>
            </td>
          </tr>
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
