import { produce } from 'immer';
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

export const initialState = {
  conversationList: {
    data: [],
    error: null,
  },
  conversationDetail: {
    data: [],
    error: null,
  },
  sendMessage: {
    error: null,
  },
};

export const storedKey = ['conversationList'];

const conversationListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_CONVERSATION_LIST_REQUEST:
        draft.conversationList.data = [];
        draft.conversationList.error = null;
        break;

      case GET_CONVERSATION_LIST_SUCCESS:
        draft.conversationList.data = action.data;
        draft.conversationList.error = null;
        break;

      case GET_CONVERSATION_LIST_FAILED:
        draft.conversationList.data = [];
        draft.conversationList.error = action.error;
        break;

      case GET_CONVERSATION_DETAIL_REQUEST:
        draft.conversationDetail.data = [];
        draft.conversationDetail.error = null;
        break;

      case GET_CONVERSATION_DETAIL_SUCCESS:
        draft.conversationDetail.data = action.data;
        draft.conversationDetail.error = null;
        break;

      case GET_CONVERSATION_DETAIL_FAILED:
        draft.conversationDetail.data = [];
        draft.conversationDetail.error = action.error;
        break;

      case POST_SEND_MESSAGE_REQUEST:
        draft.sendMessage.error = null;
        break;

      case POST_SEND_MESSAGE_FAILED:
        draft.sendMessage.error = action.error;
        break;

      default:
        break;
    }
  });

export default conversationListReducer;
