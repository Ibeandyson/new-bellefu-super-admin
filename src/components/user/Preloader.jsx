import React,{ useState } from "react";
import { Modal, Spinner } from "react-bootstrap"

export default function Preloader() {
    const [preloaderShow] = useState(true);
	return (
		<div>
			<MyVerticallyCenteredModal
				show={preloaderShow}	
			/>
		</div>
	);
}

function MyVerticallyCenteredModal(props) {
	return (
		<Modal
        className="preLoader preLoaderContent bg-none border-0"
			{...props}
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			centered>
			<Spinner animation="grow" variant="warning" />
		</Modal>
	);
}