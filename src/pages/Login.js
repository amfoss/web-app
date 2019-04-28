import React from 'react';
import { Helmet } from 'react-helmet';
import 'babel-polyfill';
import Topbar from '../components/topbar';
import TitleBar from '../components/titlebar';
import LoginForm from '../components/login/loginForm';

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Login Page</title>
        </Helmet>
        <Topbar />
        <div className="page-container">
          <TitleBar title="Welcome !"/>
        </div>
        <LoginForm />
      </React.Fragment>
    );
  }
}

export default Login;
