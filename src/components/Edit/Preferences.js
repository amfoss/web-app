import React from 'react';
import { Card, FormGroup, Switch, ButtonGroup, Button } from '@blueprintjs/core';

class Preferences extends React.Component{
  render() {
    return (
      <Card elevation="2">
        <h1>Preferences</h1>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <FormGroup label="Auto Switch Theme" labelFor="text-input" labelInfo="(required)">
                <Switch large={true}/>
              </FormGroup>
            </div>
            <div className="col-md-4">
              <ButtonGroup>
                <Button>Dark Theme</Button>
                <Button>Light Theme</Button>
              </ButtonGroup>
            </div>
          </div>
        </form>
      </Card>
    )
  }
}

export default Preferences
