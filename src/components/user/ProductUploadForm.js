import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import Datetime from "react-datetime";

export default function ProductUploadForm() {
  const [formData, setFormData] = useState({
    plan: "",
    amount: "",
    duration: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
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
      <form onSubmit={handleSubmit}>
        <Col xs={12}>
          <Form.Group size="lg" controlId="exampleForm.SelectCustom">
            <Form.Control
              name="plan"
              onChange={handleChange}
              value={formData.plan}
              size="lg"
              as="select"
              custom
            >
              <option value={""} selected disabled>
                Select plan
              </option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="urgent">Urgent</option>
              <option value="highlighted">Highlighted</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col xs={12}>
          <InputGroup size="lg">
            <FormControl
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              name="amount"
            />
          </InputGroup>
        </Col>

        <Col xs={12} style={{ marginTop: 10 }}>
          <InputGroup size="lg">
            <FormControl
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Duration"
              value={formData.duration}
              min={0}
              type="number"
              onChange={handleChange}
              name="duration"
            />
          </InputGroup>
        </Col>
        <Col style={{ marginTop: 40 }} xs={12}>
          <Button type="submit" block variant="warning">
            Submit
          </Button>
        </Col>
      </form>
    </div>
  );
}
