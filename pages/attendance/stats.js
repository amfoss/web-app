import React from 'react';

import Base from '../../components/base';
import Overview from '../../modules/attendance/components/Overview';
import TitleBar from '../../components/titlebar';

const Stats = (props) => {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/attendance',
      name: 'Attendance',
    },
    {
      path: '/attendance-stats',
      name: 'Attendance Statistics',
    },
  ];
  return (
    <Base title="Attendance Statistics" {...props}>
      <TitleBar routes={routes} title="Attendance Statistics" />
      <div className="row m-0">
        <Overview />
      </div>
    </Base>
  );
};

export default Stats;
