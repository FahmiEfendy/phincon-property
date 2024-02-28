import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';

import registerReducer, { storedKey as storedRegisterState } from '@pages/Register/reducer';
import userListReducer, { storedKey as storeduserListState } from '@pages/UserList/reducer';
import userDetailReducer, { storedKey as storedUserDetailState } from '@pages/UserDetail/reducer';

import houseFormReducer, { storedKey as storedHouseFormState } from '@pages/HouseForm/reducer';
import houseListReducer, { storedKey as storedHouseListState } from '@pages/HouseList/reducer';
import houseDetailReducer, { storedKey as storedHouseDetailState } from '@pages/HouseDetail/reducer';

import favoriteListReducer, { storedKey as storedfavoriteListState } from '@pages/FavoriteList/reducer';

import conversationListReducer, { storedKey as storedConversationListState } from '@pages/ConversationList/reducer';

import appointmentListReducer, { storedKey as storedAppointmentListState } from '@pages/AppointmentList/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  register: { reducer: registerReducer, whitelist: storedRegisterState },
  userList: { reducer: userListReducer, whitelist: storeduserListState },
  userDetail: { reducer: userDetailReducer, whitelist: storedUserDetailState },
  houseForm: { reducer: houseFormReducer, whitelist: storedHouseFormState },
  houseList: { reducer: houseListReducer, whitelist: storedHouseListState },
  houseDetail: { reducer: houseDetailReducer, whitelist: storedHouseDetailState },
  favoriteList: { reducer: favoriteListReducer, whitelist: storedfavoriteListState },
  conversationList: { reducer: conversationListReducer, whitelist: storedConversationListState },
  appointmentList: { reducer: appointmentListReducer, whitelist: storedAppointmentListState },
};

const temporaryReducers = {
  language: languageReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
