import { produce } from 'immer';

import {
  POST_LOGIN_FAILED,
  POST_LOGIN_REQUEST,
  RESET_LOGIN,
  SET_LOGIN,
  SET_TOKEN,
  SET_USER_DATA,
} from '@containers/Client/constants';

export const initialState = {
  login: false,
  token: null,
  error: null,
  userData: {},
};

export const storedKey = ['token', 'login', 'error', 'userData'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_LOGIN_REQUEST:
        draft.token = null;
        draft.login = false;
        draft.error = null;
        draft.userData = {};
        break;

      case SET_LOGIN:
        draft.login = action.login;
        break;

      case SET_TOKEN:
        draft.token = action.token;
        break;

      case SET_USER_DATA:
        draft.userData = action.userData;
        break;

      case POST_LOGIN_FAILED:
        draft.token = null;
        draft.login = false;
        draft.error = action.error;
        draft.userData = {};
        break;

      case RESET_LOGIN:
        draft.login = false;
        draft.token = null;
        draft.error = null;
        draft.userData = {};
        break;

      default:
        break;
    }
  });

export default clientReducer;
