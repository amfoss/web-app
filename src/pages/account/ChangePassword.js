import React, {useState} from 'react';
import TitleBar from '../../components/titlebar';
import Base from '../Base';
import {Button, DatePicker, Result} from "antd";
import {register} from "../../serviceWorker";
import dataFetch from "../../utils/dataFetch";
import {Link} from "react-router-dom";

const ChangePassword = props => {
  const [isLoading, setLoaded] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setErrorText] = useState("");
  const [success, setSuccessText] = useState("");

  const query = `
  mutation ($password: String!, $newPassword: String!){
  changePassword(password:$password, newPassword:$newPassword){
    status
  }
}
  `;


  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/account',
      name: 'Account',
    },
    {
      path: '/account/change-password',
      name: 'Change Password',
    },
  ];

  const submitForm = async variables =>
    dataFetch({ query, variables });

  const changePassword = () => {
    if(newPassword === verifyPassword) {
      const variables = { password, newPassword };
      submitForm(variables).then(r=>{
        if (Object.prototype.hasOwnProperty.call(r, "errors")) {
          setErrorText(r.errors[0].message)
        } else {
          setSuccessText(r.data.status);
          setErrorText("");
        }
      })
    }else{
      setErrorText("Please enter same passwords");
      setSuccessText('');
    }
  };

  return (
    <React.Fragment>
      <Base title="Change Password" {...props}>
        <TitleBar routes={routes} title="Change Password" />
        <div className="p-4">
          {!isLoading ?
            <form
              className="form-group"
              onSubmit={e => {
                setLoaded(true);
                changePassword();
                e.preventDefault();
              }}>
              <div className="page-container">
                <div className="row m-0">
                  <div className="col-md-4">
                    <label>Password</label>
                    <div className="m-2">
                      <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        className="form-control"
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label>New Password</label>
                    <div className="m-2">
                      <input
                        type="password"
                        placeholder="Enter New Password"
                        name="password"
                        className="form-control"
                        onChange={e => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label>Confirm Password</label>
                    <div className="m-2">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password"
                        className="form-control"
                        onChange={e => setVerifyPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right m-3">
                  <button
                    type="submit"
                    className="button btn ant-btn-primary"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </form>
            :
            <div>
              {
                success!== '' ? (
                    <Result
                      status="success"
                      title="Successfully changed your password"
                      extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
                    />
                  ) : error!== '' ?
                    <div className="alert alert-danger m-4">{error}</div>:
                    <div className="alert alert-warning m-4">Submitting. Please Wait</div>
              }
            </div>
          }
        </div>
      </Base>
    </React.Fragment>
  );
};

export default ChangePassword;
