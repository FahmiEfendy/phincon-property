import { produce } from 'immer';

import {
  GET_HOUSE_DETAIL_FAILED,
  GET_HOUSE_DETAIL_REQUEST,
  GET_HOUSE_DETAIL_SUCCESS,
  POST_CREATE_APPOINTMENT_FAILED,
  POST_CREATE_APPOINTMENT_REQUEST,
  POST_CREATE_CONVERSATION_FAILED,
  POST_CREATE_CONVERSATION_REQUEST,
  POST_CREATE_CONVERSATION_RESET,
  POST_CREATE_CONVERSATION_SUCCESS,
} from './constants';

export const initialState = {
  houseDetail: {
    data: [],
    error: null,
  },
  createConversation: {
    data: [],
    error: null,
  },
  createAppointment: {
    error: null,
  },
};

export const storedKey = ['houseDetail'];

const houseDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_HOUSE_DETAIL_REQUEST:
        draft.houseDetail.data = [];
        draft.houseDetail.error = null;
        break;

      case GET_HOUSE_DETAIL_SUCCESS:
        draft.houseDetail.data = action.data;
        draft.houseDetail.error = null;
        break;

      case GET_HOUSE_DETAIL_FAILED:
        draft.houseDetail.data = [];
        draft.houseDetail.error = action.error;
        break;

      case POST_CREATE_CONVERSATION_REQUEST:
        draft.createConversation.data = [];
        draft.createConversation.error = null;
        break;

      case POST_CREATE_CONVERSATION_SUCCESS:
        draft.createConversation.data = action.data;
        draft.createConversation.error = null;
        break;

      case POST_CREATE_CONVERSATION_FAILED:
        draft.createConversation.data = [];
        draft.createConversation.error = action.error;
        break;

      case POST_CREATE_CONVERSATION_RESET:
        draft.createConversation.data = [];
        draft.createConversation.error = null;
        break;

      case POST_CREATE_APPOINTMENT_REQUEST:
        draft.createAppointment.error = action.error;
        break;

      case POST_CREATE_APPOINTMENT_FAILED:
        draft.createAppointment.error = action.error;
        break;

      default:
        break;
    }
  });

export default houseDetailReducer;
