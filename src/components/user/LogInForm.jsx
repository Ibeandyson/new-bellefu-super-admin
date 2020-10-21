import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { signin } from "../../redux/action/adminAction";
import Preloader from "./Preloader";

function LogInForm(props) {
	const [formData, setFormData] = useState({
		identifier: "",
		password: ""
	});

	const dispatch = useDispatch();

	const adminSignin = useSelector((state) => state.adminSignin);
	const { loading, user, error } = adminSignin;

	useEffect(() => {
		if (user) {
			window.location.reload(true)
			props.history.push("/admin_dashboard");
		}
		return () => {};
	}, [user]);

	const { identifier, password } = formData;
	const onChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmitHandle = (e) => {
		e.preventDefault();
		dispatch(signin(identifier, password));
	};

	return (
		<div>
			{loading && <Preloader />}
			{error && (
				<div class="alert alert-danger" role="alert">
					<strong>{error.message}</strong>
				</div>
			)}
			<Card className="border-0">
				<Card.Body>
					<h4 className="text-center">
						<strong>Welcome Back</strong>
					</h4>
					<p className="text-center">
						Don't have an account? <span ><Link to="/register" style={{color: "#ffa500"}}>Sign Up Now!</Link></span>
					</p>

					<form onSubmit={onSubmitHandle} className="uk-grid-small" uk-grid>
						<div className="uk-margin-top">
							<div className="uk-inline">
								<span
									className="uk-form-icon"
									uk-icon="icon: mail"
									style={styles.iconForm}></span>
								<input
									required
									className="uk-input  uk-form-width-large"
									placeholder="Email or Phone"
									type="text"
									value={identifier}
									name="identifier"
									onChange={(e) => onChangeHandler(e)}
								/>
							</div>
							{error && (
								<p style={styles.formError}>{error.errors.identifier}</p>
							)}
							{error && <p style={styles.formError}>{error.errors.email}</p>}
							{error && <p style={styles.formError}>{error.errors.phone}</p>}
							{error && <p style={styles.formError}>{error.errors.username}</p>}
						</div>
						<div className="uk-margin">
							<div className="uk-inline">
								<span
									className="uk-form-icon"
									uk-icon="icon:  lock"
									style={styles.iconForm}></span>
								<input
									required
									className="uk-input  uk-form-width-large "
									placeholder="password"
									type="password"
									value={password}
									name="password"
									onChange={(e) => onChangeHandler(e)}
								/>
							</div>
							{error && <p style={styles.formError}>{error.errors.password}</p>}
						</div>

						<div className="uk-margin">
							<button
								class="uk-button uk-button-default uk-width-1-1 uk-margin-small-bottom"
								style={styles.btnRegister}
								type="submit"
								onClick={onSubmitHandle}>
								<b>Login</b>
							</button>
						</div>
					</form>
				</Card.Body>
			</Card>
		</div>
	);
}

const styles = {
	iconForm: {
		color: "#ffa500"
	},
	btnRegister: {
		backgroundColor: "#ffa500",
		border: "none",
		color: "white"
	},
	formError: {
		fontSize: "0.7em",
		color: "red",
		marginTop: "10px"
	}
};
export default withRouter(LogInForm);