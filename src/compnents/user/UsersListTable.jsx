import React from "react";
import {
	Card,
	Badge,
	Image,
	Button,
	Tooltip,
	OverlayTrigger,
	Row,
	Col,
	Container
} from "react-bootstrap";
import {
	AiOutlineTag,
	AiOutlineEye,
	AiFillPhone,
	AiFillEye
} from "react-icons/ai";

import {  MdCancel, MdLocationOn } from "react-icons/md";
import {
	IoMdTrash,
	IoIosArrowDroprightCircle,
	IoIosTime,
	IoIosArrowDropleftCircle,
	IoMdMailOpen
} from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { FaSlackHash, FaPencilAlt} from "react-icons/fa";
import pic from "../images/pic.jpg";
import land from "../images/land.PNG";

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (delete)
const deleteTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Delete Ad
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
		View Ad
	</Tooltip>
);

export default function UsersListTable() {
	return (
		<div>
			<Card className="border-0">
				<Card.Body>
					<table class="uk-table uk-table-responsive uk-table-divider">
						<thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
							<tr>
								<th
									style={{ color: "white", fontWeight: "bold" }}
									className="uk-table-expand">
									avater
								</th>
								<th style={{ color: "white", fontWeight: "bold" }}>
									Name
								</th>
								<th style={{ color: "white", fontWeight: "bold" }}>Email</th>
								<th style={{ color: "white", fontWeight: "bold" }}>Sex</th>
								<th style={{ color: "white", fontWeight: "bold" }}>Status</th>
								<th style={{ color: "white", fontWeight: "bold" }}>Joined</th>
								<th
									className="uk-table-expand"
									style={{ color: "white", fontWeight: "bold" }}>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td >
									<Image src={pic} style={styles.image} roundedCircle/>
								</td>
								<td>
									<p style={styles.name}>
										Ibe Andyson Andrew
									</p>
									</td>
								<td>
								<p style={styles.name}>
									Andyson@gmail.com
								</p>
									</td>
								<td>male</td>
								<td>
									<Badge variant="primary" className="ml-2">
										Active
									</Badge>
									<Badge variant="success" className="ml-2">
										Verified
									</Badge>

								</td>
								<td>3days ago</td>
								<td>
									<div className="btn-group" role="group">
										<OverlayTrigger
											placement="bottom"
											delay={{ show: 50, hide: 100 }}
											overlay={viewTooltip}>
											<Button
												class="uk-button uk-button-default"
												type="button"
												uk-toggle="target: #offcanvas-flip"
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

			{/* ============OFFCANVA FOR VIEW AD========== */}
			<div
				id="offcanvas-flip"
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
						<Row>
							<Col xs={12} sm={12} md={12} lg={12} xl={12}>
								<Card className="border-0">
									<Card.Header style={{ backgroundColor: "#76ba1b" }}>
										<b style={{ color: "white" }}> Ad</b>
									</Card.Header>
									<Card.Body>
										<ProductTitle />
										<div
											class="uk-position-relative uk-visible-toggle uk-dark"
											tabindex="-1"
											uk-slideshow="animation: pull"
											uk-slideshow="min-height: 100; max-height: 400">
											<ul
												uk-lightbox="animation: slide"
												class="uk-slideshow-items">
												<li>
													<a
														class="uk-cover-container uk-inline"
														href={pic}
														data-caption="Caption 1">
														<img src={pic} alt="" uk-cover />
													</a>
												</li>
												<li>
													<a
														class="uk-cover-container uk-inline"
														href={land}
														data-caption="Caption 1">
														<img src={land} alt="" uk-cover />
													</a>
												</li>
											</ul>

											<button
												class="uk-border-pill uk-button uk-button-default uk-button-small uk-position-center-left  "
												href="#"
												uk-slidenav-previous
												uk-slideshow-item="previous">
												<IoIosArrowDropleftCircle
													style={{ fontSize: "2em", color: "#ffa500" }}
												/>
											</button>
											<button
												class="uk-border-pill uk-button uk-border-remove uk-button-default uk-button-small  uk-position-center-right  "
												href="#"
												uk-slidenav-next
												uk-slideshow-item="next">
												<IoIosArrowDroprightCircle
													style={{ fontSize: "2em", color: "#ffa500" }}
												/>
											</button>
										</div>
									</Card.Body>
								</Card>
							</Col>
							<Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-4">
								<AdDetails />
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		</div>
	);
}

function ProductTitle() {
	return (
		<div>
			{/* ===FOR DESKTOP VIEW=== */}
			<div
				className="d-none d-lg-block  d-md-none"
				style={{ marginBottom: "15px" }}>
				<span
					className="mb-5"
					style={{
						fontSize: "15px",

						color: "black"
					}}>
					<b>Product Title</b>
				</span>
				<Badge variant="danger" className="ml-2">
					Ugent
				</Badge>
				<Badge style={{ color: "white" }} variant="warning" className="ml-2">
					Featured
				</Badge>
				<Badge variant="success" className="ml-2">
					Higlighted
				</Badge>
			</div>

			{/* ===FOR MOBILE VIEW=== */}
			<div
				className=" d-lg-none  d-xs-block d-sm-block d-md-block "
				style={{ marginBottom: "15px" }}>
				<span
					className="mb-5"
					style={{
						fontSize: "15px"
					}}>
					<b>Product Title</b>
				</span>
				<Badge variant="danger" className="ml-2">
					Ugent
				</Badge>
				<Badge style={{ color: "white" }} variant="warning" className="ml-2">
					Featured
				</Badge>
				<Badge variant="success" className="ml-2">
					Higlighted
				</Badge>
			</div>
		</div>
	);
}

