import React, { useState } from "react";
import ActiveAdsInfo from "../user/ActiveAdsInfo";
import PendingAdsInfo from "../user/PendingAdsInfo";
import NewAdsInfo from "../user/NewAdsInfo";
import TotalUsersInfo from "../user/TotalUsersInfo";
import PostsStatisticsChart from "../user/PostsStatisticsChart";
import DashBoardNav from "../user/DashBoardNav";
import WeeklyUsersChart from "../user/WeeklyUsersChart";
import { Col, Row, Accordion, Container, Card } from "react-bootstrap";
import HeaderNav from "../navigations/HeaderNav";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

export default function UserDashbordPage() {
  const { token } = useSelector((state) => state.adminSignin);
  const [stat, setStat] = useState({
    active: 0,
    pending: 0,
    new: 0,
    user: 0,
    pie: {
      label: [],
      data: [],
    },
    graph: {
      label: [],
      data: [],
    },
  });
  const data = {
    labels: stat.graph.label,
    datasets: [
      {
        label: "Ads",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: stat.graph.data,
      },
    ],
  };

  const state = {
    labels: stat.pie.label,
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4", "#1840B4", "#950"],
        hoverBackgroundColor: ["#501800", "#4B5000", "#175000", "#003350", "#35014F", "#1240B4", "#950"],
        data: stat.pie.data,
      },
    ],
  };

  useEffect(() => {
    Axios.get("https://bellefu.com/api/admin/data/summary/graph/for/7/days", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        const data = res.data;
        const reqPieLabel = [];
        const reqPieData = [];
        const reqGraphLabel = [];
        const reqGraphData = [];

        data.product_timeline.forEach((item) => {
          reqGraphData.push(item.count);
          reqGraphLabel.push(item.day);
        });

        data.user_timeline.forEach((item) => {
          reqPieData.push(item.count);
          reqPieLabel.push(item.day);
        });

        setStat({
          active: data.active_ad_count,
          pending: data.pending_ad_count,
          new: data.new_ad_count,
          user: data.user_count,
          pie: {
            label: [...reqPieLabel],
            data: [...reqPieData],
          },
          graph: {
            label: [...reqGraphLabel],
            data: [...reqGraphData],
          },
        });
        //         active_ad_count: 25
        // new_ad_count: 0
        // pending_ad_count: 0
        // product_timeline: [{count: 1, day: 31}, {count: 15, day: 30}, {count: 10, day: 29}, {count: 0, day: 28},…]
        // 0: {count: 1, day: 31}
        // 1: {count: 15, day: 30}
        // 2: {count: 10, day: 29}
        // 3: {count: 0, day: 28}
        // 4: {count: 0, day: 27}
        // 5: {count: 0, day: 26}
        // 6: {count: 0, day: 25}
        // count: 0
        // day: 25
        // status: "success"
        // user_count: 26
        // user_timeline: [{count: 1, day: 31}, {count: 1, day: 30}, {count: 5, day: 29}, {count: 9, day: 28},…]
      })
      .catch(() => {
        setStat({
          active: "N/A",
          pending: "N/A",
          new: "N/A",
          user: "N/A",
          pie: {
            label: [],
            data: [],
          },
          graph: {
            label: [],
            data: [],
          },
        });
      });
  }, []);

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
            <div className=" d-lg-none  d-xs-block d-sm-block d-md-block ">
              <Container>
                <h3
                  style={{
                    marginTop: "30%",
                    opacity: "0.5",
                    fontSize: "20px",
                    marginBottom: "20px",
                  }}
                >
                  <b>Admin Dashboard</b>
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

          <Col xs={12} sm={12} md={12} lg={9} xl={9} style={{ marginLeft: "22%" }}>
            <div className="d-none d-lg-block  d-md-none">
              <h3
                style={{
                  marginTop: "10%",
                  opacity: "0.5",
                  fontSize: "15px",
                }}
              >
                <b>Admin Dashboard</b>
              </h3>
            </div>
            <Row>
              <Col xm={12} sm={12} md={12} lg={3} xl={3} style={{ marginTop: "2%" }}>
                <div className="d-none d-lg-block  d-md-none">
                  <ActiveAdsInfo data={stat.active} />
                </div>
              </Col>
              <Col xm={12} sm={12} md={12} lg={3} xl={3} style={{ marginTop: "2%" }}>
                <div className="d-none d-lg-block  d-md-none">
                  <NewAdsInfo data={stat.new} />
                </div>
              </Col>
              <Col xm={12} sm={12} md={12} lg={3} xl={3} style={{ marginTop: "2%" }}>
                <div className="d-none d-lg-block  d-md-none">
                  <PendingAdsInfo data={stat.pending} />
                </div>
              </Col>
              <Col xm={12} sm={12} md={12} lg={3} xl={3} style={{ marginTop: "2%" }}>
                <div className="d-none d-lg-block  d-md-none">
                  <TotalUsersInfo data={stat.user} />
                </div>
              </Col>
            </Row>
          </Col>
          {/* ======FOR CHART DESKTOP VIEW====== */}
          <Col xm={12} sm={12} md={12} lg={9} xl={9} style={{ marginLeft: "22%" }}>
            <Row>
              <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                <div className="mt-4 d-none d-lg-block  d-md-none">
                  <PostsStatisticsChart data={data} />
                </div>
              </Col>
              <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                <div className="mt-4 d-none d-lg-block  d-md-none">
                  <WeeklyUsersChart data={state} />
                </div>
              </Col>
            </Row>
          </Col>

          {/* ======FOR MOBILE VIEW======== */}
          <Col xs={12} sm={12} md={12} lg={9} xl={9} style={{ padding: "30px" }} className=" d-lg-none  d-xs-block d-sm-block d-md-block ">
            <Row>
              <Col xm={12} sm={12} md={12} lg={3} xl={3}>
                <div>
                  <ActiveAdsInfo data={stat.active} />
                </div>
              </Col>
              <Col xm={12} sm={12} md={12} lg={3} xl={3}>
                <div style={{ marginTop: "5%" }}>
                  <NewAdsInfo data={stat.new} />
                </div>
              </Col>
              <Col xm={12} sm={12} md={12} lg={3} xl={3}>
                <div style={{ marginTop: "5%" }}>
                  <PendingAdsInfo data={stat.pending} />
                </div>
              </Col>
              <Col xm={12} sm={12} md={12} lg={3} xl={3}>
                <div style={{ marginTop: "5%" }}>
                  <TotalUsersInfo data={stat.user} />
                </div>
              </Col>
            </Row>
          </Col>
          {/* ======FOR CHART MOBILE VIEW====== */}
          <Col xm={12} sm={12} md={12} lg={9} xl={9} style={{ padding: "30px" }} className=" d-lg-none  d-xs-block d-sm-block d-md-block ">
            <Row>
              <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                <div>
                  <PostsStatisticsChart data={data} />
                </div>
              </Col>
              <Col xm={12} sm={12} md={12} lg={6} xl={6}>
                <div className="mt-3 ">
                  <WeeklyUsersChart data={state} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
