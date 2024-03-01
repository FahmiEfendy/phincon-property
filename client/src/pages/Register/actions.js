import { POST_REGISTER_FAILED, POST_REGISTER_REQUEST, POST_REGISTER_RESET } from './constants';

export const postRegisterRequest = (payload, callback) => ({
  type: POST_REGISTER_REQUEST,
  payload,
  callback,
});

export const postRegisterFailed = (error) => ({
  type: POST_REGISTER_FAILED,
  error,
});

export const postRegisterReset = () => ({
  type: POST_REGISTER_RESET,
});
