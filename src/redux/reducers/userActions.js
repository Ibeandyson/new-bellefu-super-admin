const {
  ADMIN_BLOCK_USER,
  ADMIN_BLOCK_USER_SUCCESS,
  ADMIN_UNBLOCK_USER,
  ADMIN_UNBLOCK_USER_SUCCESS,
  ADMIN_UNBLOCK_USER_FAILED,
  ADMIN_BLOCK_USER_FAILED,
  ADMIN_DELETE_USER,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAILED,
} = require("../types");

export const blockUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_BLOCK_USER:
      return {
        loading: true,
      };

    case ADMIN_BLOCK_USER_SUCCESS:
      return {
        loading: false,
        response: action.payload,
      };

    case ADMIN_BLOCK_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const unblockUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UNBLOCK_USER:
      return {
        loading: true,
      };

    case ADMIN_UNBLOCK_USER_SUCCESS:
      return {
        loading: false,
        response: action.payload,
      };

    case ADMIN_UNBLOCK_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_USER:
      return {
        loading: true,
      };

    case ADMIN_DELETE_USER_SUCCESS:
      return {
        loading: false,
        response: action.payload,
      };

    case ADMIN_DELETE_USER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
