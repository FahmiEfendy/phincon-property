import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectUserDetailState = (state) => state.userDetail || initialState;

export const selectUserDetail = createSelector(selectUserDetailState, (state) => state.userDetail);
export const selectUpdateUser = createSelector(selectUserDetailState, (state) => state.updateUser);
export const selectChangePassword = createSelector(selectUserDetailState, (state) => state.changePassword);
