import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

// antd components
import DatePicker from 'antd/lib/date-picker';

import dataFetch from '../../../utils/dataFetch';
import Rankings from './Rankings';
import TrendGraph from './TrendGraph';
import TrendAttendanceGraph from './TrendAttendanceGraph';

const { RangePicker } = DatePicker;
const moment = extendMoment(Moment);

const Overview = () => {
  const [data, setData] = useState([]);
  const [memberStats, setMemberStats] = useState([]);
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
      memberStats{
        user{
          username
          admissionYear
        }
        presentCount
      }
    }
  }`;

  const fetchData = async (variables) => dataFetch({ query, variables });

  useEffect(() => {
    if (!rangeLoaded) {
      setStartDate(new Date(moment().subtract(2, 'weeks').format('YYYY-MM-DD')));
      setRangeLoaded(true);
    }
    if (!isLoaded && rangeLoaded) {
      const variables = {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      };
      fetchData(variables).then((r) => {
        setData(r.data.clubAttendance.dailyLog);
        setMemberStats(r.data.clubAttendance.memberStats);
        setLoaded(true);
      });
    }
  });

  const handleRangeChange = (obj) => {
    if (obj[0] != null && obj[1] != null) {
      setStartDate(obj[0]);
      setEndDate(obj[1]);
      setLoaded(false);
    }
  };

  return (
    <div className="p-4">
      <div className="mx-2">
        <div className="row m-0">
          <div className="col text-right">
            <RangePicker
              defaultValue={[
                moment(new Date(), 'YYYY-MM-DD').subtract('weeks', 1),
                moment(new Date(), 'YYYY-MM-DD'),
              ]}
              onChange={handleRangeChange}
            />
          </div>
        </div>
      </div>
      <div className="row m-0">
        <div className="col-md-12 p-2">
          <TrendAttendanceGraph data={memberStats} isLoaded={isLoaded} />
        </div>
        <div className="col-md-8 p-2">
          <TrendGraph data={data} isLoaded={isLoaded} />
        </div>
        <div className="col-md-4 p-2">
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
