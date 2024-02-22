import { produce } from 'immer';

import { GET_HOUSE_DETAIL_FAILED, GET_HOUSE_DETAIL_REQUEST, GET_HOUSE_DETAIL_SUCCESS } from './constants';

export const initialState = {
  houseDetail: {
    data: [],
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

      default:
        break;
    }
  });

export default houseDetailReducer;
