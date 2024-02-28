import { produce } from 'immer';
import {
  GET_APPOINTMENT_LIST_FAILED,
  GET_APPOINTMENT_LIST_REQUEST,
  GET_APPOINTMENT_LIST_SUCCESS,
  PATCH_UPDATE_APPOINTMENT_FAILED,
  PATCH_UPDATE_APPOINTMENT_REQUEST,
} from './constants';

export const initialState = {
  appointmentList: {
    data: [],
    error: null,
  },
  updateAppointment: {
    error: null,
  },
};

export const storedKey = ['appointmentList'];

const appointmentListReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_APPOINTMENT_LIST_REQUEST:
        draft.appointmentList.data = [];
        draft.appointmentList.error = null;
        break;

      case GET_APPOINTMENT_LIST_SUCCESS:
        draft.appointmentList.data = action.data;
        draft.appointmentList.error = null;
        break;

      case GET_APPOINTMENT_LIST_FAILED:
        draft.appointmentList.data = [];
        draft.appointmentList.error = action.error;
        break;

      case PATCH_UPDATE_APPOINTMENT_REQUEST:
        draft.updateAppointment.error = null;
        break;

      case PATCH_UPDATE_APPOINTMENT_FAILED:
        draft.updateAppointment.error = action.error;
        break;

      default:
        break;
    }
  });

export default appointmentListReducer;
