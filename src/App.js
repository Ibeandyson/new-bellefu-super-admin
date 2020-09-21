import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SuperAdminDashbordPage from "./compnents/app/SuperAdminDashbordPage";
import AdimProfilePage from "./compnents/app/AdminrProfilePage"
import 	PendingAdPage from "./compnents/app/PendingAdPage";
import ExpiredAdPage from "./compnents/app/ExpiredAdPage"
import ActiveAdPage from "./compnents/app/ActiveAdPage"
import MenbershipPlanPage  from "./compnents/app/MenbershipPlanPage"
import PlanMenbersPage from "./compnents/app/PlanMenbersPage"
import MainCategoryPage from "./compnents/app/MainCategoryPage"
import SubCategoryPage from "./compnents/app/SubCategoryPage"
import UsersListPage  from  './compnents/app/UsersListPage'




function App() {
	return (
		<div className="App">
			{/* <SuperAdminDashbordPage /> */}
			{/* <AdminProfilePage/> */}
			{/* <PendingAdPage/> */}
			{/* <ActiveAdPage/> */}
			{/* <ExpiredAdPage /> */}
			{/* <MenbershipPlanPage /> */}
			{/* <PlanMenbersPage/> */}
			{/* <MainCategoryPage/> */}
			{/* <SubCategoryPage /> */}
			<UsersListPage/>
		</div>
	);
}

export default App;
