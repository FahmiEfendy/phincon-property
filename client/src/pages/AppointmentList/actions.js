import {
  GET_APPOINTMENT_LIST_FAILED,
  GET_APPOINTMENT_LIST_REQUEST,
  GET_APPOINTMENT_LIST_SUCCESS,
  PATCH_UPDATE_APPOINTMENT_FAILED,
  PATCH_UPDATE_APPOINTMENT_REQUEST,
  PATCH_UPDATE_APPOINTMENT_RESET,
} from './constants';

export const getAppointmentListRequest = () => ({
  type: GET_APPOINTMENT_LIST_REQUEST,
});

export const getAppointmentListSuccess = (data) => ({
  type: GET_APPOINTMENT_LIST_SUCCESS,
  data,
});

export const getAppointmentListFailed = (error) => ({
  type: GET_APPOINTMENT_LIST_FAILED,
  error,
});

export const patchUpdateAppointmentRequest = (object, callback) => ({
  type: PATCH_UPDATE_APPOINTMENT_REQUEST,
  object,
  callback,
});

export const patchUpdateAppointmentFailed = (error) => ({
  type: PATCH_UPDATE_APPOINTMENT_FAILED,
  error,
});

export const patchUpdateAppointmentReset = () => ({
  type: PATCH_UPDATE_APPOINTMENT_RESET,
});
