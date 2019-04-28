import React from 'react';
import { Helmet } from 'react-helmet';
import 'babel-polyfill';
import Topbar from '../components/topbar.js';
import { Card } from '@blueprintjs/core';
import {Container, Row, Col } from 'react-grid';
import Cookies from 'universal-cookie';
import { ResponsiveCalendar } from '@nivo/calendar';


const cookies = new Cookies();

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      token: '',
      firstName: '',
      lastName: '',
      avatar: '',
      role: '',
      profileSet: false,
      dataSet: false,
      isLoggedIn: false
    };
  }
  componentDidMount(){
    const firstName = localStorage.getItem('first_name');
    const token = cookies.get('token');
    if(token)
    {
      if (firstName == null) {
        const username = cookies.get('username');
        this.setState({ token, username, isLoggedIn: true });
      } else { this.setState({ profileSet: true }); }
    }
  }

  componentDidUpdate() {
    if (!this.state.dataSet && this.state.profileSet) { this.setData(); }
  }

  setData() {
    const firstName = localStorage.getItem('first_name');
    const lastName = localStorage.getItem('last_name');
    const avatar = localStorage.getItem('avatar');
    const role = localStorage.getItem('role');
    const username = cookies.get('username');
    this.setState({ firstName, lastName, avatar, role, username, dataSet: true });
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <Topbar />
        <div className="page-container">
          <Card elevation ="2">
            <Container>
              <Row>
                <Col sm={3} md={3}>
                  <img src={`http://127.0.0.1:3200/${this.state.avatar}`} style={{ width: '190px', borderRadius: '100vw' }} />  
                </Col>
                <Col sm={9} md={9}>
                  <h1>{this.state.firstName} {this.state.lastName}</h1>
                  <h5>@{this.state.username}</h5>
                  <h3>{this.state.role}</h3>
                </Col>
              </Row>
            </Container>
          </Card>
          <ResponsiveCalendar />
        </div>
      </React.Fragment>
    );
  }
}
export default Profile;
