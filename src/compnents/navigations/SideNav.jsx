import React from "react";
import { Button } from "react-bootstrap";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { MdCancel } from "react-icons/md";

export default function SideNav() {
	return (
		<div>
			<div type="button" uk-toggle="target: #offcanvas-push">
				<AiOutlineMenuUnfold style={styles.icon} />
			</div>

			<div id="offcanvas-push" uk-offcanvas="mode: push; overlay: true">
				<div className="uk-offcanvas-bar uk-padding-remove  uk-margin-remove">
					<div>
						<MdCancel
							style={styles.close_icon}
							className="uk-offcanvas-close"
							uk-close
						/>
					</div>
					<h6 style={styles.menu} className="uk-padding-small">
						Menu
					</h6>
					<div style={styles.line}>
						<hr />
					</div>
					<div>
					    <Button className="rounded-0" variant="dark" size="sm" block>Dashboard</Button>
						<Button className="rounded-0" variant="dark" size="sm" block>My Ads</Button>
						<Button className="rounded-0" variant="dark" size="sm" block>My Profile</Button>
						<Button className="rounded-0" variant="dark" size="sm" block>Menbership</Button>
						<Button className="rounded-0" variant="dark" size="sm" block>Transaction</Button>
						<Button className="rounded-0" variant="dark" size="sm" block>Logout</Button>
						<Button className="rounded-0" variant="dark" size="sm" block>Login</Button>
						<Button className="rounded-0" variant="dark" size="sm" block>Register</Button>
						<Button className="rounded-0" variant="warning"  size="sm" block style={styles.post_free_add_btn}>
							Post Free Ad
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

//THIS COMPONET STYLES GOES HERE
const styles = {
	icon: {
		color: "white",
		fontSize: "35px"
	},
	close_icon: {
		fontSize: "1.9em",
		color: "#ffa500",
		marginTop: "-20px"
	},
	line: {
		marginTop: "-20px"
	},
	menu: {
		marginTop: "-5px"
	},
	post_free_add_btn: {
		color: "white",
		backgroundColor: "#ffa500",
		border: "none"
	}
};
