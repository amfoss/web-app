import React, { useEffect, useState } from 'react';

import 'antd/dist/antd.css';
import '../styles/styles.sass';
import SEO from '../components/Seo';
import Sidebar from '../components/sidebar';
import dataFetch from "../utils/dataFetch";
import Cookies from "universal-cookie";
import ReactLoading from 'react-loading';

const cookies = new Cookies();

const Base = ({ children, title, location }) => {
  const [isLoading, setLoaded] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const query = `
  mutation verifyToken($token: String!){
  verifyToken(token:$token){
    payload
  }
}
`;
  const fetchData = async variables => dataFetch({ query, variables });
  const fetchAdminStatus = async () => dataFetch({ query: `{ isAdmin }` });


  useEffect(() => {
    if(!isLoading){
      const token = cookies.get('token');
      if(token){
        const variables = { token };
        fetchData(variables).then(r => {
          if(r.errors){
            cookies.remove('token');
            cookies.remove('refreshToken');
            cookies.remove('username');
            localStorage.clear();
          }
          setLoaded(true);
        });
        fetchAdminStatus().then(r => {
          setLoaded(true);
          setAdmin(r.data.isAdmin);
        })
      }
    }
  });

  return isLoading ? (
    <React.Fragment>
      <SEO title={title} />
      <Sidebar isAdmin={isAdmin} selected={location.pathname}>
        <div style={{minHeight: '100vh'}}>
          {children}
        </div>
      </Sidebar>
    </React.Fragment>
  ):
    <div className="loading">
      <ReactLoading type={"bars"} color={"#001529"} height={'10%'} width={'10%'} />
    </div>
    ;
};

export default Base;
