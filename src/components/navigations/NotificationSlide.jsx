import React from "react";
import { Button, Card, Row,  Col } from "react-bootstrap";

import { MdCancel } from "react-icons/md";
import { AiFillBell } from "react-icons/ai";

export default function NotificationSlide() {
	return (
		<div>
			<div uk-toggle="target: #offcanvas-notification"  >
				<AiFillBell
					style={{ color: "white", fontSize: "1.2em",cursor: "pointer", }}
				/>
				<span style={styles.notfiCount} className="text-center "></span> 
			</div>

			{/* ============OFFCANVA FOR Notification========== */}
			<div id="offcanvas-notification" uk-offcanvas="flip: true; overlay: true">
				<div class="uk-offcanvas-bar uk-padding-small">
					<MdCancel
						style={styles.close_icon}
						className="uk-offcanvas-close"
						uk-close
						type="button"
					/>
                     <p style={{color:"whitesomke", fontWeight: "bold"}}>Notifications</p>
					<Row className="mt-3">
						<Col xs={12} sm={12} md={12} lg={12} xl={12} className="mt-2">
							<Card className="border-0" style={styles.card}>
								<Card.Header style={styles.cardHeader} className="pt-0 pb-0">
									<b style={styles.title}>Notification Type</b>
								</Card.Header>
								<Card.Body>
									<p style={styles.msg}>your product is not accepted</p>
								</Card.Body>
							</Card>
						</Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}className="mt-2" >
							<Card className="border-0" style={styles.card}>
								<Card.Header style={styles.cardHeader}  className="pt-0 pb-0">
									<b style={styles.title}>Notification Type</b>
								</Card.Header>
								<Card.Body>
									<p style={styles.msg}>your product is not accepted</p>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
}

const styles = {
	close_icon: {
		fontSize: "1.9em",
		color: "#ffa500"
	},
	title: {
		color: "white",
		fontSize: "0.7em",
		marginTop: "-100px",
		marginBottom: "-100px"
	},
	msg: {
		color: "black",
		fontSize: "0.7em",
		marginTop: "-10px",
		marginBottom: "-30px"
	},
	card: {
		width: "100%",
		backgroundColor: "whitesmoke"
	},
	cardHeader: {
		backgroundColor: "#76ba1b",
	},
	notfiCount: {
		color: "white",
		height: "10px",
		backgroundColor: "red",
		borderRadius: "50px",
        width: "10px",
        display: "inline-block",
        fontWeight: "bold",
        marginTop: "-30px",
        marginLeft: "-10px",
		cursor: "pointer",
	
	}
};
