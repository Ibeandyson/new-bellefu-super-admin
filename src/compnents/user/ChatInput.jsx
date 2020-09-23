import React from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { AiOutlinePaperClip } from "react-icons/ai"

//THIS IS CHAT INPUT COMPOENT
export default function ChatInput() {
	return (
		<div>
			<div style={styles.head} className="  fixed-bottom">
				<Form>
					<Row>
						<Col xs={8} sm={8} md={6} lg={8} xl={8}>
							<Form.Control
								className="border-0 shadow-sm"
								placeholder="Type a message......."
								style={{
									boxShadow: "none",
									marginBottom: "20px",
									borderRadius: "20px"
								}}
							/>
						</Col>
						<Col xs={2} sm={2} md={2} lg={2} xl={2}>
							<Card className="border-0 shadow-sm" style={styles.file}><AiOutlinePaperClip style={styles.iconFile}/></Card>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
}

//THE COMPONET STYLES GOES HERE.....
const styles = {
	head: {
		maxWidth: "700px",
		margin: "auto"
    },
    file:{
        height: "30px",
		borderRadius: "50px",
        width: "30px",
        display: "inline-block",
		cursor: "pointer",
    },
    iconFile:{
        fontSize: "100px",
        padding:"5px"
    }
};
