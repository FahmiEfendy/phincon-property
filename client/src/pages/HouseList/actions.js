import {
  DELETE_FROM_FAVORITE_FAILED,
  DELETE_FROM_FAVORITE_REQUEST,
  DELETE_FROM_FAVORITE_RESET,
  DELETE_HOUSE_FAILED,
  DELETE_HOUSE_REQUEST,
  DELETE_HOUSE_RESET,
  GET_HOUSE_LIST_FAILED,
  GET_HOUSE_LIST_REQUEST,
  GET_HOUSE_LIST_SUCCESS,
  POST_ADD_TO_FAVORITE_FAILED,
  POST_ADD_TO_FAVORITE_REQUEST,
  POST_ADD_TO_FAVORITE_RESET,
} from './constants';

export const getHouseListRequest = (id) => ({
  type: GET_HOUSE_LIST_REQUEST,
  id,
});

export const getHouseListSuccess = (data) => ({
  type: GET_HOUSE_LIST_SUCCESS,
  data,
});

export const getHouseListFailed = (error) => ({
  type: GET_HOUSE_LIST_FAILED,
  error,
});

export const deleteHouseRequest = (id, callback) => ({
  type: DELETE_HOUSE_REQUEST,
  id,
  callback,
});

export const deleteHouseFailed = (error) => ({
  type: DELETE_HOUSE_FAILED,
  error,
});

export const deleteHouseReset = () => ({
  type: DELETE_HOUSE_RESET,
});

export const postAddToFavoriteRequest = (id, callback) => ({
  type: POST_ADD_TO_FAVORITE_REQUEST,
  id,
  callback,
});

export const postAddToFavoriteFailed = (error) => ({
  type: POST_ADD_TO_FAVORITE_FAILED,
  error,
});

export const postAddToFavoriteReset = () => ({
  type: POST_ADD_TO_FAVORITE_RESET,
});

export const deleteFromFavoriteRequest = (id, callback) => ({
  type: DELETE_FROM_FAVORITE_REQUEST,
  id,
  callback,
});

export const deleteFromFavoriteFailed = (error) => ({
  type: DELETE_FROM_FAVORITE_FAILED,
  error,
});

export const deleteFromFavoriteReset = () => ({
  type: DELETE_FROM_FAVORITE_RESET,
});
