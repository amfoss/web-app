import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import moment from 'moment';
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

  const query = `
      mutation verifyToken($token: String!){
      verifyToken(token:$token){
        payload
      }
    }
    `;
  const fetchData = async (variables) => dataFetch({ query, variables });
  const fetchAdminStatus = async () => dataFetch({ query: `{ isAdmin }` });

  useEffect(() => {
    const token = cookies.get('token');
    if (token) {
      const variables = { token };
      if (!loaded) {
        fetchData(variables).then((r) => {
          if (!Object.prototype.hasOwnProperty.call(r, 'errors')) {
            if (moment().unix() > r.data.verifyToken.payload.exp) {
              router.push('/logout');
            }
          } else {
            router.push('/logout');
          }
          setLoaded(true);
        });
      }
      if (!adminLoaded) {
        fetchAdminStatus().then((r) => {
          setAdmin(r.data.isAdmin);
          setAdminLoaded(true);
        });
      }
    } else {
      router.push('/login');
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
