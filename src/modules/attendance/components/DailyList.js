import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Badge, Tabs, Input, DatePicker } from 'antd';

const { Search } = Input;
const { TabPane } = Tabs;

import dataFetch from '../../../utils/dataFetch';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const DailyList = () => {
  const [data, setData] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
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
      fetchData({date: date}).then(r => {
        setData(r.data.dailyAttendance);
        setLoaded(true);
      });
    }
  });

  const membersCard = (members, status) => (
    <List
      grid={{ gutter: 16, column: 1, md: 3, lg: 4 }}
      dataSource={members}
      locale={{ 'emptyText': "No member was found."}}
      renderItem={m => (
          <List.Item>
            <Card>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://avatars.githubusercontent.com/${m.member.avatar.githubUsername}`}
                />
              }
              title={
                <a href={`/@${m.member.username}`}>
                  <b>
                    {m.member.firstName} {m.member.lastName}
                  </b>
                </a>
              }
              description={
                <div>{
                  status === 'late' ?
                      `${
                          moment.duration(
                            moment(data.date).set('hour', 17).set('minute', 15) - moment(m.firstSeen)
                          ).asMinutes() 
                      }mins late, came to lab at ${moment(m.firstSeen).format("hh:mm")}`
                    : status === 'present' ?
                      m.duration
                    : status === 'absent' ?
                      m.lastSeen ?
                        `Last seen ${moment.duration(moment().diff(m.lastSeen)).humanize()} ago`
                        : 'No previous Record' : null
                }</div>
              }
            />
            </Card>
          </List.Item>
      )}
    />
  );

  const lateMembers = isLoaded ? data.membersPresent.filter(m => {
    if(moment(m.firstSeen) > moment(data.date).set('hour', 17).set('minute', 15))
      return m;
  }) : null;


  return (
    <Card
      title={
        <h4 className="m-0">Daily Report</h4>
      }
      bordered={false}
      style={{ margin: "2rem"}}
    >
      <div className="row m-0">
        <div className="col-md-4 col-lg-3 col-xl-2 p-2">
          <Search
            placeholder="Search Members"
            size="large"
            style={{ display: 'inline', maxWidth: '320px'}}
          />
        </div>
        <div className="col p-2">
          <DatePicker
            size="large"
            onChange={(e) => {
              setLoaded(false);
              setDate(e.format("YYYY-MM-DD"));
            }}
            format="DD-MM-YYYY"
            value={moment(date)}
          />
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        size="large"
        type="line"
      >
        <TabPane
          key={1}
          tab={
            <h6 className="p-2 m-0">
              Members Present
              <Badge
                count={isLoaded ? data.membersPresent.length : null}
                style={{ margin: "0.5rem", backgroundColor: "green"}}
              />
            </h6>
          }>
          { isLoaded ? membersCard(data.membersPresent, 'present') : null }
        </TabPane>
        <TabPane
          key={2}
          id="absentToday"
          tab={
            <h6 className="p-2 m-0">
              Members Absent
              <Badge
                count={isLoaded ? data.membersAbsent.length : null}
                style={{ margin: "0.5rem", backgroundColor: "red"}}
              />
            </h6>
          }>
          { isLoaded ? membersCard(data.membersAbsent, 'absent') : null }
        </TabPane>
        <TabPane
          key={3}
          id="late"
          tab={
            <h6 className="p-2 m-0">
              Late To Lab
              <Badge
                count=  {isLoaded ? lateMembers.length : null}
                style={{ margin: "0.5rem", backgroundColor: "orange"}}
              />
            </h6>
          }
          >
          { isLoaded ? membersCard(lateMembers, 'late') : null }
        </TabPane>
      </Tabs>
      </Card>
  );
};

export default DailyList;
