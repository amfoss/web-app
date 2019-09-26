import React, {useEffect, useState} from 'react';
import SEO from '../components/Seo';
import Topbar from '../components/topbar';
import TitleBar from '../components/titlebar';

import dataFetch from '../utils/dataFetch';
import {clubAttendance as query} from '../utils/queries'
import {Card} from "@blueprintjs/core";

const Attendance = () => {
  const [response, setResponse] = useState('');
  const [date, setDate] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  const clubAttendance = async() => {
    const response = await dataFetch({ query });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      response.data.clubAttendance.dailyLog.map(response => {
        setResponse(response);
      });
      setLoaded(true);
    }else {
      console.log('error');
    }
  };

  useEffect(() => {
    if (!isLoaded) clubAttendance();
  });

  return isLoaded ? (
    <React.Fragment>
      <SEO title="Attendance"/>
      <Topbar/>
      <div className="page-container">
        <TitleBar title="Attendance"/>
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-2">
            <h5>{response.membersPresent} Members Present</h5>
          </div>
          <div className="col-md-2">
            <h5>Date: {response.date}</h5>
          </div>
          <div className="col-md-4">
            <h5>Average Duration: {response.avgDuration}</h5>
          </div>
          <div className="col-md-2" />
        </div>
        <div className="row m-0">
          {response.members.map(member => (
            <div className="col-md-4 col-lg-4 col-xl-3 p-3" key={member.user.username}>
              <Card elevation="1" className="stream-card">
                <h3>{member.user.firstName} {member.user.lastName}</h3>
                <h6>Duration: {member.duration}</h6>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  ):null;
};

export default Attendance;
