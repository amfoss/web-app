import React from 'react';
import { Card } from '@blueprintjs/core';

import { ResponsiveCalendar } from '@nivo/calendar';
import {data} from "./data";


class HeatMap extends React.Component{
  render() {
    return (
      <Card elevation="2" style={{ margin: 0 }}>
        <h1>Activity Heatmap</h1>
        <div className="Calendar" style={{ height: 400 }}>
          <ResponsiveCalendar
            data={data}
            from="2015-03-01"
            to="2015-07-12"
            emptyColor="#eeeeee"
            colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
            margin={{
              top: 0,
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
      </Card>
    );
  }
}

export default HeatMap
