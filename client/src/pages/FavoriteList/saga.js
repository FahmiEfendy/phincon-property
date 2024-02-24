import { call, put, takeLatest } from 'redux-saga/effects';

import { getFavoriteList } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { GET_FAVORITE_LIST_REQUEST } from './constants';
import { getFavoriteListFailed, getFavoriteListSuccess } from './actions';

function* doGetFavoriteList() {
  yield put(setLoading(true));

  try {
    const response = yield call(getFavoriteList);

    yield put(getFavoriteListSuccess(response.data));
  } catch (err) {
    yield put(getFavoriteListFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* favoriteListSaga() {
  yield takeLatest(GET_FAVORITE_LIST_REQUEST, doGetFavoriteList);
}
