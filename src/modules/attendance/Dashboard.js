import React from 'react';
import Overview from './components/Overview';
import DailyList from './components/DailyList';
import LiveList from './components/LiveList';

const Dashboard = () => (
  <div>
    <LiveList />
    <Overview />
    <DailyList />
  </div>
);

export default Dashboard;
