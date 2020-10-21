import React from "react";
import {
	Card,
	Row,
	Col,
	Container,
	Accordion,
	Form,
	Button
} from "react-bootstrap";

export default function PostAdPayment() {
	return (
		<div>
			<Container>
				<Form>
					<Card className="border-0">
						<Card.Header
							className="border-0"
							style={{ backgroundColor: "#76ba1b" }}>
							<b style={{ color: "white" }}>Choose Payment Method </b>
						</Card.Header>
						<Card.Body>
                        <Row>
                            <Col xm={4} sm={4} md={4} lg={4} xl={4}>
							<Form.Label
								className="mt-3 "
								style={{ opacity: "0.4", fontSize: "0.8em" }}>
								<b>Pay With Card </b>
							</Form.Label>
							<Form.Check
								type="checkbox"
								aria-label="Paystack"
								label="Paystack"
								id="formHorizontalRadios2"
							/>
                            </Col>
                            <Col xm={4} sm={4} md={4} lg={4} xl={4}>
							<Form.Label
								className="mt-3 "
								style={{ opacity: "0.4", fontSize: "0.8em" }}>
								<b>Pay With Wallet </b>
							</Form.Label>
							<Form.Check
								type="checkbox"
                                aria-label="Pay With Wallet Blance"
                                label="Wallet"
								id="formHorizontalRadios2"
							/>
                            </Col>
                            <Col xm={4} sm={4} md={4} lg={4} xl={4}>
                            <p 	style={{ opacity: "0.4", fontSize: "0.8em" }}	className="mt-3 "><b>Wallet Balance</b></p>
                            <p style={{ opacity: "0.4", fontSize: "0.8em" }}>$30000</p>
                            </Col>
                        
							
								<Col>
									<Form.Label
										className="mt-3 "
										style={{ opacity: "0.4", fontSize: "0.8em" }}>
										<b>Voucher </b>
									</Form.Label>
									<Form.Control
										className="mb-4"
										style={styles.input}
										placeholder="enter code"
									/>
								</Col>
							</Row>

							<Button style={styles.btnSubmit} variant="warning" size="sm">
								Pay
							</Button>
						</Card.Body>
					</Card>
				</Form>
			</Container>
		</div>
	);
}

const styles = {
	input: {
		boxShadow: "none"
	},
	btnSubmit: {
		marginTop: "30px",
		backgroundColor: "#ffa500",
		border: "none",
		color: "white",
		fontSize: "17px",
		width: "100px",
		height: "40px"
	}
};
