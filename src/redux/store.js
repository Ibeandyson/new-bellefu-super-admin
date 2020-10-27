import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import {
  adminSigninReducer,
  adminUpdateReducer,
} from "./reducers/adminReducer";
import {
  blockUserReducer,
  deleteUserReducer,
  unblockUserReducer,
} from "./reducers/userActions";

const token = Cookie.getJSON("admin") || null;

// const user = signin

export const initialState = {
  adminSignin: { token },
};

const reducers = combineReducers({
  //USER STORE
  adminSignin: adminSigninReducer,
  adminUpdate: adminUpdateReducer,
  blockUser: blockUserReducer,
  unblockUser: unblockUserReducer,
  deleteUser: deleteUserReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
