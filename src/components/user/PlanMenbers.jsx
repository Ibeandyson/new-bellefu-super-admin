import React from "react";
import {
	Card,
	Button,
	Tooltip,
	OverlayTrigger,
	Row,
	Col,
	Container,
	Form
} from "react-bootstrap";
import { AiOutlineEye } from "react-icons/ai";
import { FaPencilAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import  { BsFillPlusCircleFill } from "react-icons/bs"

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (delete)
const deleteTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Delete Plan
	</Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (edit)
const editTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Edit Plan
	</Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (view)
const viewTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		View Plan
	</Tooltip>
);

export default function MenbershipPlan() {
	return (
		<div>
			<Card className="border-0">
				<Card.Body>
                    <div  style={{float:"right", marginBottom: "20px"}}>
					<Button
						class="uk-button uk-button-default"
						type="button"
						uk-toggle="target: #offcanvas-addplan"
						size="sm"
						variant="light">
						<BsFillPlusCircleFill className="mr-3" style={{ color: "green" }} /><span><b>Create Plan</b></span>
					</Button>
                    </div>
					<table class="uk-table uk-table-responsive uk-table-divider ">
						<thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
							<tr>
								<th
									style={{ color: "white", fontWeight: "bold" }}
									className="uk-table-expand">
									Plan Name
								</th>
								<th style={{ color: "white", fontWeight: "bold" }}>
									Plan Duration
								</th>
								<th style={{ color: "white", fontWeight: "bold" }}>
									Menbers Number
								</th>
								<th style={{ color: "white", fontWeight: "bold" }}>
									Featured Fee
								</th>
								<th style={{ color: "white", fontWeight: "bold" }}>
									Urgent Fee
								</th>
								<th style={{ color: "white", fontWeight: "bold" }}>
									Higlighted Fee
								</th>
								<th
									className="uk-table-expand"
									style={{ color: "white", fontWeight: "bold" }}>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>plan b</td>
								<td>2 months</td>
								<td>36</td>
								<td>$30</td>
								<td>$20</td>
								<td>$40</td>

								<td>
									<div className="btn-group" role="group">
										<OverlayTrigger
											placement="bottom"
											delay={{ show: 50, hide: 100 }}
											overlay={viewTooltip}>
											<Button
												class="uk-button uk-button-default"
												type="button"
												uk-toggle="target: #offcanvas-view"
												size="sm"
												variant="light">
												<AiOutlineEye style={{ color: "#ffa500" }} />
											</Button>
										</OverlayTrigger>

										<OverlayTrigger
											placement="bottom"
											delay={{ show: 50, hide: 100 }}
											overlay={editTooltip}>
											<Button
												class="uk-button uk-button-default"
												type="button"
												uk-toggle="target: #offcanvas-edit"
												size="sm"
												variant="light">
												<FaPencilAlt style={{ color: "#ffa500" }} />
											</Button>
										</OverlayTrigger>

										<OverlayTrigger
											placement="bottom"
											delay={{ show: 50, hide: 100 }}
											overlay={deleteTooltip}>
											<Button size="sm" variant="light">
												<IoMdTrash style={{ color: "red" }} />
											</Button>
										</OverlayTrigger>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</Card.Body>
			</Card>

			{/* ============OFFCANVA FOR VIEW PLAN========== */}
			<div
				id="offcanvas-view"
				uk-offcanvas="flip: true; overlay: true"
				style={{ marginTop: "4%" }}>
				<div class="uk-offcanvas-bar" style={{ width: "80%" }}>
					<MdCancel
						style={styles.close_icon}
						className="uk-offcanvas-close"
						uk-close
						type="button"
					/>
					<Container>
						<Card className="border-0">
							<Card.Header
								className="border-0"
								style={{ backgroundColor: "#76ba1b" }}>
								<b style={{ color: "white" }}>Plan Details</b>
							</Card.Header>
							<Card.Body>
								<Row>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<div className="mt-3">
											<span style={styles.text}>
												<b>PLAN NAME</b>
											</span>
										</div>
										<p className="ml-1" style={styles.text}>
											Plan b
										</p>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<div className="mt-3">
											<span style={styles.text}>
												<b>PLAN DURATION</b>
											</span>
										</div>
										<p className="ml-1 " style={styles.text}>
											2 months
										</p>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<div className="mt-3">
											<span style={styles.text}>
												<b>MENBERS NUMBER</b>
											</span>
										</div>
										<p className="ml-1" style={styles.text}>
											30
										</p>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<div className="mt-3">
											<span style={styles.text}>
												<b>Ad POSTING LIMIT(Max No)</b>
											</span>
										</div>
										<p className="ml-1 " style={styles.text}>
											100
										</p>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<div className="mt-3">
											<span style={styles.text}>
												<b>FEATURED FEE</b>
											</span>
										</div>
										<p className="ml-1" style={styles.text}>
											$20
										</p>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<div className="mt-3">
											<span style={styles.text}>
												<b>FEATURED DURATION</b>
											</span>
										</div>
										<p className="ml-1 " style={styles.text}>
											20 days
										</p>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<div className="mt-3">
											<span style={styles.text}>
												<b>URGENT FEE</b>
											</span>
										</div>
										<p className="ml-1" style={styles.text}>
											$30
										</p>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<div className="mt-3">
											<span style={styles.text}>
												<b>URGENT DURATION</b>
											</span>
										</div>
										<p className="ml-1 " style={styles.text}>
											1 month
										</p>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<div className="mt-3">
											<span style={styles.text}>
												<b>HIGLIGHTED FEE</b>
											</span>
										</div>
										<p className="ml-1" style={styles.text}>
											$30
										</p>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<div className="mt-3">
											<span style={styles.text}>
												<b>HIGLIGHTED DURATION</b>
											</span>
										</div>
										<p className="ml-1 " style={styles.text}>
											2 months
										</p>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</Container>
				</div>
			</div>

			{/* ============OFFCANVA FOR EDIT PLAN========== */}
			<div
				id="offcanvas-edit"
				uk-offcanvas="flip: true; overlay: true"
				style={{ marginTop: "4%" }}>
				<div class="uk-offcanvas-bar" style={{ width: "80%" }}>
					<MdCancel
						style={styles.close_icon}
						className="uk-offcanvas-close"
						uk-close
						type="button"
					/>
					<Container>
						<Card className="border-0">
							<Card.Header
								className="border-0"
								style={{ backgroundColor: "#76ba1b" }}>
								<b style={{ color: "white" }}>Edit Plan</b>
							</Card.Header>
							<Card.Body>
                                <Form>
								<Row>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>Plan Name *</Form.Label>
										<Form.Control
											placeholder="enter plan name"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>
											Plan Duration *
										</Form.Label>
										<Form.Control
											placeholder="enter plan duration"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>Featured Fee *</Form.Label>
										<Form.Control
											placeholder="enter fee"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>
											Featured Duration *
										</Form.Label>
										<Form.Control
											placeholder="enter Duration"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>Urgent Fee *</Form.Label>
										<Form.Control
											placeholder="enter fee"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>
											Urgent Duration *
										</Form.Label>
										<Form.Control
											placeholder="enter duration"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>
											Higlighted Fee *
										</Form.Label>
										<Form.Control
											placeholder="enter fee"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>
											Higlighted Duration *
										</Form.Label>
										<Form.Control
											placeholder="enter duration"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
								</Row>
                                </Form>
							</Card.Body>
						</Card>
					</Container>
				</div>
			</div>

			{/* ============OFFCANVA FOR ADD PLAN========== */}
			<div
				id="offcanvas-addplan"
				uk-offcanvas="flip: true; overlay: true"
				style={{ marginTop: "4%" }}>
				<div class="uk-offcanvas-bar" style={{ width: "80%" }}>
					<MdCancel
						style={styles.close_icon}
						className="uk-offcanvas-close"
						uk-close
						type="button"
					/>
					<Container>
						<Card className="border-0">
							<Card.Header
								className="border-0"
								style={{ backgroundColor: "#76ba1b" }}>
								<b style={{ color: "white" }}>Create Plan</b>
							</Card.Header>
							<Card.Body>
                            <Form>
								<Row>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>Plan Name *</Form.Label>
										<Form.Control
											placeholder="enter plan name"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>
											Plan Duration *
										</Form.Label>
										<Form.Control
											placeholder="enter plan duration"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>Featured Fee *</Form.Label>
										<Form.Control
											placeholder="enter fee"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>
											Featured Duration *
										</Form.Label>
										<Form.Control
											placeholder="enter Duration"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>Urgent Fee *</Form.Label>
										<Form.Control
											placeholder="enter fee"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>
											Urgent Duration *
										</Form.Label>
										<Form.Control
											placeholder="enter duration"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>
											Higlighted Fee *
										</Form.Label>
										<Form.Control
											placeholder="enter fee"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
									<Col xm={12} sm={12} md={12} lg={6} xl={6}>
										<Form.Label style={styles.label}>
											Higlighted Duration *
										</Form.Label>
										<Form.Control
											placeholder="enter duration"
											type="number"
											min="0"
											style={{ height: "50px", boxShadow: "none" }}
										/>
									</Col>
                                
								</Row>
                                </Form>
							</Card.Body>
						</Card>
					</Container>
				</div>
			</div>
		</div>
	);
}

const styles = {
	image: {
		height: "100px"
	},
	label: {
		opacity: "0.6",
		fontSize: "0.9em",
		color: "black",
		marginTop: "20px"
	},
	avater: {
		height: "100px"
	},
	iconD: {
		color: "#ffa500",
		fontSize: "30px"
	},
	text: {
		fontSize: "15px",
		color: "black",
		opacity: "0.6"
	},
	icon: {
		fotsize: "30px",
		color: "#ffa500"
	},
	close_icon: {
		fontSize: "1.9em",
		color: "#ffa500"
	},
	titel: {
		opacity: "0.9",
		fontSize: "20px",
		width: "300px",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis"
	},
	category: {
		fontSize: "0.7em",
		color: "#ffa500",
		backgroundColor: "whitesmoke",
		padding: "3px"
	},
	subCategory: {
		fontSize: "0.7em",
		color: "#ffa500",
		backgroundColor: "whitesmoke",
		padding: "3px"
	},
	location: {
		fontSize: "0.7em"
	},
	date: {
		fontSize: "0.7em"
	},
	price: {
		fontSize: "0.9em",
		color: "#ffa500",
		backgroundColor: "whitesmoke",
		padding: "3px"
	}
};
