import { produce } from 'immer';

import { GET_FAVORITE_LIST_FAILED, GET_FAVORITE_LIST_REQUEST, GET_FAVORITE_LIST_SUCCESS } from './constants';

export const initialState = {
  favoriteList: { data: [], error: null },
};

export const storedKey = ['favoriteList'];

const favoriteListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_FAVORITE_LIST_REQUEST:
        draft.favoriteList.data = [];
        draft.favoriteList.error = null;
        break;

      case GET_FAVORITE_LIST_SUCCESS:
        draft.favoriteList.data = action.data;
        draft.favoriteList.error = null;
        break;

      case GET_FAVORITE_LIST_FAILED:
        draft.favoriteList.data = [];
        draft.favoriteList.error = action.error;
        break;

      default:
        break;
    }
  });

export default favoriteListReducer;
