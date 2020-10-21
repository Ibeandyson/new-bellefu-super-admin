import React, { useState, useEffect } from "react";
import { Form, Row, Col, Card, Alert } from "react-bootstrap";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";

//THIS IS CHAT INPUT COMPOENT
export default function ChatInput() {
	// ==========================================
	// for image upload preview
	// ==========================================
	const [file, setFile] = useState();
	const [preview, setPreview] = useState();

	useEffect(() => {
		if (!file) {
			setPreview(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(file);
		setPreview(objectUrl);
		return () => {
			URL.revokeObjectURL(objectUrl);
		};
	}, [file]);
	const onSelectFile = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setFile(undefined);
			return;
		}
		setFile(e.target.files[0]);
	};
	const [show, setShow] = useState(true);

	return (
		<div>
			<div style={styles.head} className="  fixed-bottom">
				<Form>
					{file && show ? (
						<Card className="border-0 mb-3">
							<Card.Body>
								<Alert
									variant="danger"
									onClose={() => setShow(false)}
									dismissible>
										{preview.map((files)=> (
											<img
										src={files}
										style={{ height: "70px", width: "70px" }}
									/>
										))}
									
								</Alert>
							</Card.Body>
						</Card>
					) : null}

					<Row>
						<Col xs={2} sm={2} md={2} lg={2} xl={2}>
							<Card className="border-0 shadow-sm ml-2" style={styles.file}>
								<div uk-form-custom="target: true">
									<input type="file" multiple onChange={onSelectFile} />
									<AiOutlinePaperClip style={styles.iconFile} />
								</div>
							</Card>
						</Col>
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
							<Card className="border-0 shadow-sm mr-3" style={styles.file}>
								<FaLocationArrow style={styles.iconFile} />
							</Card>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
}
{
	/* <input class="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled/> */
}
//THE COMPONET STYLES GOES HERE.....
const styles = {
	head: {
		maxWidth: "700px",
		margin: "auto"
	},
	file: {
		height: "30px",
		borderRadius: "50px",
		width: "30px",
		display: "inline-block",
		cursor: "pointer",
		marginTop: "5px"
	},
	iconFile: {
		fontSize: "100px",
		padding: "5px"
	}
};
