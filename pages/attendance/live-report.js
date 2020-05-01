import React, { useEffect, useState } from 'react';

import dataFetch from '../../utils/dataFetch';
import Base from '../../components/base';
import LiveReportCard from '../../modules/attendance/components/LiveReportCard';
import TitleBar from '../../components/titlebar';

const LiveReport = (props) => {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const query = `query{
  liveAttendance{
      membersPresent
      {
        count
        members
        {
          firstName
          lastName
          username
          firstSeenToday
          duration
        }
      }
    }
  }`;

  const fetchData = async () => dataFetch({ query });

  useEffect(() => {
    if (!isLoaded) {
      fetchData().then((r) => {
        setData(r.data.liveAttendance);
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
      path: '/attendance/live-report',
      name: 'Live Attendance',
    },
  ];

  return (
    <Base title="Live Report | Attendance" {...props}>
      <TitleBar
        routes={routes}
        title="Live Report"
        subTitle="View attendance at this moment"
      />
      <LiveReportCard data={data} isLoaded={isLoaded} />
    </Base>
  );
};

export default LiveReport;
