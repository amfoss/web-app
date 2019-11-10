import React, { useEffect, useState } from 'react';

import 'antd/dist/antd.css';
import '../styles/styles.sass';
import SEO from '../components/Seo';
import Sidebar from '../components/sidebar';
import dataFetch from '../utils/dataFetch';

const Base = ({ children, title, location }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isClubMember, setMember] = useState(false);


  const fetchMemberStatus = async () => dataFetch({ query: `{ isClubMember }` });


  useEffect(() => {
    if (!isLoaded) {
      const darkThemeEnabled = localStorage.getItem('darkMode');
      setDarkTheme(darkThemeEnabled === '1');
      fetchMemberStatus().then( r => {
        setLoaded(true);
        setMember(r.data.isClubMember);
      });
    }
  });

  const switchTheme = () => {
    setDarkTheme(!darkTheme);
    if(darkTheme) localStorage.setItem('darkMode', '0');
    else localStorage.setItem('darkMode', '1');
  };


  return (
    <React.Fragment>
      <SEO title={title} />
      <Sidebar isLoaded={isLoaded} isClubMember={isClubMember} selected={location.pathname}>
        {children}
      </Sidebar>
    </React.Fragment>
  );
};

export default Base;
