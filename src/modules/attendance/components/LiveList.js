import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
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
          avatar {
            githubUsername
          }
        }
      }
      membersAbsent
      {
        count
        members
        {
          firstName
          lastName
          username
          lastSeen
          firstSeenToday
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
              <div>{member.firstSeenToday ? moment(member.firstSeenToday).format('HH:MM') : 'NST'}</div>
            }
          />
        </List.Item>
      )}
    />
  );

  const lateMembers = isLoaded ? data.membersPresent.members.filter(m => {
    if(moment(m.firstSeenToday) > moment().set('hour', 17).set('minute', 15))
      return m;
  }) : null;

  const absentMembers = isLoaded ? data.membersAbsent.members.filter(m => {
    if(m.lastSeen == null || moment(m.lastSeen) < moment().set('hour', 14).set('minute', 0))
      return m;
  }) : null;

  const absentOnlyNow = isLoaded ? data.membersAbsent.members.filter(m => {
    if(m.lastSeen != null && moment(m.lastSeen) > moment().set('hour', 14).set('minute', 0))
      return m;
  }) : null;

  const presentToday = isLoaded ? [...data.membersPresent.members, ...absentOnlyNow] : null;
  console.log(presentToday);


  return (
    <div className="p-4">
      <h2>Daily Report</h2>
      <Card elevation={Elevation.TWO}>
        <Tabs id="LiveAttendanceTab">
          <Tab
            id="present"
            title={
              <h6 className="p-2 m-0">
                Present Now
                <Tag className="mx-2 my-1" minimal large>
                  {isLoaded ? data.membersPresent.count : null}
                </Tag>
              </h6>
            }
            panel={
              isLoaded ? membersCard(data.membersPresent.members) : null
            }
          />
          <Tab
            id="absent"
            title={
              <h6 className="p-2 m-0">
                Present Today
                <Tag className="mx-2 my-1" minimal={true} large={true}>
                  {isLoaded ? presentToday.length : null}
                </Tag>
              </h6>
            }
            panel={
              isLoaded ? membersCard(presentToday) : null
            }
          />
          <Tab
            id="absentToday"
            title={
              <h6 className="p-2 m-0">
                Absent Today
                <Tag className="mx-2 my-1" minimal={true} large={true}>
                  {isLoaded ? absentMembers.length : null}
                </Tag>
              </h6>
            }
            panel={
              isLoaded ? membersCard(absentMembers) : null
            }
          />
          <Tab
            id="late"
            title={
              <h6 className="p-2 m-0">
                Late To Lab
                <Tag className="mx-2 my-1" minimal={true} large={true}>
                  {isLoaded ? lateMembers.length :
                    null}
                </Tag>
              </h6>
            }
            panel={
              isLoaded ? membersCard(lateMembers) : null
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
