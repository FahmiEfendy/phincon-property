import {
  DELETE_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  GET_USER_LIST_FAILED,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_SUCCESS,
} from './constants';

export const getUserListRequest = () => ({
  type: GET_USER_LIST_REQUEST,
});

export const getUserListSuccess = (data) => ({
  type: GET_USER_LIST_SUCCESS,
  data,
});

export const getUserListFailed = (error) => ({
  type: GET_USER_LIST_FAILED,
  error,
});

export const deleteUserRequest = (id, callback) => ({
  type: DELETE_USER_REQUEST,
  id,
  callback,
});

export const deleteUserFailed = (error) => ({
  type: DELETE_USER_FAILED,
  error,
});

export const deleteUserReset = () => ({
  type: DELETE_USER_RESET,
});
