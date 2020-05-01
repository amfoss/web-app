import React from 'react';

import LoginForm from '../components/login/loginForm';
import Header from '../components/header';

const Login = ({ lastLocation }) => {
  return (
    <React.Fragment>
      <Header title="Login" />
      <div className="page-container" style={{ background: '#eee' }}>
        <div className="container">
          <div className="row m-0">
            <div className="col-md-6 col-lg-8" />
            <div className="col-md-6 col-lg-4" style={{ top: 150 }}>
              <LoginForm lastLocation={lastLocation} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
