import { produce } from 'immer';

import {
  DELETE_HOUSE_FAILED,
  DELETE_HOUSE_REQUEST,
  GET_HOUSE_LIST_FAILED,
  GET_HOUSE_LIST_REQUEST,
  GET_HOUSE_LIST_SUCCESS,
} from './constants';

export const initialState = {
  houseList: {
    data: [],
    error: null,
  },
  deleteHouse: {
    error: null,
  },
};

export const storedKey = ['houseList'];

const houseListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_HOUSE_LIST_REQUEST:
        draft.houseList.data = [];
        draft.houseList.error = null;
        break;

      case GET_HOUSE_LIST_SUCCESS:
        draft.houseList.data = action.data;
        draft.houseList.error = null;
        break;

      case GET_HOUSE_LIST_FAILED:
        draft.houseList.data = [];
        draft.houseList.error = action.error;
        break;

      case DELETE_HOUSE_REQUEST:
        draft.deleteHouse.error = null;
        break;

      case DELETE_HOUSE_FAILED:
        draft.deleteHouse.error = action.error;
        break;

      default:
        break;
    }
  });

export default houseListReducer;
