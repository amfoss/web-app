import React, { useEffect, useState } from 'react';

import 'antd/dist/antd.css';
import '../styles/styles.sass';
import SEO from '../components/Seo';
import Sidebar from '../components/sidebar';

const Base = ({ children, location }) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      const darkThemeEnabled = localStorage.getItem('darkMode');
      setDarkTheme(darkThemeEnabled === '1');
      setLoaded(true);
    }
  });

  const switchTheme = () => {
    setDarkTheme(!darkTheme);
    if(darkTheme) localStorage.setItem('darkMode', '0');
    else localStorage.setItem('darkMode', '1');
  };


  return (
    <React.Fragment>
      <SEO title="Attendance" />
      <Sidebar selected={location.pathname}>{children}</Sidebar>
    </React.Fragment>
  );
};

export default Base;
