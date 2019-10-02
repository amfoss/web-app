import React, {useEffect, useState} from 'react';
import SEO from '../components/Seo';
import Topbar from '../components/topbar';
import TitleBar from '../components/titlebar';

import Dashboard from '../modules/attendance/Dashboard';

const Attendance = () => (
  <React.Fragment>
    <SEO title="Attendance" />
    <Topbar />
    <div className="page-container">
      <TitleBar title="Attendance" />
      <Dashboard />
    </div>
  </React.Fragment>
);


export default Attendance;
