import { produce } from 'immer';

import { POST_REGISTER_REQUEST, POST_REGISTER_FAILED, POST_REGISTER_RESET } from './constants';

export const initialState = {
  register: {
    error: null,
  },
};

export const storedKey = [''];

const registerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case POST_REGISTER_REQUEST:
        draft.register.error = null;
        break;

      case POST_REGISTER_FAILED:
        draft.register.error = action.error;
        break;

      case POST_REGISTER_RESET:
        draft.register.error = null;
        break;

      default:
        break;
    }
  });

export default registerReducer;
