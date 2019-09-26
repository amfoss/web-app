import React, {useEffect, useState} from 'react';
import SEO from '../components/Seo';
import Topbar from '../components/topbar';
import TitleBar from '../components/titlebar';

import dataFetch from '../utils/dataFetch';
import {getAttendance as query} from '../utils/queries'
import {Card} from "@blueprintjs/core";

const Attendance = () => {
  const [users, setUsers] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  const getAttendance = async() => {
    const response = await dataFetch({ query });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      setUsers(response.data.users);
      setLoaded(true);
    }else {
      console.log('error');
    }
  };

  useEffect(() => {
    if (!isLoaded) getAttendance();
  });

  return isLoaded ? (
    <React.Fragment>
      <SEO title="Attendance"/>
      <Topbar/>
      <div className="page-container">
        <TitleBar title="Attendance"/>
        <div className="row m-0">
          {users.map(user => (
            <div className="col-md-4 col-lg-4 col-xl-3 p-3" key={user.username}>
              <Card elevation="1" className="stream-card">
                <h3>{user.firstName} {user.lastName}</h3>
                <h6>Days Present: {user.attendance.daysPresent}</h6>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  ):null;
};

export default Attendance;
