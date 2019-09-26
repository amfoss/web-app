import React from 'react';
import SEO from '../components/Seo';
import Topbar from '../components/topbar';
import StreamList from '../components/dashboard/StreamList';
import TitleBar from '../components/titlebar';

const Dashboard = () => {
  const firstName = localStorage.getItem('first_name');
  return (
    <React.Fragment>
      <SEO title="Dashboard" />
      <Topbar />
      <div className="page-container">
        <TitleBar title={`Hello ${firstName}!`} />
        <div className="container">
          <h3>Technical</h3>
          <StreamList type="T" hasParent={false} />
          <h3>Non-Technical</h3>
          <StreamList type="N" hasParent={false} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
