import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SuperAdminDashbordPage from "./compnents/app/SuperAdminDashbordPage";
import UserProfilePage from "./compnents/app/UserProfilePage"
import UserAdPage from "./compnents/app/UserAdPage"
import UserFavouriteAdPage from "./compnents/app/UserFavouriteAdPage";
import 	UserPendingAdPage from "./compnents/app/UserPendingAdPage";
import UserExpriedAdPage from "./compnents/app/UserExpriedAdPage"



function App() {
	return (
		<div className="App">

		
			<SuperAdminDashbordPage />
			
			{/* <UserProfilePage/> */}
			{/* <UserAdPage/> */}
			{/* <UserFavouriteAdPage/> */}
			{/* <UserPendingAdPage/> */}
			{/* <UserExpriedAdPage /> */}
		

		</div>
	);
}

export default App;
