import {
  POST_LOGIN_FAILED,
  POST_LOGIN_REQUEST,
  RESET_LOGIN,
  SET_LOGIN,
  SET_TOKEN,
  SET_USER_DATA,
} from '@containers/Client/constants';

export const postLoginRequest = (payload, callback) => ({
  type: POST_LOGIN_REQUEST,
  payload,
  callback,
});

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUserData = (userData) => ({
  type: SET_USER_DATA,
  userData,
});

export const postLoginFailed = (error) => ({
  type: POST_LOGIN_FAILED,
  error,
});

export const resetLogin = () => ({
  type: RESET_LOGIN,
});
