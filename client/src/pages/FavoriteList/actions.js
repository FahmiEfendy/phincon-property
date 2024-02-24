import { GET_FAVORITE_LIST_FAILED, GET_FAVORITE_LIST_REQUEST, GET_FAVORITE_LIST_SUCCESS } from './constants';

export const getFavoriteListRequest = () => ({
  type: GET_FAVORITE_LIST_REQUEST,
});

export const getFavoriteListSuccess = (data) => ({
  type: GET_FAVORITE_LIST_SUCCESS,
  data,
});

export const getFavoriteListFailed = (error) => ({
  type: GET_FAVORITE_LIST_FAILED,
  error,
});
