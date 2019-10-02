import React from 'react';

import Overview from './components/Overview';
import LiveAttendance from './components/LiveAttendance';

const Dashboard = () => (
  <div className="row m-0">
    <div className="col-md-6 p-2">
      <Overview />
    </div>
    <div className="col-12 p-2">
      <LiveAttendance />
    </div>
  </div>
);

export default Dashboard;
