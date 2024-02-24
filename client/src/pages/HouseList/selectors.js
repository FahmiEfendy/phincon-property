import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHouseListState = (state) => state.houseList || initialState;

export const selectHouseList = createSelector(selectHouseListState, (state) => state.houseList);
export const selectDeleteHouse = createSelector(selectHouseListState, (state) => state.deleteHouse);
export const selectAddToFavorite = createSelector(selectHouseListState, (state) => state.addToFavorite);
export const selectDeleteFromFavorite = createSelector(selectHouseListState, (state) => state.deleteFromFavorite);
