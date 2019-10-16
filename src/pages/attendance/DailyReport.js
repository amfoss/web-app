import React, { useEffect, useState } from 'react';
import { Input, DatePicker } from 'antd';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import Base from '../Base';

import DailyReportCard from '../../modules/attendance/components/DailyReportCard';

import dataFetch from '../../utils/dataFetch';
import TitleBar from '../../components/titlebar';

const { Search } = Input;

const moment = extendMoment(Moment);

const DailyReport = props => {
  const [data, setData] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [isLoaded, setLoaded] = useState(false);

  const query = `query($date: Date!){
    dailyAttendance(date: $date)
    {
      date
      membersPresent
      {
        member
        {
          username
          firstName
          lastName
          avatar
          {
             githubUsername
          }
        }
        lastSeen
        firstSeen
        duration
      }
      membersAbsent
      {
        member
        {
          username
          firstName
          lastName
          avatar
          {
             githubUsername
          }
        }
        lastSeen
      }
    }
  }`;

  const fetchData = async variables => dataFetch({ query, variables });

  useEffect(() => {
    if (!isLoaded) {
      fetchData({ date }).then(r => {
        setData(r.data.dailyAttendance);
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
      path: '/attendance',
      name: 'Attendance',
    },
    {
      path: '/attendance/daily-report',
      name: 'Daily Report',
    },
  ];

  return (
    <Base title="Daily Report | Attendance" {...props}>
      <TitleBar routes={routes} title="Daily Report" subTitle="View daily attendance report of club members" />
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
        <DailyReportCard data={data} isLoaded={isLoaded} date={date} />
      </div>
    </Base>
  );
};

export default DailyReport;
