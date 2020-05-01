import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import PropTypes from 'prop-types';

// antd components
import Card from 'antd/lib/card';
import List from 'antd/lib/list';
import Avatar from 'antd/lib/avatar';
import Tabs from 'antd/lib/tabs';

import dataFetch from '../../../utils/dataFetch';

const moment = extendMoment(Moment);
const { TabPane } = Tabs;

const Rankings = ({ isRangeSet, startDate, endDate }) => {
  const [memberData, setMemberData] = useState([]);
  const [hasLoaded, setLoaded] = useState(false);

  const prevStart = useRef();
  const prevEnd = useRef();

  const query = `query($startDate: Date!, $endDate: Date){
    clubAttendance(startDate: $startDate, endDate: $endDate)
    {
      memberStats
      {
        user
        {
          username
          firstName
          lastName
          profile{
            profilePic
          }
          avatar 
          {
             githubUsername
          }
        }
        totalDuration
        presentCount
        avgDuration
      }
    }
  }`;

  const fetchData = async (variables) => dataFetch({ query, variables });

  const fetchRankings = () => {
    const variables = {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    };
    fetchData(variables).then((r) => {
      setMemberData(r.data.clubAttendance.memberStats);
      setLoaded(true);
    });
  };

  useEffect(() => {
    if (
      !hasLoaded ||
      prevStart.current !== startDate ||
      (prevEnd.current !== endDate && isRangeSet)
    )
      fetchRankings();
    prevStart.current = startDate;
    prevEnd.current = endDate;
  });

  const loadingCards = () => (
    <List
      itemLayout="horizontal"
      dataSource={[1, 2, 3, 4, 5, 6]}
      renderItem={() => (
        <List.Item
          extra={
            <h3 className={classnames(!hasLoaded ? 'bp3-skeleton d-inline' : null)}>
              00
            </h3>
          }
        >
          <List.Item.Meta
            avatar={
              <Avatar
                className={classnames(!hasLoaded ? 'bp3-skeleton' : null)}
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            }
            title={
              <h5
                className={classnames(
                  !hasLoaded ? 'bp3-skeleton d-inline-block' : null
                )}
              >
                Some Person's Name
              </h5>
            }
            description={
              <div
                className={classnames(
                  !hasLoaded ? 'bp3-skeleton d-inline-block' : null
                )}
              >
                {' '}
                Some Text is there
              </div>
            }
          />
        </List.Item>
      )}
    />
  );

  const memberCard = (members) => (
    <List
      itemLayout="horizontal"
      dataSource={members}
      loading={!hasLoaded}
      renderItem={(m) => (
        <List.Item extra={<h3>{m.presentCount}</h3>}>
          <List.Item.Meta
            avatar={
              <Avatar
                src={
                  m.user.profile.profilePic
                    ? `https://api.amfoss.in/${m.user.profile.profilePic}`
                    : `https://avatars.githubusercontent.com/${m.user.avatar.githubUsername}`
                }
              />
            }
            title={
              <h4 className={classnames(!hasLoaded ? 'bp3-skeleton mb-2' : 'mb-0')}>
                <a href={`/@${m.user.username}`}>
                  {m.user.firstName} {m.user.lastName}
                </a>
              </h4>
            }
            description={
              <React.Fragment>
                <b>Avg:</b> {m.avgDuration} | <b>Total:</b> {m.totalDuration}
              </React.Fragment>
            }
          />
        </List.Item>
      )}
    />
  );

  return (
    <Card>
      <h5 className="mb-4 bp3-heading">Member Rankings</h5>
      <Tabs id="memberRankTabs" defaultActiveKey="1">
        <TabPane tab={<h6>Top 5</h6>} key="1">
          {hasLoaded ? memberCard(memberData.slice(0, 5)) : loadingCards()}
        </TabPane>
        <TabPane tab={<h6>Worst 5</h6>} key="2">
          {hasLoaded
            ? memberCard(memberData.slice().reverse().slice(0, 5))
            : loadingCards()}
        </TabPane>
      </Tabs>
    </Card>
  );
};

Rankings.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  isRangeSet: PropTypes.bool,
};

export default Rankings;
