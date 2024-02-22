import { produce } from 'immer';

import {
  DELETE_HOUSE_IMAGE_FAILED,
  DELETE_HOUSE_IMAGE_REQUEST,
  PATCH_UPDATE_HOUSE_FAILED,
  PATCH_UPDATE_HOUSE_REQUEST,
  POST_CREATE_HOUSE_FAILED,
  POST_CREATE_HOUSE_REQUEST,
} from './constants';

export const initialState = {
  createHouse: {
    error: null,
  },
  updateHouse: {
    error: null,
  },
  deleteHouseImage: {
    error: null,
  },
};

export const storedKey = ['houseForm'];

const houseFormReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_CREATE_HOUSE_REQUEST:
        draft.createHouse.error = null;
        break;

      case POST_CREATE_HOUSE_FAILED:
        draft.createHouse.error = action.error;
        break;

      case PATCH_UPDATE_HOUSE_REQUEST:
        draft.updateHouse.error = null;
        break;

      case PATCH_UPDATE_HOUSE_FAILED:
        draft.updateHouse.error = action.error;
        break;

      case DELETE_HOUSE_IMAGE_REQUEST:
        draft.deleteHouseImage.error = null;
        break;

      case DELETE_HOUSE_IMAGE_FAILED:
        draft.deleteHouseImage.error = action.error;
        break;

      default:
        break;
    }
  });

export default houseFormReducer;
