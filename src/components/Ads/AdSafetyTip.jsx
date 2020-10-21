import React from "react";
import { Card, Row, Col, Accordion, Button } from "react-bootstrap";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function AdSafetyTip() {
	return (
		<div>
			<Card className="border-0 ">
				<Card.Header
					className="border-0"
					style={{ backgroundColor: "#76ba1b" }}>
					<b style={{ color: "white" }}>Safety tips</b>
				</Card.Header>
				<Card.Body>
					<Row>
						<Col xm={12} sm={12} md={12} lg={12} xl={12} className=" mt-2">
							<div>
								<IoMdCheckmarkCircleOutline
									style={styles.icon}
									className="mr-1"
								/>{" "}
								<span style={styles.text}>
									Ensure quality/quantity of Products/Services.
								</span>
							</div>
						</Col>
						<Col xm={12} sm={12} md={12} lg={12} xl={12} className=" mt-2">
							<div>
								<IoMdCheckmarkCircleOutline
									style={styles.icon}
									className="mr-1"
								/>{" "}
								<span style={styles.text}>
									Ensure meeting in a secured place if the need arise.
								</span>
							</div>
						</Col>
						<Col xm={12} sm={12} md={12} lg={12} xl={12} className=" mt-2">
							<div>
								<IoMdCheckmarkCircleOutline
									style={styles.icon}
									className="mr-1"
								/>{" "}
								<span style={styles.text}>
									Contact support@bellefu.com if you require verification of
									buyer or seller (Terms & Conditions apply)
								</span>
							</div>
						</Col>
						<Col xm={12} sm={12} md={12} lg={12} xl={12} className=" mt-2">
							<div className="text-center">
								<Button
									className="border-0"
									style={{
										fontSize: "0.9em",
										backgroundColor: "#ffa500",
										boxShadow: "none"
									}}>
									<b style={{ color: "white" }}>Report This Ad</b>
								</Button>
							</div>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</div>
	);
}

const styles = {
	avater: {
		height: "100px"
	},
	icon: {
		color: "#ffa500",
		fontSize: "20px"
	},
	text: {
		fontSize: "13px"
	}
};
