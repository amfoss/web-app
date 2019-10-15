import React from 'react';
import classNames from 'classnames';
import Cookies from 'universal-cookie';


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
    if (!this.state.profileSet && this.state.isLoggedIn) {
      this.setProfile();
    }
    if (!this.state.dataSet && this.state.profileSet) {
      this.setData();
    }
  }

  setProfile = async () => {
    const variables = { username: this.state.username};
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      localStorage.setItem('first_name', response.data.profile.firstName);
      localStorage.setItem('last_name', response.data.profile.lastName);
      localStorage.setItem('gravatar', response.data.profile.gravatar);
      this.setState({ profileSet: true });
    }
  };

  setData() {
    const firstName = localStorage.getItem('first_name');
    const lastName = localStorage.getItem('last_name');
    const gravatar = localStorage.getItem('gravatar');
    const username = cookies.get('username');
    this.setState({ firstName, lastName, gravatar, username, dataSet: true });
  }

  render() {
    return (
      <div />
    );
  }
}

export default Topbar;
