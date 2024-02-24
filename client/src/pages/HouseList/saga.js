import { put, call, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { deleteFromFavorite, deleteHouse, getHouseList, postAddToFavorite } from '@domain/api';
import {
  DELETE_FROM_FAVORITE_REQUEST,
  DELETE_HOUSE_REQUEST,
  GET_HOUSE_LIST_REQUEST,
  POST_ADD_TO_FAVORITE_REQUEST,
} from './constants';
import {
  getHouseListSuccess,
  getHouseListFailed,
  deleteHouseFailed,
  postAddToFavoriteFailed,
  deleteFromFavoriteFailed,
} from './actions';

function* doGetHouseList(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getHouseList, action.id);
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

function* doAddToFavorite(action) {
  yield put(setLoading(true));

  try {
    yield call(postAddToFavorite, action.id);
    action.callback && action.callback();
  } catch (err) {
    yield put(postAddToFavoriteFailed(err.message));
  }

  yield put(setLoading(false));
}

function* doDeleteFromFavorite(action) {
  yield put(setLoading(true));

  try {
    yield call(deleteFromFavorite, action.id);
    action.callback && action.callback();
  } catch (err) {
    yield put(deleteFromFavoriteFailed(err.message));
  }

  yield put(setLoading(false));
}

export default function* houseListSaga() {
  yield takeLatest(GET_HOUSE_LIST_REQUEST, doGetHouseList);
  yield takeLatest(DELETE_HOUSE_REQUEST, doDeleteHouse);
  yield takeLatest(POST_ADD_TO_FAVORITE_REQUEST, doAddToFavorite);
  yield takeLatest(DELETE_FROM_FAVORITE_REQUEST, doDeleteFromFavorite);
}