// =====Ad Details====
function AdDetails() {
	return (
		<div>
			<Row>
				<Col>
					<Card className="border-0">
						<Card.Header
							className="border-0"
							style={{ backgroundColor: "#76ba1b" }}>
							<b style={{ color: "white" }}> Details</b>
						</Card.Header>
						<Card.Body>
							<Row>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<MdLocationOn style={styles.icon} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>Location</b>
										</span>
									</div>
									<p className="ml-5" style={styles.text}>
										Jos, Plateau
									</p>
								</Col>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<GiReceiveMoney style={styles.icon} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>Price</b>
										</span>
									</div>
									<p className="ml-5 " style={styles.text}>
										$300
									</p>
								</Col>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<IoIosTime style={styles.iconD} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>Posted</b>
										</span>
									</div>
									<p className="ml-5" style={styles.text}>
										2 months ago
									</p>
								</Col>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<AiFillPhone style={styles.iconD} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>Phone Number</b>
										</span>
									</div>
									<p className="ml-5 " style={styles.text}>
										09033275449
									</p>
								</Col>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<AiFillEye style={styles.iconD} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>Ad Views</b>
										</span>
									</div>
									<p className="ml-5" style={styles.text}>
										123
									</p>
								</Col>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<div className="mt-3">
										<FaSlackHash style={styles.iconD} className="mr-3" />{" "}
										<span style={styles.text}>
											<b>Ad ID</b>
										</span>
									</div>
									<p className="ml-5 " style={styles.text}>
										23
									</p>
								</Col>
							</Row>
						</Card.Body>
					</Card>

					<Row>
						<Col xm={12} sm={12} md={12} lg={6} xl={6}>
							<Card className="border-0 mt-4">
								<Card.Header
									className="border-0"
									style={{ backgroundColor: "#76ba1b" }}>
									<b style={{ color: "white" }}>Ad Discription</b>
								</Card.Header>
								<Card.Body>
									<Row>
										<Col xm={12} sm={12} md={12} lg={12} xl={12}>
											<span style={styles.text}>
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Earum cupiditate quos, illo dolorem rerum, magni
												repellendus eius commodi nemo aperiam ex. Accusamus eum
												esse qui at aperiam libero inventore modi!
											</span>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
						<Col xm={12} sm={12} md={12} lg={6} xl={6} className="mt-4">
							<UserAdInfo />
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
}

// ======user info dt own a Ad=====
function UserAdInfo() {
	return (
		<div>
			<Card className="border-0 ">
				<Card.Header
					className="border-0"
					style={{ backgroundColor: "#76ba1b" }}>
					<b style={{ color: "white" }}>Advertiser Info</b>
				</Card.Header>
				<Card.Body>
					<Row>
						<Col
							xm={12}
							sm={12}
							md={12}
							lg={12}
							xl={12}
							className="text-center">
							<Image src={pic} style={styles.avater} roundedCircle />
						</Col>
						<Col
							xm={12}
							sm={12}
							md={12}
							lg={6}
							xl={6}
							className="text-center mt-2">
							<p style={styles.text}>
								<b>Ibe Andyson Andrew</b>
							</p>
						</Col>
						<Col
							xm={12}
							sm={12}
							md={12}
							lg={6}
							xl={6}
							className="text-center mt-2">
							<div>
								<IoIosTime style={styles.icon} className="mr-3" />{" "}
								<span style={styles.text}>
									<b>2 months ago</b>
								</span>
							</div>
						</Col>
						<Col
							xm={12}
							sm={12}
							md={12}
							lg={6}
							xl={6}
							className="text-center mt-2">
							<div>
								<AiFillPhone style={styles.icon} className="mr-3" />{" "}
								<span style={styles.text}>
									<b>09033275449</b>
								</span>
							</div>
						</Col>
						<Col
							xm={12}
							sm={12}
							md={12}
							lg={6}
							xl={6}
							className="text-center mt-2">
							<div>
								<IoMdMailOpen style={styles.icon} className="mr-3" />{" "}
								<a href="mailto:ibeandyson123@gmail.com?subject=subject text">
									<span style={styles.text}>
										<b>Reply By Mail</b>
									</span>
								</a>
							</div>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</div>
	);
}

const styles = {
	image: {
		height: "50px"
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
		color: "black"
	},
	icon: {
		fotsize: "30px",
		color: "#ffa500"
	},
	close_icon: {
		fontSize: "1.9em",
		color: "#ffa500"
	},
	name: {
		opacity: "0.9",
		fontSize: "20px",
		width: "150px",
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


