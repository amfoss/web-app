import React from 'react';
import { Helmet } from 'react-helmet';
import Topbar from '../components/topbar';

class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>User Dashboard</title>
        </Helmet>
        <Topbar />
        <h1>Dashboard</h1>
      </React.Fragment>
    );
  }
}

export default Dashboard;
