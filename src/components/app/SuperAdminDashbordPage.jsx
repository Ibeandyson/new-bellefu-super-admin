import React from "react";
import ActiveAdsInfo from "../user/ActiveAdsInfo";
import NewAdsInfo from "../user/NewAdsInfo";
import TotalUsersInfo from "../user/TotalUsersInfo";
import PostsStatisticsChart from "../user/PostsStatisticsChart";
import DashBoardNav from "../user/DashBoardNav";
import WeeklyUsersChart from "../user/WeeklyUsersChart";
import { Col, Row, Accordion, Container, Card } from "react-bootstrap";
import HeaderNav from "../navigations/HeaderNav";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";

export default function UserDashbordPage() {
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
								height: "91%"
							}}>
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
									}}>
									<b>Admin Dashboard</b>
								</h3>
							</Container>
							<Accordion>
								<Accordion.Toggle
									as={Card.Header}
									style={{ backgroundColor: "white", marginLeft: "0px" }}
									eventKey="0">
									<Row type="button">
										<Col xs={2} sm={2}>
											<AiOutlineMenu
												style={{ color: "#ffa500", fontSize: "30px" }}
											/>
										</Col>
										<Col xs={8} sm={8}>
											<label className="mr-1" style={{ fontSize: "0.9em" }}>
												<b style={{ opacity: "0.7" }}>Dashboard Navigation</b>
											</label>
										</Col>
										<Col xs={2} sm={2}>
											<IoMdArrowDropdown
												style={{ color: "#ffa500", fontSize: "30px" }}
											/>
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

					<Col
						xs={12}
						sm={12}
						md={12}
						lg={9}
						xl={9}
						style={{ marginLeft: "22%" }} >
							<div  className="d-none d-lg-block  d-md-none">
							<h3 
									style={{
										marginTop: "10%",
										opacity: "0.5",
										fontSize: "15px"
									}}>
									<b>Admin Dashboard</b>
								</h3>
								</div>
						<Row>
							<Col
								xm={12}
								sm={12}
								md={12}
								lg={3}
								xl={3}
								style={{ marginTop: "2%" }}>
								<div className="d-none d-lg-block  d-md-none">
									<ActiveAdsInfo />
								</div>
							</Col>
							<Col
								xm={12}
								sm={12}
								md={12}
								lg={3}
								xl={3}
								style={{ marginTop: "2%" }}>
								<div className="d-none d-lg-block  d-md-none">
									<NewAdsInfo />
								</div>
							</Col>
							<Col
								xm={12}
								sm={12}
								md={12}
								lg={3}
								xl={3}
								style={{ marginTop: "2%" }}>
								<div className="d-none d-lg-block  d-md-none">
									<TotalUsersInfo />
								</div>
							</Col>
							<Col
								xm={12}
								sm={12}
								md={12}
								lg={3}
								xl={3}
								style={{ marginTop: "2%" }}>
								<div className="d-none d-lg-block  d-md-none">
									<ActiveAdsInfo />
								</div>
							</Col>
						</Row>
					</Col>
					{/* ======FOR CHART DESKTOP VIEW====== */}
					<Col
						xm={12}
						sm={12}
						md={12}
						lg={9}
						xl={9}
						style={{ marginLeft: "22%" }}>
						<Row>
							<Col xm={12} sm={12} md={12} lg={6} xl={6}>
								<div className="mt-4 d-none d-lg-block  d-md-none">
									<PostsStatisticsChart />
								</div>
							</Col>
							<Col xm={12} sm={12} md={12} lg={6} xl={6}>
								<div className="mt-4 d-none d-lg-block  d-md-none">
									<WeeklyUsersChart />
								</div>
							</Col>
						</Row>
					</Col>

					{/* ======FOR MOBILE VIEW======== */}
					<Col
						xs={12}
						sm={12}
						md={12}
						lg={9}
						xl={9}
						style={{  padding: "30px" }}
						className=" d-lg-none  d-xs-block d-sm-block d-md-block ">
						<Row>
							<Col xm={12} sm={12} md={12} lg={3} xl={3}>
								<div>
									<ActiveAdsInfo />
								</div>
							</Col>
							<Col xm={12} sm={12} md={12} lg={3} xl={3}>
								<div style={{ marginTop: "5%" }}>
									<NewAdsInfo />
								</div>
							</Col>
							<Col xm={12} sm={12} md={12} lg={3} xl={3}>
								<div style={{ marginTop: "5%" }}>
									<TotalUsersInfo />
								</div>
							</Col>
							<Col xm={12} sm={12} md={12} lg={3} xl={3}>
								<div style={{ marginTop: "5%" }}>
									<ActiveAdsInfo />
								</div>
							</Col>
						</Row>
					</Col>
					{/* ======FOR CHART MOBILE VIEW====== */}
					<Col
						xm={12}
						sm={12}
						md={12}
						lg={9}
						xl={9}
						style={{ padding: "30px" }}
						className=" d-lg-none  d-xs-block d-sm-block d-md-block ">
						<Row>
							<Col xm={12} sm={12} md={12} lg={6} xl={6}>
								<div>
									<PostsStatisticsChart />
								</div>
							</Col>
							<Col xm={12} sm={12} md={12} lg={6} xl={6}>
								<div className="mt-3 ">
									<WeeklyUsersChart />
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
}
