import React from 'react';
import SEO from '../components/Seo';
import Topbar from '../components/topbar';
import StreamList from '../components/dashboard/StreamList';
import TitleBar from '../components/titlebar';
import Base from './Base';

const Dashboard = (props) => {
  const firstName = localStorage.getItem('first_name');

  const routes = [
    {
      path: '/',
      name: 'Home',
    },
  ];

  return (
    <React.Fragment>
      <SEO title="Dashboard" />
      <Base {...props}>
        <TitleBar routes={routes} title="Dashboard" />
        <div className="container">
          <h3>Technical</h3>
          <StreamList type="T" hasParent={false} />
          <h3>Non-Technical</h3>
          <StreamList type="N" hasParent={false} />
        </div>
      </Base>
    </React.Fragment>
  );
};

export default Dashboard;
