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
import { AiOutlineEye } from "react-icons/ai"
import { MdCancel } from "react-icons/md";
import {
	IoMdTrash,
} from "react-icons/io";

import { FaLockOpen, FaLock } from "react-icons/fa";
import pic from "../images/pic.jpg";


//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (delete)
const deleteTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Delete User
	</Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (block )
const blockTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
    Block User
	</Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (unblock )
const unblockTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
    Unblock User
	</Tooltip>
);

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (view)
const viewTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		View User
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
								<th style={{ color: "white", fontWeight: "bold" }}>Name</th>
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
								<td>
									<Image src={pic} style={styles.image} roundedCircle />
								</td>
								<td>
									<p style={styles.name}>Ibe Andyson Andrew</p>
								</td>
								<td>
									<p style={styles.name}>Andyson@gmail.com</p>
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
											overlay={blockTooltip}>
											<Button
												class="uk-button uk-button-default"
												type="button"
												size="sm"
												variant="light">
												<FaLock  style={{ color: "black" }} />
											</Button>
										</OverlayTrigger>
										
										<OverlayTrigger
											placement="bottom"
											delay={{ show: 50, hide: 100 }}
											overlay={unblockTooltip}>
											<Button
												class="uk-button uk-button-default"
												type="button"
												size="sm"
												variant="light">
												<FaLockOpen style={{ color: "green" }} />
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

			{/* ============OFFCANVA FOR VIEW USER========== */}
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
										<b style={{ color: "white" }}>User Info</b>
									</Card.Header>
									<Card.Body>
										<ProfileInfo/>
									</Card.Body>
								</Card>
							</Col>
							<Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-4">
							
							</Col>
						</Row>
					</Container>
				</div>
			</div>
		</div>
	);
}

 function ProfileInfo() {
	return (
		<div>
			<Card className="border-0">
				<Card.Body>
					<Row>
						<Col
							xs={12}
							sm={12}
							md={12}
							lg={12}
							xl={12}
							className="text-center">
							<Image src={pic} style={styles.proPic} />
						</Col>
						<Col xs={12} sm={12} md={12} lg={12} xl={12}>
							<Card.Header className="bg-light pb-0 mt-3">
								<p style={styles.proText}>
									<b className="mr-3 ">Name:</b>ibe Andrew Chiwendu Andyson
								</p>
							</Card.Header>
							<Card.Header className="bg-light pb-0">
								<p style={styles.proText}>
									<b className="mr-3 pt-2">Username:</b>Andy
								</p>
							</Card.Header>
							<Card.Header className="bg-light pb-0">
								<p style={styles.proText}>
									<b className="mr-3 pt-2">Sex:</b>male
								</p>
							</Card.Header>
							<Card.Header className="bg-light pb-0">
								<p style={styles.proText}>
									<b className="mr-3 pt-2">Phone:</b>09033275449
								</p>
							</Card.Header>
							<Card.Header className="bg-light pb-0">
								<p style={styles.proText}>
									<b className="mr-3 pt-2">Email:</b>Andy@gmail.com
								</p>
							</Card.Header>
							<Card.Header className="bg-light pb-0">
								<p style={styles.proText}>
									<b className="mr-3 pt-2">Joined:</b>4days ago
								</p>
							</Card.Header>
							<Card.Header className="bg-light pb-0">
								<p style={styles.proText}>
									<b className="mr-3 pt-2">Bio:</b>ddsdfjfj jdcjdjs d dcjsdjj
									djsdjjsj sj dsdwdiwiwi isiwiwiii iwiewejw wkkkk kwkwwk wew
								</p>
							</Card.Header>
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
	proPic: {
		height: "300px",
		width: "300px"
	},
	proText: {
		opacity: "0.8",
		fontSize: "15px",
		color: "black"
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
		fontSize: "15px",
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
