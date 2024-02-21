import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectUserListState = (state) => state.userList || initialState;

export const selectUserList = createSelector(selectUserListState, (state) => state.userList);
export const selectDeleteUser = createSelector(selectUserListState, (state) => state.deleteUser);
