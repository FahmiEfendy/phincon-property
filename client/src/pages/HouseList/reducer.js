import { produce } from 'immer';

import {
  DELETE_FROM_FAVORITE_FAILED,
  DELETE_FROM_FAVORITE_REQUEST,
  DELETE_FROM_FAVORITE_RESET,
  DELETE_HOUSE_FAILED,
  DELETE_HOUSE_REQUEST,
  GET_HOUSE_LIST_FAILED,
  GET_HOUSE_LIST_REQUEST,
  GET_HOUSE_LIST_SUCCESS,
  POST_ADD_TO_FAVORITE_FAILED,
  POST_ADD_TO_FAVORITE_REQUEST,
  POST_ADD_TO_FAVORITE_RESET,
} from './constants';

export const initialState = {
  houseList: {
    data: [],
    error: null,
  },
  deleteHouse: {
    error: null,
  },
  addToFavorite: {
    error: null,
  },
  deleteFromFavorite: {
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

      case POST_ADD_TO_FAVORITE_REQUEST:
        draft.addToFavorite.error = null;
        break;

      case POST_ADD_TO_FAVORITE_FAILED:
        draft.addToFavorite.error = action.error;
        break;

      case POST_ADD_TO_FAVORITE_RESET:
        draft.addToFavorite.error = null;
        break;

      case DELETE_FROM_FAVORITE_REQUEST:
        draft.deleteFromFavorite.error = null;
        break;

      case DELETE_FROM_FAVORITE_FAILED:
        draft.deleteFromFavorite.error = action.error;
        break;

      case DELETE_FROM_FAVORITE_RESET:
        draft.deleteFromFavorite.error = null;
        break;

      default:
        break;
    }
  });

export default houseListReducer;
