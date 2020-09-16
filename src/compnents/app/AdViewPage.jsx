import React from "react";
import { Col, Row, Container} from "react-bootstrap";
import AdDetails  from "../Ads/AdDetails"
import UserAdInfo from "../user/UserAdInfo"
import AdviewSlide from "../slideshow/AdviewSlide";
import HeaderNav from "../navigations/HeaderNav";
import BottomNav from "../navigations/BottomNav";
import AdSafetyTip from "../Ads/AdSafetyTip"

export default function AdViewPage() {
	return (
		<div>
		
			<HeaderNav />
			<Container>
			<Row>
				<Col xs={12} sm={12} md={12} lg={12} xl={12}>
					<div style={{ marginTop: "10%" }} className="d-none d-lg-block  d-md-none">
						<AdviewSlide />
					</div>
					{/* ===FOR MOBILE VIEW=== */}
					<div style={{ marginTop: "30%" }} className=" d-lg-none  d-xs-block d-sm-block d-md-block ">
						<AdviewSlide />
					</div>
				</Col>
				<Col xs={12} sm={12} md={12} lg={8} xl={8}>
					<div style={{ marginTop: "5%" }}>
					<AdDetails/>	
					</div>
				</Col>
				<Col xs={12} sm={12} md={12} lg={4} xl={4}>
					<Row>
				   <Col xs={12} sm={12} md={12} lg={12} xl={12}>
					<div style={{ marginTop: "10%" }}>
						<UserAdInfo/>
					</div>
				</Col>
				<Col xs={12} sm={12} md={12} lg={12} xl={12}>
					<div style={{ marginTop: "10%" }}>
						<AdSafetyTip/>
					</div>
				</Col>
					</Row>
				</Col>
			</Row>
			</Container>

			<BottomNav />
		</div>
	);
}
