import React from 'react';
import { Card, List, Avatar, Badge, Tabs } from 'antd';

const { TabPane } = Tabs;

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const DailyReportCard = ({data, isLoaded}) => {
  const membersCard = (members, status) => (
    <List
      grid={{ gutter: 16, column: 1, sm: 2, md: 3, lg: 4 }}
      dataSource={members}
      locale={{ 'emptyText': "No member was found."}}
      renderItem={m => (
          <List.Item>
            <Card>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon="user"
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
    <div className="listing-tabs">
      <Tabs
        defaultActiveKey="1"
        size="large"
        type="line"
      >
        <TabPane
          key={1}
          tab={
            <h6 className="p-2 m-0">
              Present
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
              Absent
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
    </div>
  );
};

export default DailyReportCard;
