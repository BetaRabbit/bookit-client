import 'whatwg-fetch';
import { checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/votes';

export function vote(params = {}) {
  return fetch(API, {
    ...fetchOptions(),
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
