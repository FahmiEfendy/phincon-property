import { jwtDecode } from 'jwt-decode';
import { put, call, takeLatest } from 'redux-saga/effects';

import { postLogin } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { POST_LOGIN_REQUEST } from './constants';
import { postLoginFailed, setLogin, setToken, setUserData } from './actions';

function* doPostLogin(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(postLogin, action.payload);
    action.callback && action.callback();

    yield put(setToken(response.data));
    yield put(setLogin(true));
    yield put(setUserData(jwtDecode(response.data.token)));
  } catch (err) {
    yield put(postLoginFailed(err.response.data));
  }

  yield put(setLoading(false));
}

export default function* loginSaga() {
  yield takeLatest(POST_LOGIN_REQUEST, doPostLogin);
}
