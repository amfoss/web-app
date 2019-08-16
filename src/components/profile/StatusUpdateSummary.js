import React from 'react';
import { Card } from '@blueprintjs/core';

import { ResponsiveCalendar } from '@nivo/calendar';
import {data} from "./data";


class StatusUpdateSummary extends React.Component{
  render() {
    return (
      <Card elevation="2" style={{ margin: 0 }}>
        <div className="row">
          <div className="col-md-8">
            <div className="Calendar" style={{ height: 250 }}>
              <ResponsiveCalendar
                data={data}
                from="2015-03-01"
                to="2015-07-12"
                emptyColor="#eeeeee"
                colors={['#4caf50', '#f44336']}
                margin={{
                  top: 100,
                  right: 30,
                  bottom: 60,
                  left: 30,
                }}
                yearSpacing={60}
                monthBorderColor="#ffffff"
                monthLegendOffset={10}
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 34,
                    itemHeight: 36,
                    itemDirection: 'top-to-bottom',
                  },
                ]}
              />
            </div>
          </div>
          <div className="col-md-4">
            <h1>Misses</h1>
          </div>
        </div>
      </Card>
    );
  }
}

export default StatusUpdateSummary
