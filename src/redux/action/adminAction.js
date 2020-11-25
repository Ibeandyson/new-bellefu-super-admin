import {
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNIN_FAIL,
  // ADMIN_SIGNUP_REQUEST,
  // ADMIN_SIGNUP_SUCCESS,
  // ADMIN_SIGNUP_FAIL,
  // ADMIN_UPDATE_REQUEST,
  // ADMIN_UPDATE_SUCCESS,
  // ADMIN_UPDATE_FAIL,
  // ADMIN_BLOCK_USER,
  // ADMIN_BLOCK_USER_SUCCESS,
  // ADMIN_BLOCK_USER_FAILED,
  // ADMIN_UNBLOCK_USER_SUCCESS,
  // ADMIN_UNBLOCK_USER_FAILED,
  // ADMIN_UNBLOCK_USER,
  // ADMIN_DELETE_USER,
  // ADMIN_DELETE_USER_SUCCESS,
  // ADMIN_DELETE_USER_FAILED,
} from "../types";

import axios from "axios";
import Cookie from "js-cookie";

//USER SIGNIN ACTION PAYLOAD
export const signin = (identifier, password) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNIN_REQUEST, payload: { identifier, password } });
  try {
    const { data } = await axios.post("https://bellefu.com/api/auth/login/challenge/default", {
      identifier,
      password,
    });
    const token = data.token;
    const role = data.user.role;

    if (token) {
      dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
      Cookie.set("admin", JSON.stringify(token));
      Cookie.set("role", JSON.stringify(role));
    }
    dispatch({ type: ADMIN_SIGNIN_FAIL, payload: data.errors });
  } catch (error) {
    dispatch({ type: ADMIN_SIGNIN_FAIL, payload: error.response.data });
  }
};

// UPDATE USER ACTION PAYLOAD
// export const update = ({ userId, name, email, password }) => async (
// 	dispatch,
// 	getState
// ) => {
// 	const {
// 		userSignin: { user }
// 	} = getState();
// 	dispatch({
// 		type: USER_UPDATE_REQUEST,
// 		payload: { userId, name, email, password }
// 	});
// 	try {
// 		const { data } = await axios.put(
// 			`/api/users/${userId}`,
// 			{ name, email, password },
// 			{
// 				headers: {
// 					Authorization: "Bearer " + user.token
// 				}
// 			}
// 		);
// 		dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
// 		Cookie.set("admin", JSON.stringify(data));
// 	} catch (error) {
// 		dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
// 	}
// };
