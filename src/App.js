import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SuperAdminDashbordPage from "./components/app/SuperAdminDashbordPage";
import AdminProfilePage from "./components/app/AdminProfilePage";
import PendingAdPage from "./components/app/PendingAdPage";
import ExpiredAdPage from "./components/app/ExpiredAdPage";
import ActiveAdPage from "./components/app/ActiveAdPage";
import MainCategoryPage from "./components/app/MainCategoryPage";
import SubCategoryPage from "./components/app/SubCategoryPage";
import UsersListPage from "./components/app/UsersListPage";
import MessageChatPage from "./components/app/MessageChatPage";
import LogInFormPage from "./components/app/LogInFormPage";

import PrivateRoute from "./PrivateRoute";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";

//REDUX STATE
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePageSlider from "./components/app/HomePageSlider";
import Country from "./components/app/Country";
import MainCategoryList from "./components/app/MainCategoryList";
import Transactions from "./components/app/Transaction";
import SubCategoryList from "./components/app/SubCategoryList";
import ProductUpload from "./components/app/ProductUpload";
import Review from "./components/app/Review";
import Report from "./components/app/Reports";
import AddVoucher from "./components/app/AddVoucher";
import Voucher from "./components/app/VoucherList";
import IdVerification from "./components/app/IdVerification";
import KYCVerification from "./components/app/KycVerification";
import AdViewPage from "./components/app/AdView";
import ProductRoute from "./Routes/ProductRoute";
import FianacialRoute from "./Routes/FinancialRoute";
import SupportRoute from "./Routes/SupportRoute";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Route exact path="/" component={LogInFormPage} />
          <PrivateRoute exact path="/admin_dashboard" component={SuperAdminDashbordPage} />
          <PrivateRoute exact path="/admin_profile" component={AdminProfilePage} />
          <ProductRoute exact path="/ads" component={AdViewPage} />
          <ProductRoute exact path="/pending_ads" component={PendingAdPage} />
          <ProductRoute exact path="/active_ads" component={ActiveAdPage} />
          <ProductRoute exact path="/expired_ads" component={ExpiredAdPage} />
          <ProductRoute exact path="/main_category" component={MainCategoryPage} />
          <ProductRoute exact path="/sub_category" component={SubCategoryPage} />
          <PrivateRoute exact path="/user_list" component={UsersListPage} />
          <PrivateRoute exact path="/chat" component={MessageChatPage} />
          <PrivateRoute exact path="/home-page-slider" component={HomePageSlider} />
          <PrivateRoute exact path="/country" component={Country} />
          <ProductRoute exact path="/category-list" component={MainCategoryList} />
          <ProductRoute exact path="/subcategory-list" component={SubCategoryList} />
          <FianacialRoute exact path="/product-upload" component={ProductUpload} />
          <SupportRoute exact path="/reviews" component={Review} />
          <SupportRoute exact path="/reports" component={Report} />
          <FianacialRoute exact path="/transactions" component={Transactions} />
          <PrivateRoute exact path="/vouchers/add" component={AddVoucher} />
          <PrivateRoute exact path="/vouchers" component={Voucher} />
          <SupportRoute exact path="/verification/id" component={IdVerification} />
          <SupportRoute exact path="/verification/kyc" component={KYCVerification} />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
