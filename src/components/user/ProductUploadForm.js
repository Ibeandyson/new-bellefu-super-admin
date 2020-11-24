import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup, Nav, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import CustomAlert from "../components/Alert";
import loader from "../images/load.svg";

export default function ProductUploadForm() {
  const { token } = useSelector((state) => state.adminSignin);
  const [key, setKey] = useState("amount");
  const [load, setload] = useState({
    view: false,
    message: "",
    type: "",
    alert: false,
  });
  const [formData, setFormData] = useState({
    featured: "",
    urgent: "",
    highlighted: "",
    free: "",
  });

  useEffect(() => {
    if (key === "duration") {
      setFormData((prev) => ({
        featured: "",
        urgent: "",
        highlighted: "",
        free: "",
      }));
      Axios.get("https://bellefu.com/api/admin/config/plan/duration", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => {
        const data = res.data;

        setFormData((prev) => ({
          featured: data.featured_plan_duration === null ? "" : data.featured_plan_duration,
          urgent: data.urgent_plan_duration === null ? "" : data.urgent_plan_duration,
          highlighted: data.highlighted_plan_duration === null ? "" : data.highlighted_plan_duration,
          free: data.free_plan_duration === null ? "" : data.free_plan_duration,
        }));
      });
    }

    if (key === "amount") {
      setFormData((prev) => ({
        featured: "",
        urgent: "",
        highlighted: "",
        free: "",
      }));
      Axios.get("https://bellefu.com/api/admin/config/upgrade/fee", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => {
        const data = res.data;

        setFormData((prev) => ({
          featured: data.featured_upgrade_fee === null ? "" : data.featured_upgrade_fee,
          urgent: data.urgent_upgrade_fee === null ? "" : data.urgent_upgrade_fee,
          highlighted: data.highlighted_upgrade_fee === null ? "" : data.highlighted_upgrade_fee,
          free: "",
        }));
      });
    }

    //     featured_plan_duration: "30"
    // free_plan_duration: "30"
    // highlighted_plan_duration: "30"
  }, [key]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setload({
      view: true,
      message: "",
      type: "",
      alert: false,
    });
    const payload = new FormData();
    let url = "";
    if (key === "amount") {
      payload.append("featured", formData.featured);
      payload.append("highlighted", formData.highlighted);
      payload.append("urgent", formData.urgent);
      url = "https://bellefu.com/api/admin/config/ad/upgrade_fee/save";
    }
    if (key === "duration") {
      payload.append("featured", formData.featured);
      payload.append("highlighted", formData.highlighted);
      payload.append("urgent", formData.urgent);
      payload.append("free", formData.free);
      url = "https://bellefu.com/api/admin/config/ad/duration/save";
    }

    Axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(() => {
        setload({
          view: false,
          message: "Update suceessful",
          type: "success",
          alert: true,
        });
        setTimeout(() => {
          setload((prev) => ({ ...prev, alert: false }));
        }, 2000);
        setFormData((prev) => ({
          featured: "",
          urgent: "",
          highlighted: "",
          free: "",
        }));
      })
      .catch(() => {
        setload({
          view: false,
          message: "opps, an error occured. Try again !",
          type: "error",
          alert: true,
        });
        setTimeout(() => {
          setload((prev) => ({ ...prev, alert: false }));
        }, 2000);
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      {load.alert && <CustomAlert type={load.type}>{load.message}</CustomAlert>}
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} style={{ display: "flex", justifyContent: "center" }}>
        <Tab eventKey="amount" title="Product Amount Update">
          <form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
            <h4 className="_adUpdate-title" style={{ textAlign: "center" }}>
              Ad Amount Update
            </h4>

            <Col xs={12}>
              <p htmlFor="">Urgent:</p>
              <InputGroup size="lg">
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Enter amount..."
                  required={true}
                  type="number"
                  min={0}
                  value={formData.urgent}
                  onChange={handleChange}
                  name="urgent"
                />
              </InputGroup>
            </Col>

            <Col xs={12} style={{ marginTop: 20 }}>
              <p htmlFor="">Highlighted:</p>
              <InputGroup size="lg">
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Enter amount..."
                  required={true}
                  type="number"
                  min={0}
                  value={formData.highlighted}
                  onChange={handleChange}
                  name="highlighted"
                />
              </InputGroup>
            </Col>

            <Col xs={12} style={{ marginTop: 20 }}>
              <p>Featured:</p>
              <InputGroup size="lg">
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Enter amount..."
                  required={true}
                  type="number"
                  min={0}
                  value={formData.featured}
                  onChange={handleChange}
                  name="featured"
                />
              </InputGroup>
            </Col>
            <Col style={{ marginTop: 40 }} xs={12}>
              <Button
                type="submit"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                block
                variant="warning"
                disabled={load.view}
              >
                {load.view && <img src={loader} style={{ position: "absolute", width: "40px" }} alt="" />}
                Submit
              </Button>
            </Col>
          </form>
        </Tab>
        <Tab eventKey="duration" title="Product Duration Update">
          <form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
            <h4 className="_adUpdate-title" style={{ textAlign: "center" }}>
              Ad Duration Update
            </h4>

            <Col xs={12}>
              <p htmlFor="">Free:</p>
              <InputGroup size="lg">
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Enter duration..."
                  required={true}
                  type="number"
                  min={0}
                  value={formData.free}
                  onChange={handleChange}
                  name="free"
                />
              </InputGroup>
            </Col>

            <Col xs={12} style={{ marginTop: 20 }}>
              <p htmlFor="">Urgent:</p>
              <InputGroup size="lg">
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Enter duration..."
                  required={true}
                  type="number"
                  min={0}
                  value={formData.urgent}
                  onChange={handleChange}
                  name="urgent"
                />
              </InputGroup>
            </Col>

            <Col xs={12} style={{ marginTop: 20 }}>
              <p htmlFor="">Highlighted:</p>
              <InputGroup size="lg">
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Enter duration..."
                  required={true}
                  type="number"
                  min={0}
                  value={formData.highlighted}
                  onChange={handleChange}
                  name="highlighted"
                />
              </InputGroup>
            </Col>

            <Col xs={12} style={{ marginTop: 20 }}>
              <p>Featured:</p>
              <InputGroup size="lg">
                <FormControl
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="Enter duration..."
                  required={true}
                  type="number"
                  min={0}
                  value={formData.featured}
                  onChange={handleChange}
                  name="featured"
                />
              </InputGroup>
            </Col>

            <Col style={{ marginTop: 40 }} xs={12}>
              <Button
                type="submit"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                block
                variant="warning"
                disabled={load.view}
              >
                {load.view && <img src={loader} style={{ position: "absolute", width: "40px" }} alt="" />}
                Submit
              </Button>
            </Col>
          </form>
        </Tab>
      </Tabs>
    </div>
  );
}
