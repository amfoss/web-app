import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  Card,
  Popover,
  Colors,
  Tag,
  Elevation,
  PopoverInteractionKind,
  Position,
  Tabs,
  Tab,
  ButtonGroup,
  Button,
} from '@blueprintjs/core';
import { DateRangePicker } from '@blueprintjs/datetime';
import { IconNames } from '@blueprintjs/icons';
import { ResponsiveLine } from '@nivo/line';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import dataFetch from '../../../utils/dataFetch';
const moment = extendMoment(Moment);

import Rankings from './Rankings';
import TrendGraph from './TrendGraph';

const Overview = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [rangeLoaded, setRangeLoaded] = useState(false);
  const [isLoaded, setLoaded] = useState(false);

  const query = `query($startDate: Date!, $endDate: Date){
    clubAttendance(startDate: $startDate, endDate: $endDate)
    {
      dailyLog
      {
        date
        membersPresent
        avgDuration
      }
    }
  }`;

  const fetchData = async variables => dataFetch({ query, variables });

  useEffect(() => {
    if (!rangeLoaded) {
      setStartDate(
        new Date(
          moment()
            .subtract('weeks', 1)
            .format('YYYY-MM-DD'),
        ),
      );
      setRangeLoaded(true);
    }
    if (!isLoaded && rangeLoaded) {
      const variables = {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      };
      fetchData(variables).then(r => {
        setData(r.data.clubAttendance.dailyLog);
        setLoaded(true);
      });
    }
  });

  const handleRangeChange = obj => {
    if (obj[0] != null && obj[1] != null) {
      setStartDate(obj[0]);
      setEndDate(obj[1]);
      setLoaded(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mx-2">
        <h2>Attendance Report</h2>
        <Popover
          className={classnames(!isLoaded ? 'bp3-skeleton' : null)}
          interactionKind={PopoverInteractionKind.CLICK}
          position={Position.BOTTOM_RIGHT}
          usePortal={false}
          content={
            <DateRangePicker
              defaultValue={[
                new Date(
                  moment()
                    .subtract('weeks', 1)
                    .format('YYYY-MM-DD'),
                ),
                new Date(),
              ]}
              onChange={obj => handleRangeChange(obj)}
              maxDate={new Date()}
            />
          }
          target={
            <Button icon={IconNames.CALENDAR} round large>
              {moment(startDate).format('DD-MM-YYYY')} -{' '}
              {moment(endDate).format('DD-MM-YYYY')}
            </Button>
          }
        />
      </div>
      <div className="row m-0 py-4">
        <div className="col-md-8">
            <TrendGraph data={data} isLoaded={isLoaded} />
        </div>
        <div className="col">
          <Rankings
            isRangeSet={rangeLoaded}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
