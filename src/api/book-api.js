import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/books';

export function fetchBooks(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchBook(params = {}) {
  const { id, ...rest } = params;
  const url = paramToQuery(`${API}/${id}`, rest);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function search(params = {}) {
  const url = `${API}/search`;

  return fetch(url, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
