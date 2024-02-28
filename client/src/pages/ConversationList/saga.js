import { put, call, takeLatest } from 'redux-saga/effects';

import { setLoading } from '@containers/App/actions';
import { getConversationDetail, getConversationList, postSendMessage } from '@domain/api';
import { GET_CONVERSATION_DETAIL_REQUEST, GET_CONVERSATION_LIST_REQUEST, POST_SEND_MESSAGE_REQUEST } from './constants';
import {
  getConversationDetailFailed,
  getConversationDetailSuccess,
  getConversationListFailed,
  getConversationListSuccess,
  postSendMessageFailed,
} from './actions';

function* doGetConversationList() {
  yield put(setLoading(true));

  try {
    const response = yield call(getConversationList);

    yield put(getConversationListSuccess(response.data));
  } catch (err) {
    yield put(getConversationListFailed(err.response.data));
  }

  yield put(setLoading(false));
}

function* doGetConversationDetail(action) {
  yield put(setLoading(true));

  try {
    const response = yield call(getConversationDetail, action.payload);

    yield put(getConversationDetailSuccess(response.data));
  } catch (err) {
    yield put(getConversationDetailFailed(err.response.data));
  }

  yield put(setLoading(false));
}

function* doPostSendMessage(action) {
  yield put(setLoading(true));

  try {
    yield call(postSendMessage, action.payload);
  } catch (err) {
    yield put(postSendMessageFailed(err.response.data));
  }

  yield put(setLoading(false));
}

export default function* conversationListSaga() {
  yield takeLatest(GET_CONVERSATION_LIST_REQUEST, doGetConversationList);
  yield takeLatest(GET_CONVERSATION_DETAIL_REQUEST, doGetConversationDetail);
  yield takeLatest(POST_SEND_MESSAGE_REQUEST, doPostSendMessage);
}
