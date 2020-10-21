import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SuperAdminDashbordPage from "./components/app/SuperAdminDashbordPage";
import AdminProfilePage from "./components/app/AdminProfilePage"
import 	PendingAdPage from "./components/app/PendingAdPage";
import ExpiredAdPage from "./components/app/ExpiredAdPage"
import ActiveAdPage from "./components/app/ActiveAdPage"
import MainCategoryPage from "./components/app/MainCategoryPage"
import SubCategoryPage from "./components/app/SubCategoryPage"
import UsersListPage  from  './components/app/UsersListPage'
import MessageChatPage from "./components/app/MessageChatPage"
import LogInFormPage from "./components/app/LogInFormPage"

import PrivateRoute from "./PrivateRoute"
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useParams
} from "react-router-dom";


//REDUX STATE
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
	return (
			<Provider store={store}>
			
		<div className="App">
		<Router>
			<Route exact path="/"  component={LogInFormPage} />
			<PrivateRoute exact path="/admin_dashboard"  component={SuperAdminDashbordPage} />
			<PrivateRoute  exact path='/admin_profile' component={AdminProfilePage}/>
			<PrivateRoute exact path='/pending_ads' component={PendingAdPage}/>
			<PrivateRoute exact path="/active_ads"  component={ActiveAdPage}/>
			<PrivateRoute  exact path="/expired_ads" component={ExpiredAdPage} />
			<PrivateRoute exact path="/main_category"  component={MainCategoryPage}/>
			<PrivateRoute exact path="/sub_category"  component={SubCategoryPage} />
			<PrivateRoute exact path="/user_list"  component={UsersListPage}/>
			<PrivateRoute exact path="/chat"  component={MessageChatPage}/>
		</Router>
		</div>
		</Provider>
	);
}

export default App;
