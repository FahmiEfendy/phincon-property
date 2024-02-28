import { put, call, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { deleteUser, getUserList } from '@domain/api';
import { DELETE_USER_REQUEST, GET_USER_LIST_REQUEST } from './constants';
import { getUserListSuccess, getUserListFailed, deleteUserFailed } from './actions';

function* doGetUserList() {
  yield put(setLoading(true));

  try {
    const response = yield call(getUserList);

    yield put(getUserListSuccess(response.data));
  } catch (err) {
    yield put(getUserListFailed(err.response.data));
  }

  yield put(setLoading(false));
}

function* doDeleteUser(action) {
  yield put(setLoading(true));

  try {
    yield call(deleteUser, action.id);
    action.callback && action.callback();
  } catch (err) {
    yield put(deleteUserFailed(err.response.data));
  }

  yield put(setLoading(false));
}

export default function* userListSaga() {
  yield takeLatest(GET_USER_LIST_REQUEST, doGetUserList);
  yield takeLatest(DELETE_USER_REQUEST, doDeleteUser);
}
