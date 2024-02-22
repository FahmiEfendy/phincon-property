import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHouseFormState = (state) => state.houseForm || initialState;

export const selectCreateHouse = createSelector(selectHouseFormState, (state) => state.createHouse);
export const selectUpdateHouse = createSelector(selectHouseFormState, (state) => state.updateHouse);
export const selectDeleteHouseImage = createSelector(selectHouseFormState, (state) => state.deleteHouseImage);
