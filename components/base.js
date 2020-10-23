import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import moment from "moment";
import PropTypes from 'prop-types';

import Sidebar from '../components/sidebar';
import dataFetch from '../utils/dataFetch';
import Header from './header';
import LoadingScreen from './loadingScreen';
import AdminRequired from "./adminRequired";

const cookies = new Cookies();

const Base = ({ children, title, adminRequired }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [adminLoaded, setAdminLoaded] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const refreshTokenQuery = `
  mutation refresh($refresh: String!) {
  refreshToken(refreshToken: $refresh) {
    token
    refreshToken
    payload
    refreshExpiresIn
  }
}
  `;
  const refreshTokens = async (refreshTokenVariables) => dataFetch({ query: refreshTokenQuery, variables: refreshTokenVariables });
  const fetchAdminStatus = async () => dataFetch({ query: `{ isAdmin }` });

  useEffect(() => {
    const token = cookies.get('token');
    const refreshToken = cookies.get('refreshToken');
    const expiry = cookies.get('expiry');
    if(!loaded) {
      if(token !== null || refreshToken !== null) {
        if (moment().unix() + 50 > expiry) {
          const refreshTokenVariables = { refresh: refreshToken };
          refreshTokens(refreshTokenVariables).then((response) => {
            if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
              const tokenMaxAge = response.data.refreshToken.payload.exp - response.data.refreshToken.payload.origIat;
              cookies.set('token', response.data.refreshToken.token, { path: '/', maxAge: tokenMaxAge  });
              cookies.set('refreshToken', response.data.refreshToken.refreshToken, {
                path: '/', maxAge: response.data.refreshToken.refreshExpiresIn
              });
              cookies.set('username', response.data.refreshToken.payload.username, {
                path: '/', maxAge: response.data.refreshToken.refreshExpiresIn
              });
              cookies.set('expiry', response.data.refreshToken.payload.exp, {
                path: '/', maxAge: response.data.refreshToken.refreshExpiresIn
              });
            }else {
              router.push('/logout');
            }
          });
        }
        if (!adminLoaded) {
          fetchAdminStatus().then((r) => {
            setAdmin(r.data.isAdmin);
            setAdminLoaded(true);
          });
        }
        setLoaded(true);
      } else {
        router.push('/login');
      }
    }
  });


  return loaded ?
      adminRequired ? (
        <AdminRequired loaded={adminLoaded} isAdmin={isAdmin}>
          <Header title={title} />
          <Sidebar isAdmin={isAdmin} selected={router.pathname}>
            <div style={{ minHeight: '100vh' }}>{children}</div>
          </Sidebar>
        </AdminRequired>
  ) : (
          <React.Fragment>
            <Header title={title} />
            <Sidebar isAdmin={isAdmin} selected={router.pathname}>
              <div style={{ minHeight: '100vh' }}>{children}</div>
            </Sidebar>
          </React.Fragment>
  ) : ( <LoadingScreen text="Loading..." /> )
};

Base.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  adminRequired: PropTypes.bool
};

export default Base;
