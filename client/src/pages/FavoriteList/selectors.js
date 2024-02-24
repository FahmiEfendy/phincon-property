import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectFavoriteListState = (state) => state.favoriteList || initialState;

export const selectFavoriteList = createSelector(selectFavoriteListState, (state) => state.favoriteList);
