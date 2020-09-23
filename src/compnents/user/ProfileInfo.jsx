import React from "react";
import { Col, Row, Card, Image } from "react-bootstrap";
import pic from "../images/pic.jpg";

export default function ProfileInfo() {
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
								<p style={styles.text}>
									<b className="mr-3 ">Name:</b>ibe Andrew Chiwendu Andyson
								</p>
							</Card.Header>
							<Card.Header className="bg-light pb-0">
								<p style={styles.text}>
									<b className="mr-3 pt-2">Username:</b>Andy
								</p>
							</Card.Header>
							<Card.Header className="bg-light pb-0">
								<p style={styles.text}>
									<b className="mr-3 pt-2">Phone:</b>09033275449
								</p>
							</Card.Header>
							<Card.Header className="bg-light pb-0">
								<p style={styles.text}>
									<b className="mr-3 pt-2">Email:</b>Andy@gmail.com
								</p>
							</Card.Header>
							<Card.Header className="bg-light pb-0">
								<p style={styles.text}>
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
	proPic: {
		height: "300px",
		width: "300px"
	},
	text: {
		opacity: "0.8",
		fontSize: "15px"
	}
};
