import React from 'react';
import { Card } from '@blueprintjs/core';
import {ResponsiveRadar} from "@nivo/radar";
import {radardata} from "./radardata"

class TasksStatus extends React.Component{
  render() {
    return (
      <Card elevation="2" style={{ margin: 0 }}>
        <div className="row">
          <div className="col-md-4">
            <div className="spider-chart" style={{ height: 300 }}>
              <ResponsiveRadar
                data={radardata}
                keys={['chardonay', 'carmenere', 'syrah']}
                indexBy="taste"
                maxValue="auto"
                margin={{
                  top: 70,
                  right: 80,
                  bottom: 40,
                  left: 80,
                }}
                curve="linearClosed"
                borderWidth={2}
                borderColor={{
                  from: 'color',
                }}
                gridLevels={5}
                gridShape="circular"
                gridLabelOffset={36}
                enableDots
                dotSize={10}
                dotColor={{
                  theme: 'background',
                }}
                dotBorderWidth={2}
                dotBorderColor={{
                  from: 'color',
                }}
                enableDotLabel
                dotLabel="value"
                dotLabelYOffset={-12}
                colors={{
                  scheme: 'nivo',
                }}
                fillOpacity={0.25}
                blendMode="multiply"
                animate
                motionStiffness={90}
                motionDamping={15}
                isInteractive
                legends={[
                  {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000',
                        },
                      },
                    ],
                  },
                ]}
              />
            </div>
            <div className="pl-4">
              <h3>45 Technical</h3>
              <h3>5 Social</h3>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6">
                <h1>Bucket List</h1>
              </div>
              <div className="col-md-4 pt-2">
                <select style={{padding: '1vh'}}>
                  <option>This Semester</option>
                </select>
              </div>
              <div className="p-5">
                <h4 className="p-3"><span className="square">100</span> Self Chosen Tasks</h4>
                <h4 className="p-3"><span className="square">45</span> Assigned Tasks</h4>
                <h4 className="p-3"><span className="square">80</span> Tasks Completed</h4>
                <h4 className="p-3"><span className="square">5</span> Tasks under review</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="light-grey mb-0">
          <div className="green-bar" style={{width:'70%'}}>70% Completed</div>
        </div>
      </Card>
    );
  }
}

export default TasksStatus
