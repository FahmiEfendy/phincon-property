import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHouseDetailState = (state) => state.houseDetail || initialState;

export const selectHouseDetail = createSelector(selectHouseDetailState, (state) => state.houseDetail);
export const selectCreateConversation = createSelector(selectHouseDetailState, (state) => state.createConversation);
