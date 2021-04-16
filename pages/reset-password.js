import React from 'react';

import ResetForm from '../components/reset-password/resetForm';
import Header from '../components/header';

const ResetPassword = () => {
  return (
    <React.Fragment>
      <Header title="Reset Password" />
      <div className="page-container" style={{ background: '#eee' }}>
        <div className="container">
          <div className="row m-0">
            <div className="col-md-6 col-lg-8" />
            <div className="col-md-6 col-lg-4" style={{ top: 150 }}>
              <ResetForm />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword;
