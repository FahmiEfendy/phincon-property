import {
  GET_USER_DETAIL_FAILED,
  GET_USER_DETAIL_REQUEST,
  GET_USER_DETAIL_SUCCESS,
  PATCH_CHANGE_PASSWORD_FAILED,
  PATCH_CHANGE_PASSWORD_REQUEST,
  PATCH_CHANGE_PASSWORD_RESET,
  PATCH_UPDATE_USER_FAILED,
  PATCH_UPDATE_USER_REQUEST,
  PATCH_UPDATE_USER_RESET,
} from './constants';

export const getUserDetailRequest = (id) => ({
  type: GET_USER_DETAIL_REQUEST,
  id,
});

export const getUserDetailSuccess = (data) => ({
  type: GET_USER_DETAIL_SUCCESS,
  data,
});

export const getUserDetailFailed = (error) => ({
  type: GET_USER_DETAIL_FAILED,
  error,
});

export const patchUpdateUserRequest = (object, callback) => ({
  type: PATCH_UPDATE_USER_REQUEST,
  object,
  callback,
});

export const patchUpdateUserFailed = (error) => ({
  type: PATCH_UPDATE_USER_FAILED,
  error,
});

export const patchUpdateUserReset = () => ({
  type: PATCH_UPDATE_USER_RESET,
});

export const patchChangePasswordRequest = (object, callback) => ({
  type: PATCH_CHANGE_PASSWORD_REQUEST,
  object,
  callback,
});

export const patchChangePasswordFailed = (error) => ({
  type: PATCH_CHANGE_PASSWORD_FAILED,
  error,
});

export const patchChangePasswordReset = () => ({
  type: PATCH_CHANGE_PASSWORD_RESET,
});
