import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const API_URL = 'https://api.amfoss.in/';

export default ({ data }) => {
  const token = cookies.get('token');
  return axios({
    method: 'post',
    url: API_URL,
    data,
    headers: {
      Authorization: token ? `JWT ${token}` : null,
    },
    config: {
      headers: {
        'Content-Tranfer-Encoding': 'multipart/form-data',
        'Content-Type': 'application/graphql',
      },
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (response) {
      throw response;
    });
};
