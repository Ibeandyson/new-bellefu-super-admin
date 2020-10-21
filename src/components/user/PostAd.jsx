import React, { useState, useEffect } from "react";
import {
	Col,
	Row,
	Card,
	Form,
	Container,
	Button,
	Badge
} from "react-bootstrap";
import Select, { components } from "react-select";
import { GoLocation } from "react-icons/go";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "react-images-upload";

const options = [
	{ value: "Aro food", label: "Agro food" },
	{ value: "Agro job", label: "Agro job" },
	{ value: "Agro tools", label: "Agro tools" },
	{ value: "Agro training", label: "Vanilla" },
	{ value: "Agro training", label: "Agro training" },
	{ value: "Agro training", label: "Agro training" },
	{ value: "vanilla", label: "Vanilla" },
	{ value: "vanilla", label: "Vanilla" }
];

//FOR SELECT INCON
const { Option } = components;
const IconOption = (props) => (
	<Option {...props}>
		<GoLocation style={{ fontSize: 36 }} />
		{props.data.label}
	</Option>
);

export default function PostAd() {
	//==FOR DESCRIPTION INPUT
	const [text, setText] = useState("");
	const handleOnChange = () => {
		setText("");
	};

	const [pictures, setPictures] = useState();
	const onDrop = () => {
		setPictures(pictures);
	};

	return (
		<div>
			<Form>
				<Card className="border-0">
					<Card.Header
						className="border-0"
						style={{ backgroundColor: "#76ba1b" }}>
						<b style={{ color: "white" }}>step 1</b>
					</Card.Header>
					<Container>
						<Row>
							<Col xs={12} sm={12} md={12} lg={6} xl={6}>
								<Form.Label
									className="mt-3"
									style={{ opacity: "0.4", fontSize: "0.8em" }}>
									<b>Choose Category</b>
								</Form.Label>
								<Select
									options={options}
									placeholder={"--select category--"}
									styles={selectStyles}
								/>
							</Col>
							<Col xs={12} sm={12} md={12} lg={6} xl={6}>
								<Form.Label
									className="mt-3"
									style={{ opacity: "0.4", fontSize: "0.8em" }}>
									<b>Choose Sub Category</b>
								</Form.Label>
								<Select
									options={options}
									placeholder={"--select sub category--"}
									styles={selectStyles}
								/>
							</Col>
							<Col xs={12} sm={12} md={12} lg={6} xl={6}>
								<Form.Label
									className="mt-3"
									style={{ opacity: "0.4", fontSize: "0.8em" }}>
									<b>City</b>
								</Form.Label>
								<Form.Control
									onFocus={inputFocus}
									style={styles.input}
									type="text"
								/>
							</Col>
							<Col xs={12} sm={12} md={12} lg={6} xl={6}>
								<Form.Label
									className="mt-3"
									style={{ opacity: "0.4", fontSize: "0.8em" }}>
									<b>Phone Number</b>
								</Form.Label>
								<Form.Control onFocus={inputFocus} style={styles.input} />
							</Col>
							<Col xs={12} sm={12} md={12} lg={6} xl={6} className="mb-3">
								<Form.Label
									className="mt-3"
									style={{ opacity: "0.4", fontSize: "0.8em" }}>
									<b>Price</b>
								</Form.Label>
								<Form.Control onFocus={inputFocus} style={styles.input} />
							</Col>
						</Row>
					</Container>
				</Card>

				<Card className="border-0 mt-4">
					<Card.Header
						className="border-0"
						style={{ backgroundColor: "#76ba1b" }}>
						<b style={{ color: "white" }}>step 2</b>
					</Card.Header>
					<Container>
						<Row>
							<Col xs={12} sm={12} md={12} lg={6} xl={6}>
								<Form.Label
									className="mt-3"
									style={{ opacity: "0.4", fontSize: "0.8em" }}>
									<b>Title *</b>
								</Form.Label>
								<Form.Control onFocus={inputFocus}  style={styles.input}/>
							</Col>
							<Col xs={12} sm={12} md={12} lg={6} xl={6}>
								<Form.Label
									className="mt-3"
									style={{ opacity: "0.4", fontSize: "0.8em" }}>
									<b>Tags *</b>
								</Form.Label>
								<Form.Control placeholder="Enter the tags separated by commas." onFocus={inputFocus}  style={styles.input}/>
							</Col>
							<Col xs={12} sm={12} md={12} lg={12} xl={12}>
								<Form.Label
									className="mt-3"
									style={{ opacity: "0.4", fontSize: "0.8em" }}>
									<b>Description *</b>
								</Form.Label>
								<ReactQuill
									theme="snow"
									value={text.handleOnChange}
									onChange={handleOnChange}
									row="3"
									style={{ height: "300px", marginBottom: "100px" }}
								/>
							</Col>
							<Col xs={12} sm={12} md={12} lg={12} xl={12}>
								<ImageUploader
									withIcon={true}
									buttonText="Choose images"
									onChange={onDrop}
									imgExtension={[".jpg",  ".png", ".jpeg"]}
									maxFileSize={5242880}
									withPreview={true}
									fileSizeError=" file size is too big"
								/>
							</Col>
						</Row>
					</Container>
				</Card>
				<Card className="border-0 mt-4">
					<Card.Header
						className="border-0"
						style={{ backgroundColor: "#76ba1b" }}>
						<b style={{ color: "white" }}>step 3</b>
					</Card.Header>
					<Container>
						<Row>
							<Col xs={12} sm={12} md={12} lg={12} xl={12}>
								<div className="mt-3 bg-light" style={{ padding: "20px" }}>
									<Form.Check
									 type="checkbox"
										aria-label="free ad"
										label="Free Ad"
										id="formHorizontalRadios1"
									/>
								</div>
							</Col>
							<Col xs={4} sm={4} md={4} lg={4} xl={4} className="mt-3">
								<div style={{ padding: "20px" }}>
								<Form.Check
									 type="checkbox"
									aria-label="Featured"
									label="Featured"
									id="formHorizontalRadios2"
									
								/>
								</div>
							</Col>
							<Col
								xs={4}
								sm={4}
								md={4}
								lg={4}
								xl={4}
								className="mt-3"
								style={{ padding: "20px" }}>
								<p>Featured ads attract higher-quality viewer and are displayed prominently in the Featured ads section home page.</p>
							</Col>
							<Col xs={4} sm={4} md={4} lg={4} xl={4} className="mt-3" 	style={{ padding: "20px" }}>
                            <p>$1.00 for 30 days</p>
							<Badge variant="warning" style={{color: 'white'}}>RECOMMENDED</Badge>
							</Col>
							<Col xs={4} sm={4} md={4} lg={4} xl={4} className="mt-3">
								<div style={{ padding: "20px" }}>
								<Form.Check
									 type="checkbox"
									aria-label="Ugent"
									label="Ugent"
									id="formHorizontalRadios2"
									
								/>
								</div>
							</Col>
							<Col
								xs={4}
								sm={4}
								md={4}
								lg={4}
								xl={4}
								className="mt-3"
								style={{ padding: "20px" }}>
								<p>Make your ad stand out and let viewer know that your advertise is time sensitive.</p>
							</Col>
							<Col xs={4} sm={4} md={4} lg={4} xl={4} className="mt-3" 	style={{ padding: "20px" }}>
                            <p>$2.00 for 7 days</p>
							<Badge variant="danger">MORE RECOMMENDED</Badge>
							</Col>
							<Col xs={4} sm={4} md={4} lg={4} xl={4} className="mt-3">
								<div style={{ padding: "20px" }}>
								<Form.Check
									 type="checkbox"
									aria-label="Higlighted"
									label="Higlighted"
									id="formHorizontalRadios2"	
								/>
								</div>
							</Col>
							<Col
								xs={4}
								sm={4}
								md={4}
								lg={4}
								xl={4}
								className="mt-3"
								style={{ padding: "20px" }}>
								<p>Make your ad highlighted with border in listing search result page. Easy to focus.</p>
							</Col>
							<Col xs={4} sm={4} md={4} lg={4} xl={4} className="mt-3" style={{ padding: "20px" }}>
                            <p>$3.00 for 45 days</p>
							<Badge variant="success">MUST RECOMMENDED</Badge>
							</Col>
						</Row>
						<Button style={styles.btn} variant="warning" size="sm">
								Post
							</Button>
					</Container>
				</Card>
			</Form>
		</div>
	);
}


const inputFocus = (e) => {
	e.target.style.outLineColor = "none";
};

const selectStyles = {
	control: (styles) => ({
		...styles,
		backgroundColor: "white",
		height: "40px",
		fontSize: "13px",
		borderRadius: "5px",
		"&:focus": {
			borderColor: "1px solid green"
		},
		boxShadow: "none"
	}),
	option: (styles) => {
		return {
			...styles,
			backgroundColor: "white",
			fontSize: "15px",
			color: "black",
			postion: "relative",
			"&:hover": {
				backgroundColor: "#faebd7",
				color: "#ffa500"
			},
			cursor: "pointer"
		};
	},
	container: (styles) => {
		return {
			...styles,
			minHeight: "1px",
			textAlign: "left",
			"&:focus": {
				borderColor: "1px solid green"
			}
		};
	}
};

const styles = {
	btn: {
		marginTop: "30px",
		backgroundColor: "#ffa500",
		border: "none",
		color: "white",
		fontSize: "17px",
		width: "100px",
		height: "40px"
	},
	input: {
		boxShadow: "none"
	}
};
