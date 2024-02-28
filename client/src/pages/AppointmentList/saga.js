import { call, put, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { getAppointmentList, patchUpdateAppointment } from '@domain/api';
import { GET_APPOINTMENT_LIST_REQUEST, PATCH_UPDATE_APPOINTMENT_REQUEST } from './constants';
import { getAppointmentListFailed, getAppointmentListSuccess, patchUpdateAppointmentFailed } from './actions';

function* doGetAppointmentList() {
  yield put(setLoading(true));

  try {
    const response = yield call(getAppointmentList);

    yield put(getAppointmentListSuccess(response.data));
  } catch (err) {
    yield put(getAppointmentListFailed(err.response.data));
  }

  yield put(setLoading(false));
}

function* doPatchUpdateAppointment(action) {
  yield put(setLoading(true));

  try {
    yield call(patchUpdateAppointment, action.object);

    action.callback && action.callback();
  } catch (err) {
    yield put(patchUpdateAppointmentFailed(err.response.data));
  }

  yield put(setLoading(false));
}

export default function* appointmentListSaga() {
  yield takeLatest(GET_APPOINTMENT_LIST_REQUEST, doGetAppointmentList);
  yield takeLatest(PATCH_UPDATE_APPOINTMENT_REQUEST, doPatchUpdateAppointment);
}
