import {
  ADMIN_BLOCK_USER,
  ADMIN_BLOCK_USER_SUCCESS,
  ADMIN_BLOCK_USER_FAILED,
  ADMIN_UNBLOCK_USER_SUCCESS,
  ADMIN_UNBLOCK_USER_FAILED,
  ADMIN_UNBLOCK_USER,
  ADMIN_DELETE_USER,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAILED,
} from "../types";

import axios from "axios";

const blockUserAction = (token, username) => (dispatch) => {
  dispatch({ type: ADMIN_BLOCK_USER });
  axios
    .get("https://dev.bellefu.com/api/admin/customer/block/" + username, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      dispatch({
        type: ADMIN_BLOCK_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADMIN_BLOCK_USER_FAILED,
        payload: err.message,
      });
    });
};

const unblockUserAction = (token, username) => (dispatch) => {
  dispatch({ type: ADMIN_UNBLOCK_USER });
  axios
    .get("https://dev.bellefu.com/api/admin/customer/unblock/" + username, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      dispatch({
        type: ADMIN_UNBLOCK_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADMIN_UNBLOCK_USER_FAILED,
        payload: err.message,
      });
    });
};

const deleteUserAction = (token, username) => (dispatch) => {
  dispatch({ type: ADMIN_DELETE_USER });
  axios
    .get("https://dev.bellefu.com/api/admin/customer/delete/" + username, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then((res) => {
      dispatch({
        type: ADMIN_DELETE_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADMIN_DELETE_USER_FAILED,
        payload: err.message,
      });
    });
};

export { blockUserAction, unblockUserAction, deleteUserAction };
