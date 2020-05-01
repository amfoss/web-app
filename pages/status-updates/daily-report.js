import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

// antd components
import DatePicker from 'antd/lib/date-picker';

import Base from '../../components/base';
import DailyStatusReportCard from '../../modules/statusUpdates/components/DailyStatusReportCard';
import dataFetch from '../../utils/dataFetch';
import TitleBar from '../../components/titlebar';

const moment = extendMoment(Moment);

const DailyStatusReport = (props) => {
  const [data, setData] = useState('');
  const [date, setDate] = useState(
    moment().subtract(1, 'days').format('YYYY-MM-DD')
  );
  const [isLoaded, setLoaded] = useState(false);

  const query = `query($date:Date!){
  dailyStatusUpdates(date:$date){
    date
    membersSent{
      member{
        username
        fullName
        statusUpdateCount
        profile{
          profilePic
        }
        avatar{
          githubUsername
        }
      }
    }
    memberDidNotSend{
      member{
        username
        fullName
        statusUpdateCount
        profile{
          profilePic
        }
        avatar{
          githubUsername
        }
      }
    }
  }
}`;

  const fetchData = async (variables) => dataFetch({ query, variables });

  useEffect(() => {
    if (!isLoaded) {
      fetchData({ date }).then((r) => {
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
      <TitleBar
        routes={routes}
        title="Daily Report"
        subTitle="View daily status update report of club members"
      />
      <div className="row m-0">
        <div className="col-md-10 p-2" />
        <div className="col p-2">
          <DatePicker
            size="large"
            onChange={(e) => {
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
