import {
  GET_CONVERSATION_DETAIL_FAILED,
  GET_CONVERSATION_DETAIL_REQUEST,
  GET_CONVERSATION_DETAIL_SUCCESS,
  GET_CONVERSATION_LIST_FAILED,
  GET_CONVERSATION_LIST_REQUEST,
  GET_CONVERSATION_LIST_SUCCESS,
  POST_SEND_MESSAGE_FAILED,
  POST_SEND_MESSAGE_REQUEST,
} from './constants';

export const getConversationListRequest = () => ({
  type: GET_CONVERSATION_LIST_REQUEST,
});

export const getConversationListSuccess = (data) => ({
  type: GET_CONVERSATION_LIST_SUCCESS,
  data,
});

export const getConversationListFailed = (error) => ({
  type: GET_CONVERSATION_LIST_FAILED,
  error,
});

export const getConversationDetailRequest = (payload) => ({
  type: GET_CONVERSATION_DETAIL_REQUEST,
  payload,
});

export const getConversationDetailSuccess = (data) => ({
  type: GET_CONVERSATION_DETAIL_SUCCESS,
  data,
});

export const getConversationDetailFailed = (error) => ({
  type: GET_CONVERSATION_DETAIL_FAILED,
  error,
});

export const postSendMessageRequest = (payload) => ({
  type: POST_SEND_MESSAGE_REQUEST,
  payload,
});

export const postSendMessageFailed = (error) => ({
  type: POST_SEND_MESSAGE_FAILED,
  error,
});
