import React from 'react';
import 'babel-polyfill';
import LoginForm from '../components/login/loginForm';
import Topbar from '../components/topbar.js';
import SEO from '../components/Seo';

class Login extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SEO title="Login"/>
        <Topbar />
        <div className="page-container">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-4"/>
              <div className="col-md-6 col-lg-4" style={{ top: 150 }}>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
