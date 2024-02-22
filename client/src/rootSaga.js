import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import loginSaga from '@containers/Client/saga';
import registerSaga from '@pages/Register/saga';
import userListSaga from '@pages/UserList/saga';
import userDetailSaga from '@pages/UserDetail/saga';
import houseListSaga from '@pages/HouseList/saga';
import houseDetailSaga from '@pages/HouseDetail/saga';
import houseFormSaga from '@pages/HouseForm/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    registerSaga(),
    userListSaga(),
    userDetailSaga(),
    houseFormSaga(),
    houseListSaga(),
    houseDetailSaga(),
  ]);
}
