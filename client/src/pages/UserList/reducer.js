import { produce } from 'immer';

import {
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  GET_USER_LIST_FAILED,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
} from './constants';

export const initialState = {
  userList: {
    data: [],
    error: null,
  },
  deleteUser: {
    error: null,
  },
};

export const storedKey = ['userList'];

const userListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_USER_LIST_REQUEST:
        draft.userList.data = [];
        draft.error = null;
        break;

      case GET_USER_LIST_SUCCESS:
        draft.userList.data = action.data;
        draft.error = null;
        break;

      case GET_USER_LIST_FAILED:
        draft.userList.data = [];
        draft.error = action.error;
        break;

      case DELETE_USER_REQUEST:
        draft.deleteUser.error = null;
        break;

      case DELETE_USER_FAILED:
        draft.deleteUser.error = action.error;
        break;

      case DELETE_USER_RESET:
        draft.deleteUser.error = null;
        break;

      default:
        break;
    }
  });

export default userListReducer;
