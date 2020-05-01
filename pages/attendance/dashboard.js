import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'universal-cookie';

import TitleBar from '../../components/titlebar';
import Base from '../../components/base';
import ActiveStatusBar from '../../modules/attendance/components/ActiveStatusBar';
import dataFetch from '../../utils/dataFetch';

const cookies = new Cookies();

const AttendanceDashboard = (props) => {
  const [isInLab, setIsInLab] = useState(false);
  const [lastSeen, setLastSeen] = useState(false);
  const [membersPresentCount, setMembersPresentCount] = useState(0);

  const [isLoaded, setLoaded] = useState(false);
  const username = cookies.get('username');

  const query = `
  query($username: String!){
      user(username: $username)
      {
        isInLab
        lastSeenInLab
      }
      liveAttendance
      {
        membersPresent
        {
          count
        }
      }
  }`;

  const fetchData = async (variables) => dataFetch({ query, variables });

  useEffect(() => {
    if (!isLoaded) {
      fetchData({ username }).then((r) => {
        setIsInLab(r.data.user.isInLab);
        setLastSeen(r.data.user.lastSeenInLab);
        setMembersPresentCount(r.data.liveAttendance.membersPresent.count);
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
  ];

  return (
    <Base title="Attendance Dashboard" {...props}>
      <TitleBar routes={routes} title="Dashboard" />
      <div className="p-2">
        <ActiveStatusBar
          lastSeen={lastSeen}
          membersPresentCount={membersPresentCount}
          isInLab={isInLab}
        />
        <div className="row m-0">
          <div className="col-md-4 p-2">
            <Link href="/attendance/live-report">
              <a className="menu-card">Live Attendance</a>
            </Link>
          </div>
          <div className="col-md-4 p-2">
            <Link href="/attendance/daily-report">
              <a className="menu-card">Daily Reports</a>
            </Link>
          </div>
          <div className="col-md-4 p-2">
            <Link href="/attendance/individual-report">
              <a className="menu-card">Individual Reports</a>
            </Link>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AttendanceDashboard;
