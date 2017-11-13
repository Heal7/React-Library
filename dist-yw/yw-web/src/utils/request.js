import fetch from 'dva/fetch';
import constants from './constants';
import Promise from 'promise-polyfill';

if (!window.Promise) {
  window.Promise = Promise;
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
 
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function request(url, options) {
  const response = await fetch(url, options);
  checkStatus(response);
  const data = await response.json();
  const ret = {
    data,
    headers: {},
  };
  if (response.headers.get('x-total-count')) {
    ret.headers['total-count'] = Number.parseInt(response.headers.get('x-total-count'));
  }
  return ret;
  /*
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
    */
}

export async function get(url) {
  const response = await fetch(url, {
    credentials: "include"
  });
  return response.json();
}

export async function put(url, data) {
  return await dataOpe(url, data, "PUT");
}

export async function post(url, data) {
  return await dataOpe(url, data, "POST");
}

export async function del(url) {
  const response = await fetch(url, {
    method: "DELETE",
    credentials: "include"
  });
  return response.json();
}

export async function deleteData(url, data) {
  return await dataOpe(url, data, "DELETE");
}

async function dataOpe(url, data, method) {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
  return await response.json();
}