import { call, put, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { getUserDetail, patchChangePassword, patchUpdateUser } from '@domain/api';
import { GET_USER_DETAIL_REQUEST, PATCH_CHANGE_PASSWORD_REQUEST, PATCH_UPDATE_USER_REQUEST } from './constants';
import { getUserDetailFailed, getUserDetailSuccess, patchChangePasswordFailed, patchUpdateUserFailed } from './actions';

function* doGetUserDetail(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getUserDetail, action.id);

    yield put(getUserDetailSuccess(response.data));
  } catch (err) {
    yield put(getUserDetailFailed(err.response.data));
  }

  yield put(setLoading(false));
}

function* doPatchUpdateUser(action) {
  yield put(setLoading(true));

  try {
    yield call(patchUpdateUser, action.object);
    action.callback && action.callback();
  } catch (err) {
    yield put(patchUpdateUserFailed(err.response.data));
  }

  yield put(setLoading(false));
}

function* doPatchChangePassword(action) {
  yield put(setLoading(true));

  try {
    yield call(patchChangePassword, action.object);
    action.callback && action.callback();
  } catch (err) {
    yield put(patchChangePasswordFailed(err.response.data));
  }

  yield put(setLoading(false));
}

export default function* userDetailSaga() {
  yield takeLatest(GET_USER_DETAIL_REQUEST, doGetUserDetail);
  yield takeLatest(PATCH_UPDATE_USER_REQUEST, doPatchUpdateUser);
  yield takeLatest(PATCH_CHANGE_PASSWORD_REQUEST, doPatchChangePassword);
}
