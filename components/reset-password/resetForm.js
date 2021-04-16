import React, { useState } from 'react';
import dataFetch from '../../utils/dataFetch';
import Link from 'next/link';
import Result from 'antd/lib/result';

const ResetForm = () => {
  const [loading, setLoaded] = useState(false);
  const [email, sendEmail] = useState('');
  const [error, setErrorText] = useState('');
  const [success, setSuccessText] = useState('');

  const query = `
  mutation ($email: String!){
  resetPassword(email:$email){
    status
  }
}
  `;

  const submitForm = async (variables) => dataFetch({ query, variables });

  const resetPassword = () => {
    const variables = { email };
    submitForm(variables).then((r) => {
      if (Object.prototype.hasOwnProperty.call(r, 'errors')) {
        setErrorText(r.errors[0].message);
      } else {
        setSuccessText(r.data.status);
        setErrorText('');
      }
    });
  };

  return !loading ? (
    <div>
      <img src="/static/images/cms_logo.png" className="w-100 my-4" alt="CMS Logo" />
      <form
        className="form-group"
        onSubmit={(e) => {
          setLoaded(true);
          resetPassword();
          e.preventDefault();
        }}
      >
        <div className="page-container">
          <div className="row m-0">
            <div className="col-md-12">
              <label>Reset Password</label>
              <div className="m-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  className="form-control"
                  onChange={(e) => sendEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-md-center m-3">
            <button type="submit" className="button btn ant-btn-primary">
              Reset Password
            </button>
          </div>
        </div>
      </form>
      <Link href="/login">Already have an account? Login</Link>
    </div>
  ) : (
    <div>
      {success !== '' ? (
        <Result status="success" title="Check your email for password" />
      ) : error !== '' ? (
        <div className="alert alert-danger m-4">{error}</div>
      ) : (
        <div className="alert alert-warning m-4">Submitting. Please Wait</div>
      )}
    </div>
  );
};

export default ResetForm;
