import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup, Nav, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CustomAlert from "../components/Alert";
import loader from "../images/load.svg";

export default function VoucherForm() {
  const history = useHistory();
  const { token } = useSelector((state) => state.adminSignin);
  const [load, setload] = useState({
    view: false,
    message: "",
    type: "",
    alert: false,
  });
  const [formData, setFormData] = useState({
    amount: "",
    quantity: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setload({
      view: true,
      message: "",
      type: "",
      alert: false,
    });
    const payload = new FormData();
    payload.append("voucher_amount", formData.amount);
    payload.append("voucher_quantity", formData.quantity);
    Axios.post("https://dev.bellefu.com/api/admin/voucher/save", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setload({
          view: false,
          message: res.data.message,
          type: "success",
          alert: true,
        });
        setTimeout(() => {
          setload((prev) => ({ ...prev, alert: false }));
          history.push("/vouchers");
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
      <form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
        <h4 className="_adUpdate-title" style={{ textAlign: "center" }}>
          Generate Vouchers
        </h4>

        <Col xs={12}>
          <InputGroup size="lg">
            <FormControl
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Enter voucher amount..."
              required={true}
              type="number"
              min={0}
              value={formData.amount}
              onChange={handleChange}
              name="amount"
            />
          </InputGroup>
        </Col>

        <Col xs={12} style={{ marginTop: 20 }}>
          <InputGroup size="lg">
            <FormControl
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Enter voucher quantity..."
              required={true}
              type="number"
              min={0}
              value={formData.quantity}
              onChange={handleChange}
              name="quantity"
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
    </div>
  );
}
