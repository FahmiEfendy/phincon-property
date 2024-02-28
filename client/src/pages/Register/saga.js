import { takeLatest, call, put } from 'redux-saga/effects';

import { postRegister } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { POST_REGISTER_REQUEST } from './constants';
import { postRegisterFailed } from './actions';

function* doPostRegister(action) {
  yield put(setLoading(true));
  try {
    yield call(postRegister, action.payload);
    action.callback && action.callback();
  } catch (err) {
    yield put(postRegisterFailed(err.response.data));
  }
  yield put(setLoading(false));
}

export default function* registerSaga() {
  yield takeLatest(POST_REGISTER_REQUEST, doPostRegister);
}
