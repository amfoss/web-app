import React from 'react';
import TitleBar from '../components/titlebar';
import Base from './Base';

import Dashboard from '../modules/attendance/Dashboard';

const Attendance = () => (
  <Base>
    <TitleBar title="Attendance" />
    <Dashboard />
  </Base>
);


export default Attendance;
