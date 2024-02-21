import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRegisterState = (state) => state.register || initialState;

export const selectRegister = createSelector(selectRegisterState, (state) => state.register);
