import {
  DELETE_HOUSE_IMAGE_FAILED,
  DELETE_HOUSE_IMAGE_REQUEST,
  PATCH_UPDATE_HOUSE_FAILED,
  PATCH_UPDATE_HOUSE_REQUEST,
  POST_CREATE_HOUSE_FAILED,
  POST_CREATE_HOUSE_REQUEST,
} from './constants';

export const postCreateHouseRequest = (payload, callback) => ({
  type: POST_CREATE_HOUSE_REQUEST,
  payload,
  callback,
});

export const postCreateHouseFailed = (error) => ({
  type: POST_CREATE_HOUSE_FAILED,
  error,
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

export const deleteHouseImageRequest = (object, callback) => ({
  type: DELETE_HOUSE_IMAGE_REQUEST,
  object,
  callback,
});

export const deleteHouseImageFailed = (error) => ({
  type: DELETE_HOUSE_IMAGE_FAILED,
  error,
});
