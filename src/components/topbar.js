import React from 'react';
import classNames from 'classnames';
import { Navbar, Menu, MenuItem, Button, Popover, Card } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Avatar from '../images/placeholders/avatar.png';

import dataFetch from '../utils/dataFetch';
import { getProfile as query } from '../utils/queries';

const cookies = new Cookies();

class Topbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      token: '',
      firstName: '',
      lastName: '',
      avatar: '',
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
      this.setState({ profileSet: true });
    }
  };

  setData() {
    const firstName = localStorage.getItem('first_name');
    const lastName = localStorage.getItem('last_name');
    const avatar = localStorage.getItem('avatar');
    const username = cookies.get('username');
    this.setState({ firstName, lastName, avatar, username, dataSet: true });
  }

  render() {
    const profile_dropdown = (
      <Menu>
        <MenuItem text="Settings" icon="settings"/>
        <Link to="/profile">
          <MenuItem text="Profile" icon="person"/>
        </Link>
        <Link to="/logout">
          <MenuItem text="Logout" icon="log-out"/>
        </Link>
      </Menu>
    );

    return (
      <React.Fragment>
        <Navbar fixedToTop className={classNames('bp3-dark','top-bar')}>
          <Navbar.Group>
            <Navbar.Heading>amFOSS App</Navbar.Heading>
          </Navbar.Group>
          {this.state.dataSet ?
            <Navbar.Group align="right">
              <Popover content={profile_dropdown} position="bottom-left">
                <div>
                  {this.state.avatar ?
                    <img src={`https://api.amfoss.in/${this.state.avatar}`}
                         style={{width: '32px', borderRadius: '100vw'}}/>:
                    <img src={Avatar} style={{width: '32px', borderRadius: '100vw'}}/>
                  }
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
