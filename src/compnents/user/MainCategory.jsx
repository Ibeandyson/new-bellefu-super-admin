import React from "react";
import {
	Card,
	Button,
	Row,
	Col,
	Container,
	Form
} from "react-bootstrap";

export default function MainCategory() {
	return (
		<div>
			<Container>
				<Card className="border-0">
					<Card.Header
						className="border-0"
						style={{ backgroundColor: "#76ba1b" }}>
						<b style={{ color: "white" }}>Create Category</b>
					</Card.Header>
					<Card.Body>
						<Form>
							<Row>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<Form.Label style={styles.label}>Category Name *</Form.Label>
									<Form.Control
										placeholder="enter category name"
										style={{ height: "50px", boxShadow: "none" }}
									/>
								</Col>
								<Col xm={12} sm={12} md={12} lg={6} xl={6}>
									<Form.Label style={styles.label}>Category Icon *</Form.Label>
									<br />
									<div uk-form-custom="target: true">
										<input type="file" />
										<input
											class="uk-input uk-form-width-large"
											type="text"
											placeholder="Select file"
											disabled
										/>
									</div>
								</Col>
								<Col xm={12} sm={12} md={12} lg={12} xl={12} className="mt-4">
									<Button style={styles.btnCreate} variant="warning" size="sm">
										<b>Create</b>
									</Button>
								</Col>
							</Row>
						</Form>
					</Card.Body>
				</Card>
			</Container>
		</div>
	);
}

const styles = {

	label: {
		opacity: "0.6",
		fontSize: "0.9em",
		color: "black",
		marginTop: "20px"
	},
	
	btnCreate: {
		marginTop: "10px",
		backgroundColor: "#ffa500",
		border: "none",
		color: "white"
	},
};
