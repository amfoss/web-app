import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {Card, Colors, Elevation, HTMLSelect, Icon} from '@blueprintjs/core';
import { ResponsiveLine } from '@nivo/line';

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
          <ResponsiveLine
            data={[type === 'attendee' ? attPoints : durPoints]}
            margin={{ top: 20, right: 20, bottom: 20, left: 30 }}
          />
        ) : null}
      </div>
    </Card>
  );
};

export default TrendGraph;
