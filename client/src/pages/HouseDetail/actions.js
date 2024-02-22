import { GET_HOUSE_DETAIL_FAILED, GET_HOUSE_DETAIL_REQUEST, GET_HOUSE_DETAIL_SUCCESS } from './constants';

export const getHouseDetailRequest = (id) => ({
  type: GET_HOUSE_DETAIL_REQUEST,
  id,
});

export const getHouseDetailSuccess = (data) => ({
  type: GET_HOUSE_DETAIL_SUCCESS,
  data,
});

export const getHouseDetailFailed = (error) => ({
  type: GET_HOUSE_DETAIL_FAILED,
  error,
});
