import React, { useEffect, useState } from 'react';
import { Card, Elevation, Tab, Tabs, Tag } from '@blueprintjs/core';

import dataFetch from '../../../utils/dataFetch';

const LiveAttendance = () => {
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
        }
      }
      membersAbsent
      {
        count
        members
        {
          firstName
          lastName
        }
      }
    }
  }`;

  const fetchData = async () => dataFetch({ query });

  useEffect(() => {
    if (!isLoaded) {
      fetchData().then(r => {
        setData(r.data.liveAttendance);
        setLoaded(true);
      });
    }
  });

  return (
    <Card elevation={Elevation.TWO}>
      <h2>Live Attendance</h2>
      <Tabs id="TabsExample">
        <Tab
          id="present"
          title={
            <h5>
              Present
              <Tag className="mx-2 my-1" minimal large>
                {isLoaded ? data.membersPresent.count : null}
              </Tag>
            </h5>
          }
          panel={
            isLoaded
              ? data.membersPresent.members.map(member => {
                  return (
                    <Tag minimal large rounded className="m-2">
                      {member.firstName} {member.lastName}
                    </Tag>
                  );
                })
              : null
          }
        />
        <Tab
          id="absent"
          title={
            <h5>
              Absent
              <Tag className="mx-2 my-1" minimal={true} large={true}>
                {isLoaded ? data.membersAbsent.count : null}
              </Tag>
            </h5>
          }
          panel={
            isLoaded
              ? data.membersAbsent.members.map(member => {
                  return (
                    <Tag minimal large rounded className="m-2">
                      {member.firstName} {member.lastName}
                    </Tag>
                  );
                })
              : null
          }
        />
        <Tabs.Expander />
        <input className="bp3-input" type="text" placeholder="Search..." />
      </Tabs>
    </Card>
  );
};

export default LiveAttendance;
