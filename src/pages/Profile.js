import React from 'react';
import 'babel-polyfill';
import { Card } from '@blueprintjs/core';
import Cookies from 'universal-cookie';

import Topbar from '../components/topbar.js';
import SEO from "../components/Seo";
import HeatMap from "../components/profile/HeatMap";
import Summary from "../components/profile/Summary";
import StatusUpdateSummary from "../components/profile/StatusUpdateSummary";
import LeaveRecord from "../components/profile/LeaveRecord";
import TasksStatus from "../components/profile/TasksStatus";
import Avatar from '../images/placeholders/avatar.png';
import Cover from '../images/placeholders/cover.jpg';

const cookies = new Cookies();

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      token: '',
      firstName: '',
      lastName: '',
      gravatar: '',
      profileSet: false,
      dataSet: false,
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const firstName = localStorage.getItem('first_name');
    const token = cookies.get('token');
    if (token) {
      if (firstName == null) {
        const username = cookies.get('username');
        this.setState({ token, username, isLoggedIn: true });
      } else {
        this.setState({ profileSet: true });
      }
    }
  }

  componentDidUpdate() {
    if (!this.state.dataSet && this.state.profileSet) {
      this.setData();
    }
  }

  setData() {
    const firstName = localStorage.getItem('first_name');
    const lastName = localStorage.getItem('last_name');
    const gravatar = localStorage.getItem('gravatar');
    const username = cookies.get('username');
    this.setState({ firstName, lastName, gravatar, username, dataSet: true });
  }

  render() {
    return (
      <React.Fragment>
        <SEO title="Profile"/>
        <Topbar />
        <div className="page-container">
          <div className="container">
            <Card elevation ="2" style={{margin: 0}}>
              <div className="row"/>
              <div className="row">
                <div className="col-md-1" />
                <div className="col-md-3">
                    { this.state.gravatar ? <img src={this.state.gravatar}  className="profile-img" alt="profile" />: <img src={Avatar} className="profile-img" alt="profile" />}
                </div>
                <div className="col-md-6 profile-text">
                  <h1>{this.state.firstName} {this.state.lastName}</h1>
                  <h3>Member</h3>
                </div>
              </div>
            </Card>
            <div className="pt-4"><HeatMap/></div>
            <div className="pt-4"><Summary/></div>
            <div className="pt-4"><StatusUpdateSummary/></div>
            <div className="pt-4"><LeaveRecord/></div>
            <div className="pt-4"><TasksStatus/></div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
