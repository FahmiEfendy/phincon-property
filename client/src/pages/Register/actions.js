import { POST_REGISTER_FAILED, POST_REGISTER_REQUEST } from './constants';

export const postRegisterRequest = (payload, callback) => ({
  type: POST_REGISTER_REQUEST,
  payload,
  callback,
});

export const postRegisterFailed = (error) => ({
  type: POST_REGISTER_FAILED,
  error,
});
