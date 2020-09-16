import React from 'react'
import { Col, Row, Container, Accordion, Card } from "react-bootstrap";
import DashBoardNav from "../user/DashBoardNav"
import PendingAdTable from "../user/PendingAdTable"
import HeaderNav from "../navigations/HeaderNav";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdArrowDropdown } from "react-icons/io";

export default function UserPendingAdPage() {
    return (
        <div>
           <HeaderNav />
			<Container>
				<Row>
					<Col xs={12} sm={12} md={12} lg={3} xl={3}>
						<div className="d-none d-lg-block  d-md-none">
							<h3
								style={{
									marginTop: "33%",
									marginBottom: "20px",
									opacity: "0.5"
								}}>
								Pending Ads
							</h3>
							<DashBoardNav />
						</div>
						{/* ======FOR MOBILE DASHBOARDNAV====== */}
						<div className=" d-lg-none  d-xs-block d-sm-block d-md-block ">
							<h3
								style={{
									marginTop: "30%",
									marginBottom: "20px",
									opacity: "0.5",
									fontSize: "20px"
								}}>
							Pending Ads
							</h3>
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

					<Col xs={12} sm={12} md={12} lg={9} xl={9} style={{ marginTop: "10.7%" }}>
						<div className="mt-3">
						<PendingAdTable/>
						</div>
					</Col>
				</Row>
			</Container>
        </div>
    )
}
