import React, { useEffect, useState } from 'react';
import { Card, Elevation, Tab, Tabs, Tag } from '@blueprintjs/core';
import { List, Avatar } from 'antd';

import dataFetch from '../../../utils/dataFetch';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const LiveList = () => {
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
          avatar {
            githubUsername
          }
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

  const membersCard = members => (
    <List
      grid={{ gutter: 16, column: 4, xl: 6 }}
      dataSource={members}
      locale={{ 'emptyText': "No one is identified in FOSSLab right now."}}
      renderItem={member => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://avatars.githubusercontent.com/${member.avatar.githubUsername}`}
              />
            }
            title={
              <a href={`/@${member.username}`}>
                <b>
                  {member.firstName} {member.lastName}
                </b>
              </a>
            }
            description={
              <div>
                <b>Since</b> {moment(member.firstSeenToday).format('HH:mm')} <br/>
                <b>For</b> {member.duration}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );

  return (
    <div className="p-4">
      <h2>Live</h2>
      <Card elevation={Elevation.TWO}>
        <Tabs id="LiveAttendanceTab">
          <Tab
            id="present"
            title={
              <h6 className="p-2 m-0">
                Present Now
                <Tag className="mx-2 my-1" minimal large>
                  {isLoaded && data.membersPresent ? data.membersPresent.count : null}
                </Tag>
              </h6>
            }
            panel={
              isLoaded ? membersCard(data.membersPresent.members) : null
            }
          />
          <Tabs.Expander />
          <input className="bp3-input" type="text" placeholder="Search..." />
        </Tabs>
      </Card>
    </div>
  );
};

export default LiveList;
