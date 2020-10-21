import React from 'react'
import {
	Card,
	Col,
	Row,
	OverlayTrigger,
	Badge,
	Tooltip
} from "react-bootstrap";
import pic from "../images/pic.jpg";
import { AiFillHeart } from "react-icons/ai";
import { BsArrowLeftRight } from "react-icons/bs";

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (convert)
const convertTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		convert currency
	</Tooltip>
);

//==FUNCTION FOR LIKE AND UNLIKE BUTTON
const Switch = (e)  => {
	if (e.target.style.color === "#ffa500") {
		e.target.style.color = "red";
	} else if (e.target.style.color === "red") {
		e.target.style.color = "#ffa500";
	} else {
		e.target.style.color = "red";
	}
}

export default function LatestAd() {
    return (
        <div>
          	<Row>
				<Col xs={6} sm={6} md={3} lg={3} xl={3} className=" my-1 px-1">
					<Card className="border-0 rounded-lg">
						<Card.Img style={styles.image} variant="top" src={pic} />
						<Card.ImgOverlay style={{ marginTop: "-15px" }}>
							<Row>
								<Col xs={8} sm={8} md={8} lg={8} xl={8}>
									{/* <Badge style={{ marginLeft: "-10px" }} variant="danger">Ugent</Badge>
							<Badge style={{ marginLeft: "-10px" }} variant="warning">Featured</Badge> */}
									<Badge style={{ marginLeft: "-10px" }} variant="success">
										Highlighted
									</Badge>
								</Col>
								<Col xs={4} sm={4} md={4} lg={4} xl={4}>
									<AiFillHeart onClick={Switch} style={styles.favBtn} />
								</Col>
							</Row>
						</Card.ImgOverlay>
						<Card.Body style={styles.titleBody}>
							<p style={styles.title}>
								Some quick example text to bufflfl Some quick example text to
								bufflfl
							</p>
							<Row>
								<Col
									xs={12}
									sm={12}
									md={12}
									lg={12}
									xl={12}
									className="text-center">
									<span className="mr-1" style={styles.price}>
										$20000000000000
									</span>
									<OverlayTrigger
										placement="bottom"
										delay={{ show: 50, hide: 100 }}
										overlay={convertTooltip}>
										<BsArrowLeftRight
											className=" ml-1"
											style={{
												fontSize: "0.9em",
												cursor: "pointer",
												fontSize: "20px",
												color: "#ffa500"
											}}
										/>
									</OverlayTrigger>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={6} sm={6} md={3} lg={3} xl={3} className=" my-1 px-1">
					<Card className="border-0 rounded-lg">
						<Card.Img style={styles.image} variant="top" src={pic} />
						<Card.ImgOverlay style={{ marginTop: "-15px" }}>
							<Row>
								<Col xs={8} sm={8} md={8} lg={8} xl={8}>
									{/* <Badge style={{ marginLeft: "-10px" }} variant="danger">Ugent</Badge>
							<Badge style={{ marginLeft: "-10px" }} variant="warning">Featured</Badge> */}
									<Badge style={{ marginLeft: "-10px" }} variant="success">
										Highlighted
									</Badge>
								</Col>
								<Col xs={4} sm={4} md={4} lg={4} xl={4}>
									<AiFillHeart onClick={Switch} style={styles.favBtn} />
								</Col>
							</Row>
						</Card.ImgOverlay>
						<Card.Body style={styles.titleBody}>
							<p style={styles.title}>
								Some quick example text to bufflfl Some quick example text to
								bufflfl
							</p>
							<Row>
								<Col
									xs={12}
									sm={12}
									md={12}
									lg={12}
									xl={12}
									className="text-center">
									<span className="mr-1" style={styles.price}>
										$20000000000000
									</span>
									<OverlayTrigger
										placement="bottom"
										delay={{ show: 50, hide: 100 }}
										overlay={convertTooltip}>
										<BsArrowLeftRight
											className=" ml-1"
											style={{
												fontSize: "0.9em",
												cursor: "pointer",
												fontSize: "20px",
												color: "#ffa500"
											}}
										/>
									</OverlayTrigger>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={6} sm={6} md={3} lg={3} xl={3} className=" my-1 px-1">
					<Card className="border-0 rounded-lg">
						<Card.Img style={styles.image} variant="top" src={pic} />
						<Card.ImgOverlay style={{ marginTop: "-15px" }}>
							<Row>
								<Col xs={8} sm={8} md={8} lg={8} xl={8}>
									{/* <Badge style={{ marginLeft: "-10px" }} variant="danger">Ugent</Badge>
							<Badge style={{ marginLeft: "-10px" }} variant="warning">Featured</Badge> */}
									<Badge style={{ marginLeft: "-10px" }} variant="success">
										Highlighted
									</Badge>
								</Col>
								<Col xs={4} sm={4} md={4} lg={4} xl={4}>
									<AiFillHeart onClick={Switch} style={styles.favBtn} />
								</Col>
							</Row>
						</Card.ImgOverlay>
						<Card.Body style={styles.titleBody}>
							<p style={styles.title}>
								Some quick example text to bufflfl Some quick example text to
								bufflfl
							</p>
							<Row>
								<Col
									xs={12}
									sm={12}
									md={12}
									lg={12}
									xl={12}
									className="text-center">
									<span className="mr-1" style={styles.price}>
										$20000000000000
									</span>
									<OverlayTrigger
										placement="bottom"
										delay={{ show: 50, hide: 100 }}
										overlay={convertTooltip}>
										<BsArrowLeftRight
											className=" ml-1"
											style={{
												fontSize: "0.9em",
												cursor: "pointer",
												fontSize: "20px",
												color: "#ffa500"
											}}
										/>
									</OverlayTrigger>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>

				<Col xs={6} sm={6} md={3} lg={3} xl={3} className=" my-1 px-1">
					<Card className="border-0 rounded-lg">
						<Card.Img style={styles.image} variant="top" src={pic} />
						<Card.ImgOverlay style={{ marginTop: "-15px" }}>
							<Row>
								<Col xs={8} sm={8} md={8} lg={8} xl={8}>
									{/* <Badge style={{ marginLeft: "-10px" }} variant="danger">Ugent</Badge>
							<Badge style={{ marginLeft: "-10px" }} variant="warning">Featured</Badge> */}
									<Badge style={{ marginLeft: "-10px" }} variant="success">
										Highlighted
									</Badge>
								</Col>
								<Col xs={4} sm={4} md={4} lg={4} xl={4}>
									<AiFillHeart onClick={Switch} style={styles.favBtn} />
								</Col>
							</Row>
						</Card.ImgOverlay>
						<Card.Body style={styles.titleBody}>
							<p style={styles.title}>
								Some quick example text to bufflfl Some quick example text to
								bufflfl
							</p>
							<Row>
								<Col
									xs={12}
									sm={12}
									md={12}
									lg={12}
									xl={12}
									className="text-center">
									<span className="mr-1" style={styles.price}>
										$20000000000000
									</span>
									<OverlayTrigger
										placement="bottom"
										delay={{ show: 50, hide: 100 }}
										overlay={convertTooltip}>
										<BsArrowLeftRight
											className=" ml-1"
											style={{
												fontSize: "0.9em",
												cursor: "pointer",
												fontSize: "20px",
												color: "#ffa500"
											}}
										/>
									</OverlayTrigger>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>

			
			</Row>
        </div>
    )
}



const styles = {
	image: {
		height: "150px",
		padding: "5px",
		borderRadius: "10px"
	},
	title: {
		opacity: "0.9",
		fontSize: "14px",
		width: "150px",
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		marginTop: "-6px"
	},
	titleBody: {
		padding: "5px",
		paddingLeft: "10px"
	},
	price: {
		fontSize: "0.8em",
		backgroundColor: "whitesmoke",
		padding: "5px",
		color: "#ffa500"
	},
	favBtn: {
		marginBottom: "-220px",
		fontSize: "30px",
		color: "#ffa500",
		cursor: "pointer",
		padding: "2px",
		borderRadius: "50px",
		backgroundColor: "white"
	}
};
