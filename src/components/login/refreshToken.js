import dataFetch from "../../utils/dataFetch";
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const query = `
mutation refreshToken($refreshToken: String!){
  refreshToken(refreshToken: $refreshToken){
    token
    refreshToken
    payload
  }
}`;

export async function refresh() {
  const refreshtoken = cookies.get('refreshToken');
  const variables = { refreshToken: refreshtoken };
  const response = await dataFetch({ query, variables });
  if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
    cookies.set('token', response.data.refreshToken.token, { path: '/' });
    cookies.set('refreshToken', response.data.refreshToken.refreshToken, { path: '/' });
    cookies.set('username', response.data.refreshToken.payload.username, { path: '/' });
  } else {
    localStorage.clear();
    cookies.remove('token');
    cookies.remove('refreshToken');
    cookies.remove('username');
  }
   setInterval(() => refresh(), 50000);
}
