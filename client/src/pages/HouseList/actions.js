import {
  DELETE_HOUSE_FAILED,
  DELETE_HOUSE_REQUEST,
  GET_HOUSE_LIST_FAILED,
  GET_HOUSE_LIST_REQUEST,
  GET_HOUSE_LIST_SUCCESS,
} from './constants';

export const getHouseListRequest = () => ({
  type: GET_HOUSE_LIST_REQUEST,
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
