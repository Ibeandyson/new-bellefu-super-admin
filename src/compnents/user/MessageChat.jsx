import React from "react";
import { Col, Row,  } from "react-bootstrap";
import pic from "../images/pic.jpg";


// THIS IS CHAT COMPONENT
export default function MessageChat() {
	return (
		<div>
			<Row>
				<Col xs={12} sm={12} md={12} lg={12} xl={12}>
					<ul className="p-1">
						<li className="d-flex flex-row  mt-4">
							<div
								style={{
									maxWidth: "80%",
									borderRadius: "20px",
									backgroundColor: "#CFF2A3",
									color: "black"
								}}
								className="d-inline  p-3">
								<div className="ml-5 ">
									<p>
										{" "}
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Omnis repellendus natus error eligendi quia provident minus
										molestiae unde reiciendis, at eum vel placeat ut dicta
										nulla? Ea earum laborum eligendi.
									</p>
								</div>
								<div className="ml-0">
									<img
										class="uk-border-circle"
										width="40"
										height="40"
										src={pic}
									/>
								</div>
							</div>
						</li>

						<li className="d-flex flex-row-reverse mt-4 ">
							<div
								style={{
									maxWidth: "80%",
									borderRadius: "20px",
									backgroundColor: "#CFF2A3",
									color: "black"
								}}
								className="d-inline  p-3">
								<div className="mr-5">
									<p>
										{" "}
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
									</p>
								</div>
								<div className="d-flex flex-row-reverse">
									<img
										class="uk-border-circle"
										width="40"
										height="40"
										src={pic}
									/>
								</div>
							</div>
						</li>

						<li className="d-flex flex-row  mt-4">
							<div
								style={{
									maxWidth: "80%",
									borderRadius: "20px",
									backgroundColor: "#CFF2A3",
									color: "black"
								}}
								className="d-inline  p-3">
								<div className="ml-5 ">
									<p> ok na i dy code the app so</p>
								</div>
								<div className="ml-0">
									<img
										class="uk-border-circle"
										width="40"
										height="40"
										src={pic}
									/>
								</div>
							</div>
						</li>
					</ul>
				</Col>
               
			</Row>
		</div>
	);
}
