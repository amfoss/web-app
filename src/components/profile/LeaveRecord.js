import React from 'react';
import {Card} from "@blueprintjs/core";

class LeaveRecord extends React.Component{
  render() {
    return (
      <Card elevation="2" style={{ margin: 0 }}>
        <div className="row">
          <div className="col-md-8">
            <h1>Top 5 Leave Reasons</h1>
            <div className="details p-4">
              <h3>1. Home(2)</h3>
              <h3>2. Health</h3>
              <h3>3. Academics(2)</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row leaverecord">
              <div className="col-md-3">
                <h1>4</h1>
              </div>
              <div className="col-md-4 p-4">
                <div className="row">
                  <h3>Leaves</h3>
                </div>
                <div className="row">
                  <h3>Taken</h3>
                </div>
                <div className="row">
                  <h6>in last month</h6>
                </div>
              </div>
            </div>
            <div className="row p-3">
              <h2>0 Labs Bunked</h2>
            </div>
            <div className="row p-3">
              <h2>5 Times Late Comer</h2>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default LeaveRecord
