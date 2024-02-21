import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',

  login: '/user/login',
  register: '/user/register',
  userList: '/user/list',
  userDetail: '/user/detail',
  updateUser: '/user/update',
  changePassword: '/user/change-password',
  deleteUser: '/user/delete',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');
export const postLogin = (data) => callAPI(urls.login, 'POST', {}, {}, data);
export const postRegister = (data) => callAPI(urls.register, 'POST', {}, {}, data);
export const getUserList = () => callAPI(urls.userList, 'GET');
export const getUserDetail = (id) => callAPI(`${urls.userDetail}/${id}`, 'GET');
export const patchUpdateUser = (object) =>
  callAPI(`${urls.updateUser}/${object.id}`, 'PATCH', { 'Content-Type': 'multipart/form-data' }, {}, object.payload);
export const patchChangePassword = (object) =>
  callAPI(`${urls.changePassword}/${object.id}`, 'PATCH', {}, {}, object.payload);
export const deleteUser = (id) => callAPI(`${urls.deleteUser}/${id}`, 'DELETE');
