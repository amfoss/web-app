import React from 'react';
import classnames from 'classnames';
import {Card, Colors, Elevation, Icon} from '@blueprintjs/core';
import {
  Chart,
  Geom,
  Axis,
  Tooltip
} from "bizcharts";

const StatusGraph = ({ isLoaded, dailyLogData }) => {
  const points = {
    key: 0,
    id: 'statusTrend',
    data: dailyLogData.map(r => ({
      x: r.date,
      y: r.membersSentCount,
    })),
  };

  return (
    <Card elevation={Elevation.TWO}>
      <div className="row m-0">
        <div className="col-md-8">
          <h5
            className="mb-4 bp3-heading"
            style={{ color: Colors.BLUE3 }}
          >
            <Icon icon="chart" className="mr-2 mb-1" />
            Status Trends
          </h5>
        </div>
      </div>
      <div
        className={classnames(!isLoaded ? 'bp3-skeleton' : null)}
        style={{ width: '100%', height: '50vh', padding: '5px' }}
      >
        {isLoaded ? (
          <Chart height={400} data={points.data} forceFit>
            <Axis name="x" />
            <Axis name="y" />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom type="line" position="x*y" size={2} />
            <Geom
              type="point"
              position="x*y"
              size={4}
              shape={"circle"}
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
            />
          </Chart>
        ) : null}
      </div>
    </Card>
  );
};

export default StatusGraph;
