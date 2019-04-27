import React from 'react';
import { Helmet } from 'react-helmet';
import Topbar from '../components/topbar';
import StreamList from '../components/dashboard/StreamList';

class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>User Dashboard</title>
        </Helmet>
        <Topbar />
        <h1>Dashboard</h1>
        <h4>Technical</h4>
        <StreamList type="T" hasParent={false} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
