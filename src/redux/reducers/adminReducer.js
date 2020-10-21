import {
	ADMIN_SIGNIN_REQUEST,
	ADMIN_SIGNIN_SUCCESS,
	ADMIN_SIGNIN_FAIL,
	ADMIN_SIGNUP_REQUEST,
	ADMIN_SIGNUP_SUCCESS,
	ADMIN_SIGNUP_FAIL,
	ADMIN_UPDATE_REQUEST,
	ADMIN_UPDATE_SUCCESS,
	ADMIN_UPDATE_FAIL,
} from "../types";



//REDUCER FOR USER SINGNIN
export const adminSigninReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_SIGNIN_REQUEST:
			return {
				loading: true
			};
		case ADMIN_SIGNIN_SUCCESS:
			return {
				loading: false,
				user: action.payload
			};
		case ADMIN_SIGNIN_FAIL:
			return {
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};





//REDUCER FOR USER UPDATE
export const adminUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case ADMIN_SIGNUP_REQUEST:
			return {
				loading: true
			};
		case ADMIN_SIGNUP_SUCCESS:
			return {
				loading: false,
				user: action.payload
			};
		case ADMIN_SIGNUP_FAIL:
			return {
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};


