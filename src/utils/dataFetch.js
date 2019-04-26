import fetch from 'isomorphic-fetch';

/*
 Isomorphic fetch that can be used as in in both the server and the client. Usage:
 import dataFetch from 'src/common/dataFetch';
 dataFetch({method: 'GET', url: '/v1/hey', query: {fullLength: true}, useDefaultHost: true})
 .then((json) => {
    console.log(json);
  })
 .catch((err)=> {
    //do something {}
  })
 */

const API_URL = 'http://127.0.0.1:3200/graphql/';

type dataFetchOptions = {
  query?: Object,
  variables?: Object,
};

export default function dataFetch({ query, variables }: dataFetchOptions) {
  const body = {
    query,
    variables,
  };

  const apiConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(API_URL, apiConfig).then(function(response) {
    const contentType = response.headers.get('content-type');
    if (response.ok) {
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return response.json().then(json => json);
      }
      if (contentType && contentType.indexOf('text') !== -1) {
        return response.text().then(text => text);
      }
      return response;
    }
    console.error(`Response status ${response.status} during dataFetch for url ${response.url}.`);
    throw response;
  });
}
