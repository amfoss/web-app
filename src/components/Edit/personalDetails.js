import React from 'react';
import { Button, Card, FormGroup, InputGroup, TextArea, FileInput } from '@blueprintjs/core';

class PersonalDetails extends React.Component{
  render(){
    return (
      <Card elevation="2">
        <h1>Personalize</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="row">
            <div className="col-md-3">
              <FormGroup label="Tagline" labelFor="text-input" labelInfo="(required)">
                <InputGroup placeholder="Tagline" />
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Accent Color" labelFor="text-input" labelInfo="(required)">
                <InputGroup placeholder="Accent Color" />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormGroup label="About" labelFor="text-input" labelInfo="(required)">
                <TextArea
                  growVertically={true}
                  large={true}
                  fill
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <FormGroup label="Profile Picture" labelFor="text-input" labelInfo="(required)">
                <FileInput text="Choose file..."/>
              </FormGroup>
            </div>
            <div className="col-md-3">
              <FormGroup label="Cover Picture" labelFor="text-input" labelInfo="(required)">
                <FileInput text="Choose file..."/>
              </FormGroup>
            </div>
          </div>
          <Button type="submit" intent="primary" text="Save" />
        </form>
      </Card>
    )
  }
}

export default PersonalDetails
