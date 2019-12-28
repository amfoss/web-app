import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {Card, Colors, Elevation, HTMLSelect, Icon} from '@blueprintjs/core';
import {
  Chart,
  Geom,
  Axis,
  Tooltip
} from "bizcharts";

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const TrendGraph = ({ isLoaded, data }) => {
  const [type, setType] = useState('attendee');

  const attPoints = {
    key: 0,
    id: 'attendanceTrend',
    data: data.map(r => ({
      x: r.date,
      y: r.membersPresent,
    })),
  };

  const durPoints = {
    key: 0,
    id: 'durationTrend',
    data: data.map(r => ({
      x: r.date,
      y: moment
        .duration(r.avgDuration)
        .asHours()
        .toFixed(2),
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
            Attendance Trends
          </h5>
        </div>
        <div className="col text-right">
          <HTMLSelect
            onChange={e => setType(e.currentTarget.value)}
            iconProps={null}
            minimal
            large
          >
            <option value="attendee" selected>
              By Members Present
            </option>
            <option value="duration">By Avg. Duration</option>
          </HTMLSelect>
        </div>
      </div>
      <div
        className={classnames(!isLoaded ? 'bp3-skeleton' : null)}
        style={{ width: '100%', height: '50vh', padding: '5px' }}
      >
        {isLoaded ? (
          <Chart height={400} data={type === 'attendee' ? attPoints.data: durPoints.data} forceFit>
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

export default TrendGraph;
