import {
  GET_HOUSE_DETAIL_FAILED,
  GET_HOUSE_DETAIL_REQUEST,
  GET_HOUSE_DETAIL_SUCCESS,
  POST_CREATE_CONVERSATION_FAILED,
  POST_CREATE_CONVERSATION_REQUEST,
  POST_CREATE_CONVERSATION_SUCCESS,
} from './constants';

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

export const postCreateConversationRequest = (payload) => ({
  type: POST_CREATE_CONVERSATION_REQUEST,
  payload,
});

export const postCreateConversationSuccess = (data) => ({
  type: POST_CREATE_CONVERSATION_SUCCESS,
  data,
});

export const postCreateConversationFailed = (error) => ({
  type: POST_CREATE_CONVERSATION_FAILED,
  error,
});
