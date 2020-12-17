import React from 'react';

import RegisterForm from '../components/register/registerForm';
import Header from '../components/header';

const Register = () => {
  return (
    <React.Fragment>
      <Header title="Register" />
      <div className="page-container" style={{ background: '#eee' }}>
        <div className="container">
          <div className="row m-0">
            <div className="col-md-6 col-lg-8" />
            <div className="col-md-6 col-lg-4" style={{ top: 150 }}>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
