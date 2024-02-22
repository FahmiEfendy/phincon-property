import { put, call, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { deleteHouse, getHouseList } from '@domain/api';
import { DELETE_HOUSE_REQUEST, GET_HOUSE_LIST_REQUEST } from './constants';
import { getHouseListSuccess, getHouseListFailed, deleteHouseFailed } from './actions';

function* doGetHouseList() {
  yield put(setLoading(true));

  try {
    const response = yield call(getHouseList);
    yield put(getHouseListSuccess(response.data));
  } catch (err) {
    yield put(getHouseListFailed(err.message));
  }

  yield put(setLoading(false));
}

function* doDeleteHouse(action) {
  yield put(setLoading(true));

  try {
    yield call(deleteHouse, action.id);
    action.callback && action.callback();
  } catch (err) {
    yield put(deleteHouseFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* houseListSaga() {
  yield takeLatest(GET_HOUSE_LIST_REQUEST, doGetHouseList);
  yield takeLatest(DELETE_HOUSE_REQUEST, doDeleteHouse);
}
