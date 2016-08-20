import 'whatwg-fetch';
import { paramToQuery, checkStatus, parseJSON, fetchOptions } from '../utils/fetch';

const API = '/api/vote_sessions';

export function fetchVoteSessions(params = {}) {
  const url = paramToQuery(API, params);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}

export function fetchVoteSession(params = {}) {
  const { id, ...rest } = params;
  const url = paramToQuery(`${API}/${id}`, rest);

  return fetch(url, {
    ...fetchOptions(),
  }).then(checkStatus)
    .then(parseJSON)
    .then(json => json);
}
