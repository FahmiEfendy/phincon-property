import { produce } from 'immer';

import {
  GET_USER_DETAIL_FAILED,
  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
  PATCH_CHANGE_PASSWORD_FAILED,
  PATCH_CHANGE_PASSWORD_REQUEST,
  PATCH_UPDATE_USER_FAILED,
  PATCH_UPDATE_USER_REQUEST,
} from './constants';

export const initialState = {
  userDetail: {
    data: [],
    error: null,
  },
  updateUser: {
    error: null,
  },
  changePassword: {
    error: null,
  },
};

export const storedKey = ['userDetail'];

const userDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_USER_DETAIL_REQUEST:
        draft.userDetail.data = [];
        draft.userDetail.error = null;
        break;

      case GET_USER_DETAIL_SUCCESS:
        draft.userDetail.data = action.data;
        draft.userDetail.error = null;
        break;

      case GET_USER_DETAIL_FAILED:
        draft.userDetail.data = [];
        draft.userDetail.error = action.error;
        break;

      case PATCH_UPDATE_USER_REQUEST:
        draft.updateUser.error = null;
        break;

      case PATCH_UPDATE_USER_FAILED:
        draft.updateUser.error = action.error;
        break;

      case PATCH_CHANGE_PASSWORD_REQUEST:
        draft.changePassword.error = null;
        break;

      case PATCH_CHANGE_PASSWORD_FAILED:
        draft.changePassword.error = action.error;
        break;

      default:
        break;
    }
  });

export default userDetailReducer;
