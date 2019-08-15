import React from 'react';
import { Button, Card, FormGroup, InputGroup } from '@blueprintjs/core';
import { DateInput } from "@blueprintjs/datetime";

class AdditionalDetails extends React.Component{
  render(){
    return (
      <Card elevation="2">
        <h1>Additional Details</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="row">
            <div className="col-md-3">
              <FormGroup label="Roll No" labelFor="text-input" labelInfo="(required)">
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
              <FormGroup label="Location" labelFor="text-input" labelInfo="(required)">
                <InputGroup placeholder="Enter your Location" />
              </FormGroup>
            </div>
            <div className="col-md-3 p-4">
              <FormGroup label="Birthday" labelFor="text-input" labelInfo="(required)">
                <DateInput
                  inputProps={{ leftIcon: "calendar" }}
                  formatDate={date => date.toLocaleString()}
                  parseDate={str => new Date(str)}
                  placeholder={"DD/MM/YYYY"}
                />
              </FormGroup>
            </div>
          </div>
          <Button type="submit" intent="primary" text="Save" />
        </form>
      </Card>
    )
  }
}

export default AdditionalDetails
