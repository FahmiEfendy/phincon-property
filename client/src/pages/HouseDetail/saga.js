import { call, put, takeLatest } from 'redux-saga/effects';

import { getHouseDetail } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { GET_HOUSE_DETAIL_REQUEST } from './constants';
import { getHouseDetailFailed, getHouseDetailSuccess } from './actions';

function* doGetHouseDetail(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getHouseDetail, action.id);

    yield put(getHouseDetailSuccess(response.data));
  } catch (err) {
    yield put(getHouseDetailFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* houseDetailSaga() {
  yield takeLatest(GET_HOUSE_DETAIL_REQUEST, doGetHouseDetail);
}
