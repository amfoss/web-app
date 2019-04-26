import React from 'react';
import { Tooltip, Button, Card, FormGroup, InputGroup, Callout } from '@blueprintjs/core';

import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';

import dataFetch from '../utils/dataFetch';

const cookies = new Cookies();

const query = `
mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
        token
        refreshToken
    }
}`;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      cookieSet: false,
      authFail: false,
    };
    this.passwordEntry = this.passwordEntry.bind(this);
    this.usernameEntry = this.usernameEntry.bind(this);
    this.handleLockClick = this.handleLockClick.bind(this);
  }

  componentDidMount() {
    const token = cookies.get('token');
    if (token != null) {
      this.setState({
        cookieSet: true,
      });
    }
  }

  login = async () => {
    const variables = { username: this.state.username, password: this.state.password };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      cookies.set('token', response.data.tokenAuth.token, { path: '/' });
      cookies.set('refreshToken', response.data.tokenAuth.refreshToken, { path: '/' });
      this.setState({ cookieSet: true });
    } else {
      this.setState({ authFail: true });
    }
  };

  passwordEntry(event) {
    this.setState({ password: event.target.value });
  }

  usernameEntry(event) {
    this.setState({ username: event.target.value });
  }

  handleLockClick() {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  render() {
    if (this.state.cookieSet) return <Redirect to="/" />;

    const lockButton = (
      <Tooltip content={`${this.state.showPassword ? 'Hide' : 'Show'} Password`}>
        <Button
          icon={this.state.showPassword ? 'unlock' : 'lock'}
          intent="warning"
          minimal
          onClick={this.handleLockClick}
        />
      </Tooltip>
    );

    const errorMessage = (
      <div style={{ padding: '1rem 0rem' }}>
        <Callout intent="danger">Please provide a valid username and password.</Callout>
      </div>
    );

    return (
      <Card elevation="2">
        <h1>Login</h1>
        {this.state.authFail ? errorMessage : null}
        <FormGroup label="Username" labelFor="text-input" labelInfo="(required)">
          <InputGroup onChange={this.usernameEntry} placeholder="Enter your username" />
        </FormGroup>
        <FormGroup label="Password" labelFor="text-input" labelInfo="(required)">
          <InputGroup
            placeholder="Enter your password..."
            onChange={this.passwordEntry}
            rightElement={lockButton}
            type={this.state.showPassword ? 'text' : 'password'}
          />
        </FormGroup>
        <Button type="submit" intent="primary" text="Login" onClick={this.login} />
      </Card>
    );
  }
}

export default LoginForm;
