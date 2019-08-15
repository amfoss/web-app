import React from 'react';
import { Tooltip, Button, Card, FormGroup, InputGroup, Callout } from '@blueprintjs/core';

class ResetPassword extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      showPassword: false,
    }
  }
  render() {
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
    return (
      <Card elevation="2" className="login-card">
        <h1>Reset Password</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="col-md-4">
            <FormGroup label="Password" labelFor="text-input" labelInfo="(required)">
              <InputGroup
                placeholder="Enter your username"
                rightElement={lockButton}
                type={this.state.showPassword ? 'text' : 'password'}
              />
            </FormGroup>
            <FormGroup label="New Password" labelFor="text-input" labelInfo="(required)">
              <InputGroup
                placeholder="Enter your new password"
                rightElement={lockButton}
                type={this.state.showPassword ? 'text' : 'password'}
              />
            </FormGroup>
          </div>
          <Button type="submit" intent="primary" text="Login" />
        </form>
      </Card>
    )
  }
}

export default ResetPassword
