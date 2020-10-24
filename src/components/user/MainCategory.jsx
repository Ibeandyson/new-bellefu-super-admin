import Axios from "axios";
import React, { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Container,
  Form,
  Alert,
} from "react-bootstrap";
import { AiOutlineUpload } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function MainCategory() {
  const { admin } = useSelector((state) => state.adminSignin);
  const [response, setresponse] = useState({
    view: false,
    type: "",
    message: "",
  });
  const [cat, setcat] = useState({
    cat_name: "",
    image: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    Axios.post("https://dev.bellefu.com/api/admin/category/save", cat, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setcat({
          cat_name: "",
          image: "",
        });
        setresponse({ view: true, type: "success", message: res.data.message });
        setTimeout(() => {
          setresponse({ view: false, type: "", message: "" });
        }, 2500);
      })
      .catch((err) => {
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

  return (
    <div>
      <Container>
        <Card className="border-0">
          <Card.Header
            className="border-0"
            style={{ backgroundColor: "#76ba1b" }}
          >
            <b style={{ color: "white" }}>Create Category</b>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                  <Form.Label style={styles.label}>Category Name *</Form.Label>
                  <Form.Control
                    // value={cat.cat_name}
                    name="cat_name"
                    onChange={(event) => {
                      const { value } = event.target;
                      setcat((prev) => ({
                        ...prev,
                        cat_name: value,
                      }));
                    }}
                    placeholder="Enter category name"
                    style={{ height: "50px", boxShadow: "none" }}
                  />
                </Col>
                <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                  <Form.Label style={styles.label}>Category Icon *</Form.Label>
                  <br />
                  <div
                    uk-form-custom="target: true"
                    style={{ height: "50px", boxShadow: "none", width: "100%" }}
                  >
                    <label style={styles.upload}>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={(event) => {
                          const { files } = event.target;
                          console.log(files[0]);
                          setcat((prev) => ({
                            ...prev,
                            image: files[0],
                          }));
                        }}
                      />
                      {cat.image === "" ? (
                        <>
                          Select an image{" "}
                          <AiOutlineUpload
                            style={{ fontSize: 24, marginLeft: 10 }}
                          />
                        </>
                      ) : (
                        cat.image.name
                      )}
                    </label>
                  </div>
                </Col>
                <Col xm={12} sm={12} md={12} lg={12} xl={12} className="mt-4">
                  <Button
                    disabled={cat.cat_name === "" && true}
                    style={styles.btnCreate}
                    variant="warning"
                    size="sm"
                    type="submit"
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
