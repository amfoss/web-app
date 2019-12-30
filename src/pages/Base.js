import React, { useEffect, useState } from 'react';

import 'antd/dist/antd.css';
import '../styles/styles.sass';
import SEO from '../components/Seo';
import Sidebar from '../components/sidebar';

const Base = ({ children, title, location }) => {

  return (
    <React.Fragment>
      <SEO title={title} />
      <Sidebar selected={location.pathname}>
        <div style={{minHeight: '100vh'}}>
          {children}
        </div>
      </Sidebar>
    </React.Fragment>
  );
};

export default Base;
