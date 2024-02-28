import { call, put, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { getHouseDetail, postCreateAppointment, postCreateConversation } from '@domain/api';
import {
  GET_HOUSE_DETAIL_REQUEST,
  POST_CREATE_APPOINTMENT_REQUEST,
  POST_CREATE_CONVERSATION_REQUEST,
} from './constants';
import {
  getHouseDetailFailed,
  getHouseDetailSuccess,
  postCreateAppointmentFailed,
  postCreateConversationFailed,
  postCreateConversationSuccess,
} from './actions';

function* doGetHouseDetail(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getHouseDetail, action.id);

    yield put(getHouseDetailSuccess(response.data));
  } catch (err) {
    yield put(getHouseDetailFailed(err.response.data));
  }

  yield put(setLoading(false));
}

function* doPostCreateConversation(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(postCreateConversation, action.payload);

    yield put(postCreateConversationSuccess(response.data));
  } catch (err) {
    yield put(postCreateConversationFailed(err.response.data));
  }

  yield put(setLoading(false));
}

function* doPostCreateAppointment(action) {
  yield put(setLoading(true));

  try {
    yield call(postCreateAppointment, action.payload);
    action.callback && action.callback();
  } catch (err) {
    yield put(postCreateAppointmentFailed(err.response.data));
  }

  yield put(setLoading(false));
}

export default function* houseDetailSaga() {
  yield takeLatest(GET_HOUSE_DETAIL_REQUEST, doGetHouseDetail);
  yield takeLatest(POST_CREATE_CONVERSATION_REQUEST, doPostCreateConversation);
  yield takeLatest(POST_CREATE_APPOINTMENT_REQUEST, doPostCreateAppointment);
}
