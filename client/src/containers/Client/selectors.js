import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectClientState = (state) => state.client || initialState;

export const selectLogin = createSelector(selectClientState, (state) => state.login);
export const selectToken = createSelector(selectClientState, (state) => state.token);
export const selectError = createSelector(selectClientState, (state) => state.error);
export const selectuserData = createSelector(selectClientState, (state) => state.userData);
