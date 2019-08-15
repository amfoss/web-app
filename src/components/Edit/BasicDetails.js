import React from 'react';
import { Button, Card, FormGroup, InputGroup } from '@blueprintjs/core';

class BasicDetails extends React.Component{
  render(){
    return (
      <Card elevation="2">
        <h1>Basic Details</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="row">
            <div className="col-md-3">
              <FormGroup label="FirstName" labelFor="text-input" labelInfo="(required)">
                <InputGroup placeholder="Enter your Firstname" />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="LastName" labelFor="text-input">
                <InputGroup placeholder="Enter your Lastname" />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <FormGroup label="Email" labelFor="text-input" labelInfo="(required)">
                <InputGroup placeholder="Enter your Email" />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Phone Number" labelFor="text-input" labelInfo="(required)">
                <InputGroup placeholder="Enter your Phone Number" />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <FormGroup label="Telegram ID" labelFor="text-input" labelInfo="(required)">
                <InputGroup placeholder="Telegram ID" />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Gender" labelInfo="(required)">
                <select style={{padding: 4 , width: '46vh'}}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="other">other</option>
                </select>
              </FormGroup>
            </div>
          </div>
          <Button type="submit" intent="primary" text="Save" />
        </form>
      </Card>
    )
  }
}

export default BasicDetails
