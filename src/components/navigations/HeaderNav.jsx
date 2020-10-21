import React from "react";
import { Navbar,  Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import SideNav from "../navigations/SideNav";
import NotificationSlide from "../navigations/NotificationSlide"
import logo from "../images/logo.png";

//THIS IS FOR HOVER TOOLTIP TO SHOW A TEXT (CHANGE CONTRY)
const renderTooltip = (props) => (
	<Tooltip id="button-tooltip" {...props}>
		Change Contry
	</Tooltip>
);

//THIS IS A HEADER COMPOENT
export default function HeaderNav() {
	return (
		<div>
			<Navbar style={styles.head} className=" shadow-sm fixed-top" >
				<Navbar.Brand href="#home">
					<img src={logo} style={styles.logo} />
				</Navbar.Brand>
				<Navbar.Brand href="#home">
					<OverlayTrigger
						placement="right"
						delay={{ show: 250, hide: 400 }}
						overlay={renderTooltip}>
						<Button variant="outline-warning" style={styles.contrey_btn}>
							country
						</Button>
					</OverlayTrigger>
				</Navbar.Brand>

				<Navbar.Collapse className="justify-content-end">
					
				<Navbar.Brand styles={styles.language}>
						<NotificationSlide/>
					</Navbar.Brand>
					<Navbar.Brand styles={styles.language}>
						<Button variant="warning" style={styles.post_free_add_btn}>
							EN
						</Button>
					</Navbar.Brand>
					<Navbar.Brand  className="d-lg-none d-xs-block  d-sm-block d-md-block">
						<SideNav/>
					</Navbar.Brand>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}



//THE COMPONET STYLES GOES HERE.....
const styles = {
	head: {
		backgroundColor: "#76ba1b"
	},
	post_free_add_btn: {
		color: "white",
		backgroundColor: "#ffa500",
		border: "none"
	},
	auth: {
		color: "white"
	},
	contrey_btn: {
		color: "white",
		fontSize: "0.6em"
	},
	logo: {
		height: "30px",
		backgroundColor: "white",
		borderRadius: "5px"
	},
	
	nav_icon:{
		border: "5px solid red"
	}
};
