import React from "react";
import { Col, Row, Accordion, Container, Card } from "react-bootstrap";
import DashBoardNav from "../user/DashBoardNav";
import UsersListTable from "../user/UsersListTable";
import HeaderNav from "../navigations/HeaderNav";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import VoucherForm from "../user/VoucherForm";

function AddVoucher() {
  return (
    <div>
      <HeaderNav />
      <div style={{ overflow: "hidden" }}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={3} xl={3}>
            <div
              className="d-none d-lg-block  d-md-none"
              style={{
                position: "fixed",
                marginTop: "60px",
                width: "20%",
                overflow: "auto",
                height: "91%",
              }}
            >
              <DashBoardNav />
            </div>
            {/* ======FOR MOBILE DASHBOARDNAV====== */}
            <div className=" d-lg-none  d-xs-block d-sm-block d-md-block " style={{ marginTop: "100px" }}>
              <Container>
                <h3
                  style={{
                    marginTop: "30%",
                    marginBottom: "20px",
                    opacity: "0.5",
                    fontSize: "20px",
                  }}
                >
                  Add New Voucher
                </h3>
              </Container>

              <Accordion>
                <Accordion.Toggle as={Card.Header} style={{ backgroundColor: "white", marginLeft: "0px" }} eventKey="0">
                  <Row type="button">
                    <Col xs={2} sm={2}>
                      <AiOutlineMenu style={{ color: "#ffa500", fontSize: "30px" }} />
                    </Col>
                    <Col xs={8} sm={8}>
                      <label className="mr-1" style={{ fontSize: "0.9em" }}>
                        <b style={{ opacity: "0.7" }}>Dashboard Navigation</b>
                      </label>
                    </Col>
                    <Col xs={2} sm={2}>
                      <IoMdArrowDropdown style={{ color: "#ffa500", fontSize: "30px" }} />
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <DashBoardNav />
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion>
            </div>
          </Col>

          {/* ======FOR  DESKTOP VIEW====== */}
          <Col xs={12} sm={12} md={12} lg={9} xl={9} style={{ marginLeft: "22%" }} className="mt-4 d-none d-lg-block  d-md-none">
            <h3
              style={{
                marginTop: "6%",
                opacity: "0.5",
                fontSize: "15px",
              }}
            >
              <b>Add New Voucher</b>
            </h3>
            <div style={{ marginTop: "2%" }}>
              <VoucherForm />
            </div>
          </Col>

          {/* ======FOR MOBILE VIEW======== */}
          <Col xs={12} sm={12} md={12} lg={9} xl={9} style={{ padding: "30px" }} className=" d-lg-none  d-xs-block d-sm-block d-md-block ">
            <VoucherForm />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AddVoucher