import { produce } from 'immer';

import {
  DELETE_HOUSE_IMAGE_FAILED,
  DELETE_HOUSE_IMAGE_REQUEST,
  PATCH_UPDATE_HOUSE_FAILED,
  PATCH_UPDATE_HOUSE_REQUEST,
  POST_CREATE_HOUSE_FAILED,
  POST_CREATE_HOUSE_REQUEST,
  SET_FORM_DATA,
  SET_STEP,
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
  form: {
    step: 1,
    formData: {
      info: {
        title: '',
        description: '',
        price: 0,
        bedrooms: 0,
        bathrooms: 0,
      },
      location: {
        address: '',
        city: '',
        state: '',
        zipCode: 0,
      },
      images: [],
    },
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

      case SET_STEP:
        draft.form.step = action.step;
        break;

      case SET_FORM_DATA:
        draft.form.formData = action.formData;
        break;

      default:
        break;
    }
  });

export default houseFormReducer;
