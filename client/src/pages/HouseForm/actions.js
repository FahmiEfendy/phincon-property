import {
  DELETE_HOUSE_IMAGE_FAILED,
  DELETE_HOUSE_IMAGE_REQUEST,
  DELETE_HOUSE_IMAGE_RESET,
  FORM_RESET,
  PATCH_UPDATE_HOUSE_FAILED,
  PATCH_UPDATE_HOUSE_REQUEST,
  PATCH_UPDATE_HOUSE_RESET,
  POST_CREATE_HOUSE_FAILED,
  POST_CREATE_HOUSE_REQUEST,
  POST_CREATE_HOUSE_RESET,
  POST_CREATE_HOUSE_SUCCESS,
  SET_FORM_DATA,
  SET_STEP,
} from './constants';

export const postCreateHouseRequest = (payload, callback) => ({
  type: POST_CREATE_HOUSE_REQUEST,
  payload,
  callback,
});

export const postCreateHouseSuccess = (data) => ({
  type: POST_CREATE_HOUSE_SUCCESS,
  data,
});

export const postCreateHouseFailed = (error) => ({
  type: POST_CREATE_HOUSE_FAILED,
  error,
});

export const postCreateHouseReset = () => ({
  type: POST_CREATE_HOUSE_RESET,
});

export const patchUpdateHouseRequest = (object, callback) => ({
  type: PATCH_UPDATE_HOUSE_REQUEST,
  object,
  callback,
});

export const patchUpdateHouseFailed = (error) => ({
  type: PATCH_UPDATE_HOUSE_FAILED,
  error,
});

export const patchUpdateHouseReset = () => ({
  type: PATCH_UPDATE_HOUSE_RESET,
});

export const deleteHouseImageRequest = (object, callback) => ({
  type: DELETE_HOUSE_IMAGE_REQUEST,
  object,
  callback,
});

export const deleteHouseImageFailed = (error) => ({
  type: DELETE_HOUSE_IMAGE_FAILED,
  error,
});

export const deleteHouseImageReset = () => ({
  type: DELETE_HOUSE_IMAGE_RESET,
});

export const setStep = (step) => ({
  type: SET_STEP,
  step,
});

export const setFormData = (formData) => ({
  type: SET_FORM_DATA,
  formData,
});

export const formReset = () => ({
  type: FORM_RESET,
});
