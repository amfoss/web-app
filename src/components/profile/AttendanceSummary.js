import React from 'react';
import {Card} from "@blueprintjs/core";
import { ResponsiveLine } from '@nivo/line'
import {graphdata} from './GraphData';

class AttendanceSummary extends React.Component{
  render() {
    return (
      <Card elevation="2" style={{ margin: 0 }}>
        <div className="row">
          <div className="col-md-6">
            <h1>Regulary</h1>
          </div>
          <div className="col-md-6">
            <div  className="lineChart">
              <ResponsiveLine
                data={graphdata}
                margin={{
                  "top": 50,
                  "right": 110,
                  "bottom": 50,
                  "left": 60
                }}
                dotSize={10}
                dotColor="inherit:darker(0.3)"
                dotBorderWidth={2}
                dotBorderColor="#ffffff"
                enableDotLabel={true}
                dotLabel="y"
                dotLabelYOffset={-12}
              />
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

export default AttendanceSummary
