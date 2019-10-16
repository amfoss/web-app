import React from 'react';
import TitleBar from '../components/titlebar';
import Base from './Base';

const Dashboard = props => {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
  ];

  return (
    <React.Fragment>
      <Base title="Dashboard" {...props}>
        <TitleBar routes={routes} title="Home" />
      </Base>
    </React.Fragment>
  );
};

export default Dashboard;
