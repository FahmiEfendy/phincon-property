import { call, put, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { deleteHouseImage, patchUpdateHouse, postCreateHouse } from '@domain/api';
import { deleteHouseImageFailed, patchUpdateHouseFailed, postCreateHouseFailed } from './actions';
import { DELETE_HOUSE_IMAGE_REQUEST, PATCH_UPDATE_HOUSE_REQUEST, POST_CREATE_HOUSE_REQUEST } from './constants';

function* doCreateHouse(action) {
  yield put(setLoading(true));

  try {
    yield call(postCreateHouse, action.payload);
    action.callback && action.callback();
  } catch (err) {
    yield put(postCreateHouseFailed(err.response.data));
  }

  yield put(setLoading(false));
}

function* doUpdateHouse(action) {
  yield put(setLoading(true));

  try {
    yield call(patchUpdateHouse, action.object);
    action.callback && action.callback();
  } catch (err) {
    yield put(patchUpdateHouseFailed(err.response.data));
  }

  yield put(setLoading(false));
}

function* doDeleteHouseImage(action) {
  yield put(setLoading(true));

  try {
    yield call(deleteHouseImage, action.object);
    action.callback && action.callback();
  } catch (err) {
    yield put(deleteHouseImageFailed(err.response.data));
  }

  yield put(setLoading(false));
}

export default function* houseFormSaga() {
  yield takeLatest(POST_CREATE_HOUSE_REQUEST, doCreateHouse);
  yield takeLatest(DELETE_HOUSE_IMAGE_REQUEST, doDeleteHouseImage);
  yield takeLatest(PATCH_UPDATE_HOUSE_REQUEST, doUpdateHouse);
}
