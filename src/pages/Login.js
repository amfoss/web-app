import React from 'react';
import { Helmet } from 'react-helmet';
import 'babel-polyfill';
import Topbar from '../components/topbar';
import LoginForm from '../components/loginForm';

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Login Page</title>
        </Helmet>
        <Topbar />
        <LoginForm />
      </React.Fragment>
    );
  }
}

export default Login;
