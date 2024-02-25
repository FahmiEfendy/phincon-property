import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectConversationListState = (state) => state.conversationList || initialState;

export const selectConversationList = createSelector(selectConversationListState, (state) => state.conversationList);
export const selectConversationDetail = createSelector(
  selectConversationListState,
  (state) => state.conversationDetail
);
export const selectSendMessage = createSelector(selectConversationListState, (state) => state.sendMessage);
