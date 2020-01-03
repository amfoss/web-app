import React, { useEffect, useState } from 'react';
import { Input, DatePicker } from 'antd';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import Base from '../Base';

import DailyStatusReportCard from '../../modules/statusUpdates/components/DailyStatusReportCard';

import dataFetch from '../../utils/dataFetch';
import TitleBar from '../../components/titlebar';

const { Search } = Input;

const moment = extendMoment(Moment);

const DailyStatusReport = props => {
  const [data, setData] = useState('');
  const [date, setDate] = useState(moment().subtract('days', 1).format('YYYY-MM-DD'));
  const [isLoaded, setLoaded] = useState(false);

  const query = `query($date:Date!){
  dailyStatusUpdates(date:$date){
    date
    membersSent{
      member{
        username
        fullName
        statusUpdateCount
      }
    }
    memberDidNotSend{
      member{
        username
        fullName
        statusUpdateCount
      }
    }
  }
}`;

  const fetchData = async variables => dataFetch({ query, variables });

  useEffect(() => {
    if (!isLoaded) {
      fetchData({ date }).then(r => {
        setData(r.data.dailyStatusUpdates);
        setLoaded(true);
      });
    }
  });

  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/status-update',
      name: 'Status Update',
    },
    {
      path: '/status-update/daily-report',
      name: 'Daily Report',
    },
  ];

  return (
    <Base title="Daily Report | Status Updates" {...props}>
      <TitleBar routes={routes} title="Daily Report" subTitle="View daily status update report of club members" />
      <div className="row m-0">
        <div className="col-md-6 p-2">
          <Search
            placeholder="Search Members"
            size="large"
            style={{ display: 'inline', maxWidth: '320px' }}
          />
        </div>
        <div className="col p-2">
          <DatePicker
            size="large"
            onChange={e => {
              setLoaded(false);
              setDate(e.format('YYYY-MM-DD'));
            }}
            format="DD-MM-YYYY"
            value={moment(date)}
          />
        </div>
      </div>
      <div className="p-2">
        <DailyStatusReportCard data={data} isLoaded={isLoaded} date={date} />
      </div>
    </Base>
  );
};

export default DailyStatusReport;
