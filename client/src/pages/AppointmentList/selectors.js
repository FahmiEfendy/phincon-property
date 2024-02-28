import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectAppointmentListState = (state) => state.appointmentList || initialState;

export const selectAppointmentList = createSelector(selectAppointmentListState, (state) => state.appointmentList);
export const selectUpdateAppointment = createSelector(selectAppointmentListState, (state) => state.updateAppointment);
