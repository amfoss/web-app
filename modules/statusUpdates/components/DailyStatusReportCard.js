import React from 'react';
import PropTypes from 'prop-types';

// antd components
import Card from 'antd/lib/card';
import List from 'antd/lib/list';
import Avatar from 'antd/lib/avatar';
import Badge from 'antd/lib/badge';
import Tabs from 'antd/lib/tabs';

const { TabPane } = Tabs;

const DailyStatusReportCard = ({ data, isLoaded }) => {
  const membersCard = (members) => (
    <List
      grid={{ gutter: 16, column: 1, sm: 2, md: 3, lg: 4 }}
      dataSource={members}
      locale={{ emptyText: 'No member sent update.' }}
      renderItem={(m) => (
        <List.Item>
          <Card>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    m.member.profile.profilePic
                      ? `https://api.amfoss.in/${m.member.profile.profilePic}`
                      : `https://avatars.githubusercontent.com/${m.member.avatar.githubUsername}`
                  }
                />
              }
              title={
                <a href={`/@${m.member.username}`}>
                  <b>{m.member.fullName}</b>
                </a>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <div className="listing-tabs">
      <Tabs defaultActiveKey="1" size="large" type="line">
        <TabPane
          key={1}
          tab={
            <h6 className="p-2 m-0">
              Sent
              <Badge
                count={isLoaded ? data.membersSent.length : null}
                style={{ margin: '0.5rem', backgroundColor: 'green' }}
              />
            </h6>
          }
        >
          {isLoaded ? membersCard(data.membersSent, 'sent') : null}
        </TabPane>
        <TabPane
          key={2}
          id="absentToday"
          tab={
            <h6 className="p-2 m-0">
              Did Not Send
              <Badge
                count={isLoaded ? data.memberDidNotSend.length : null}
                style={{ margin: '0.5rem', backgroundColor: 'red' }}
              />
            </h6>
          }
        >
          {isLoaded ? membersCard(data.memberDidNotSend, 'didNotSend') : null}
        </TabPane>
      </Tabs>
    </div>
  );
};

DailyStatusReportCard.propTypes = {
  data: PropTypes.object,
  isLoaded: PropTypes.bool,
};

export default DailyStatusReportCard;
