import React, { useState } from "react";
import { Card, Form, Col, Row, Accordion, Button } from "react-bootstrap";
import { AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { FaRegAddressCard } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; 

export default function ProfileForm() {
	const [text, setText] = useState("");
	const handleOnChange = () => {
		setText("");
	};
	return (
		<div>
			<Form>
				<Card className="border-0">
					<Card.Header className="bg-white ">
						<AiOutlineUser className="mr-3" style={styles.icon} />
						<b style={{ opacity: "0.7" }}>My Details</b>
					</Card.Header>
					<Card.Body>
						<Row>
							<Col xs={12} sm={12} md={6} lg={6} xl={6}>
								<Form.Label style={styles.label}>Name</Form.Label>
								<div
									class="input-group mb-3 shadow-none"
									style={{ height: "50px" }}>
									<div className="input-group-prepend">
										<span class="input-group-text">
											<AiOutlineUser />
										</span>
									</div>

									<Form.Control
										placeholder="name"
										style={{ height: "50px", boxShadow: "none" }}
									/>
								</div>
							</Col>
							<Col xs={12} sm={12} md={6} lg={6} xl={6}>
								<Form.Label style={styles.label}>Phone Number</Form.Label>
								<div
									className="input-group mb-3 shadow-none"
									style={{ height: "50px" }}>
									<div class="input-group-prepend">
										<span class="input-group-text">
											<AiOutlinePhone />
										</span>
									</div>

									<Form.Control
										placeholder="phone number"
										style={{ height: "50px", boxShadow: "none" }}
									/>
								</div>
							</Col>
							<Col xs={12} sm={12} md={6} lg={6} xl={6}>
								<Form.Label style={styles.label}>Address</Form.Label>
								<div
									className="input-group mb-3 shadow-none"
									style={{ height: "50px" }}>
									<div class="input-group-prepend">
										<span class="input-group-text">
											<FaRegAddressCard />
										</span>
									</div>

									<Form.Control
										placeholder="Address"
										style={{ height: "50px", boxShadow: "none" }}
									/>
								</div>
							</Col>
							<Col xs={12} sm={12} md={6} lg={6} xl={6}>
								<Form.Label style={styles.label}>Country</Form.Label>
								<div
									className="input-group mb-3 shadow-none"
									style={{ height: "50px" }}>
									<div class="input-group-prepend">
										<span class="input-group-text">
											<GoLocation />
										</span>
									</div>

									<Form.Control
										as="select"
										defaultValue="Choose..."
										placeholder="phone number"
										style={{ height: "50px", boxShadow: "none" }}>
										<option>Choose...</option>
										<option>...</option>
									</Form.Control>
								</div>
							</Col>
							<Col xs={12} sm={12} md={12} lg={12} xl={12}>
								<Form.Label style={styles.label}>About Me</Form.Label>
								<ReactQuill
									value={text.handleOnChange}
									onChange={handleOnChange}
									row="3"
									style={{ height: "300px", marginBottom: "100px" }}
								/>
							</Col>
							<Col xs={12} sm={12} md={12} lg={12} xl={12}>
								<Form.Label style={styles.label} className="mr-3">
									Upload Image
								</Form.Label>
								<div uk-form-custom="target: true">
									<input type="file" />
									<input
										class="uk-input uk-form-width-medium"
										type="text"
										placeholder="Select file"
										disabled
									/>
								</div>
							</Col>
						</Row>
					</Card.Body>
				</Card>
				<div>
					<Card className="border-0 mt-4">
						<Card.Body>
							<Accordion>
								<Card className="border-0 mt-4">
									<Card.Header style={{ backgroundColor: "white" }}>
										<Row>
											<Col xs={12} sm={12} md={6} lg={6} xl={6}>
												<p style={{ opacity: "0.7" }}>
													Notify me by e-mail when a ad gets posted that is
													relevant to my choice
												</p>
											</Col>
											<Col xs={12} sm={12} md={6} lg={6} xl={6}>
												<Accordion.Toggle
													style={styles.btn}
													as={Button}
													variant="outline-warning"
													eventKey="0">
													Subscribe Now
												</Accordion.Toggle>
											</Col>
										</Row>
									</Card.Header>
									<Accordion.Collapse eventKey="0">
										<Card.Body>
											<Form.Check
												type="checkbox"
												id="autoSizingCheck2"
												label="Agro tools"
												style={styles.check}
											/>
										</Card.Body>
									</Accordion.Collapse>
								</Card>
							</Accordion>
							<Button style={styles.btnUpdate} variant="warning" size="sm" >
								Update
							</Button>
						</Card.Body>
					</Card>
				</div>
			</Form>
		</div>
	);
}

const styles = {
	icon: {
		color: "#ffa500",
		fontSize: "20px"
	},
	label: {
		opacity: "0.6",
		fontSize: "0.9em"
	},
	btnUpdate: {
		marginTop: "10px",
		backgroundColor: "#ffa500",
		border: "none",
		color: "white"
	},
	btn: {
		backgroundColor: " white",
		color: "#ffa500"
	},
	check: {
		color: "#ffa500"
	},
	btnUpdate: {
		marginTop: "10px",
		backgroundColor: "#ffa500",
		border: "none",
		color: "white",
		fontSize: "15px",
		width: "100px",
		height: "40px"
	}
};
