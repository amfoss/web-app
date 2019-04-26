import React from 'react';
import {Navbar, Menu, MenuItem, Button, Popover, Card} from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import dataFetch from '../utils/dataFetch';

const cookies = new Cookies();

const query = `
query getProfile($username: String!, $token: String!)
{
  profile(username: $username, token: $token)
  {
    firstName
    lastName
    avatar
    role
  }
}`;


class Topbar extends React.Component {
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

  componentDidMount() {
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
    if(!this.state.profileSet && this.state.isLoggedIn)  { this.setProfile(); }
    if (!this.state.dataSet && this.state.profileSet) { this.setData(); }
  }

  setProfile = async () => {
    const variables = { username: this.state.username, token: this.state.token };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      localStorage.setItem('first_name', response.data.profile.firstName);
      localStorage.setItem('last_name', response.data.profile.lastName);
      localStorage.setItem('avatar', response.data.profile.avatar);
      localStorage.setItem('role', response.data.profile.role);
      this.setState({ profileSet: true });
    }
  };

  setData() {
    const firstName = localStorage.getItem('first_name');
    const lastName = localStorage.getItem('last_name');
    const avatar = localStorage.getItem('avatar');
    const role = localStorage.getItem('role');
    const username = cookies.get('username');
    this.setState({ firstName, lastName, avatar, role, username, dataSet: true });
  }

  render() {
    const profile_dropdown = (
      <Menu>
        <MenuItem text="Settings" icon="settings"/>
        <Link to="/logout">
          <MenuItem text="Logout" icon="log-out"/>
        </Link>
      </Menu>
    );

    return (
      <React.Fragment>
        <Navbar>
          <Navbar.Group>
            <Navbar.Heading>amFOSS App</Navbar.Heading>
          </Navbar.Group>
          {this.state.dataSet ?
            <Navbar.Group align="right">
              <Popover content={profile_dropdown} position="bottom-left">
                <div>
                  <img src={`http://127.0.0.1:3200/${this.state.avatar}`} style={{ width: '32px', borderRadius: '100vw' }} />
                  <span>Hey {this.state.firstName} !</span>
                </div>
              </Popover>
            </Navbar.Group> : null
          }
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Topbar;
