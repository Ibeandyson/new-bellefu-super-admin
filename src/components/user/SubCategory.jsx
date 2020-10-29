import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Form,
  Alert,
} from "react-bootstrap";
import { Prev } from "react-bootstrap/esm/PageItem";
import { AiOutlineUpload } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function SubCategory() {
  const { token } = useSelector((state) => state.adminSignin);

  const [response, setresponse] = useState({
    view: false,
    type: "",
    message: "",
  });
  const [subcat, setsubcat] = useState({
    subcat_name: "",
    cat_id: "",
    subcat_icon: "",
  });
  

  const onChangHandlerImage = e => {
    setsubcat({...subcat, [e.target.name]: e.target.files[0]});
};

  

  const [category, setCategory] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData()
    formData.append('cat_icon', subcat.subcat_icon)
    formData.append('subcat_name', subcat.subcat_name)
    formData.append('cat_id', subcat.cat_id)
    Axios.post("https://dev.bellefu.com/api/admin/subcategory/save",formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setsubcat({ subcat_name: "", cat_id: "", subcat_icon: "" });
        setresponse({ view: true, type: "success", message: res.data.message });
        setTimeout(() => {
          setresponse({ view: false, type: "", message: "" });
        }, 2500);
      })
      .catch((err) => {
        console.log(err.data);

        setresponse({
          view: true,
          type: "danger",
          message: "The given data was invalid.",
        });
        setTimeout(() => {
          setresponse({ view: false, type: "", message: "" });
        }, 2500);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setsubcat((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    Axios.get("https://dev.bellefu.com/api/category/list").then((res) => {
      const data = res.data.categories;
      data.forEach((item) => {
        setCategory((prev) => [...prev, { id: item.id, name: item.name }]);
      });
    });
  }, []);
  return (
    <div>
      <Container>
        <Card className="border-0">
          <Card.Header
            className="border-0"
            style={{ backgroundColor: "#76ba1b" }}
          >
            <b style={{ color: "white" }}>Create Sub Category</b>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xm={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Label style={styles.label}>Category Name *</Form.Label>
                  <Form.Control
                    as="select"
                    name="cat_id"
                    value={subcat.cat_id}
                    onChange={handleChange}
                    style={{ height: "50px", boxShadow: "none" }}
                  >
                    <option>Choose...</option>
                    {category.map((item) => (
                      <option value={item.id}> {item.name} </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col xm={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Label style={styles.label}>
                    Sub Category Name *
                  </Form.Label>
                  <Form.Control
                    value={subcat.subcat_name}
                    onChange={handleChange}
                    name="subcat_name"
                    placeholder="Enter category name"
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </Col>
                <Col xm={12} sm={12} md={12} lg={4} xl={4}>
                  <Form.Label style={styles.label}>
                    Sub Category Icon *
                  </Form.Label>
                  <br />
                  <div
                    uk-form-custom="target: true"
                    style={{ height: "50px", boxShadow: "none", width: "100%" }}
                  >
                    <label style={styles.upload}>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        name="subcat_icon"  
                        onChange={e =>  onChangHandlerImage(e)}
                      />
                      {subcat.subcat_icon === "" ? (
                        <>
                          Select an image{" "}
                          <AiOutlineUpload
                            style={{ fontSize: 24, marginLeft: 10 }}
                          />
                        </>
                      ) : (
                        subcat.subcat_icon.name
                      )}
                    </label>
                  </div>
                </Col>
                <Col xm={12} sm={12} md={12} lg={12} xl={12} className="mt-4">
                  <Button
                    disabled={
                      subcat.subcat_name === "" ||
                      (subcat.cat_id === "" && true)
                    }
                    style={styles.btnCreate}
                    type="submit"
                    variant="warning"
                    size="sm"
                  >
                    <b>Create</b>
                  </Button>
                </Col>
              </Row>
            </Form>
            {response.view && (
              <Alert style={{ marginTop: 20 }} key={1} variant={response.type}>
                {response.message}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

const styles = {
  label: {
    opacity: "0.6",
    fontSize: "0.9em",
    color: "black",
    marginTop: "20px",
  },

  btnCreate: {
    marginTop: "10px",
    backgroundColor: "#ffa500",
    border: "none",
    color: "white",
  },

  upload: {
    padding: "5px 10px",
    backgroundColor: "#eee",
    border: "1px solid #666",
    borderRadius: "4px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
};
