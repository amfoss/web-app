import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  Card,
  Popover,
  Tag,
  Elevation,
  PopoverInteractionKind,
  Position,
} from '@blueprintjs/core';
import { DateRangePicker } from '@blueprintjs/datetime';
import { IconNames } from '@blueprintjs/icons';
import { ResponsiveLine } from '@nivo/line';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import dataFetch from '../../../utils/dataFetch';
const moment = extendMoment(Moment);

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
        const respData = r.data.clubAttendance.dailyLog.map(r => ({
          x: r.date,
          y: r.membersPresent,
        }));
        setData(respData);
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
    <Card elevation={Elevation.TWO}>
      <h2 className={classnames(!isLoaded ? 'bp3-skeleton' : null)}>
        Attendance Overview
      </h2>
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
          <Tag
            rightIcon={IconNames.CALENDAR}
            minimal={true}
            round={true}
            large={true}
          >
            <div>
              {moment(startDate).format('DD-MM-YYYY')} -{' '}
              {moment(endDate).format('DD-MM-YYYY')}
            </div>
          </Tag>
        }
      />
      <div
        className={classnames(!isLoaded ? 'bp3-skeleton' : null)}
        style={{ width: '100%', height: '25vh', padding: '5px' }}
      >
        <ResponsiveLine
          data={[
            {
              id: 'attendanceOverview',
              data,
            },
          ]}
          margin={{ top: 20, right: 20, bottom: 20, left: 30 }}
        />
      </div>
    </Card>
  );
};

export default Overview;
