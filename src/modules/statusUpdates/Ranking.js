import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import { Card, Elevation, Colors, Tab, Tabs, Icon } from '@blueprintjs/core';
import { List, Avatar } from 'antd';
import 'antd/dist/antd.css';
import dataFetch from '../../utils/dataFetch';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

const Rankings = ({ isRangeSet, startDate, endDate }) => {
  const [memberData, setMemberData] = useState([]);
  const [hasLoaded, setLoaded] = useState(false);

  const prevStart = useRef();
  const prevEnd = useRef();

  const query = `query($startDate: Date!, $endDate: Date){
    clubStatusUpdate(startDate: $startDate, endDate: $endDate)
    {
      memberStats
      {
        user
        {
          username
          firstName
          lastName
          avatar 
          {
             githubUsername
          }
        }
       statusCount
      }
    }
  }`;

  const fetchData = async variables => dataFetch({ query, variables });

  const fetchRankings = () => {
    const variables = {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    };
    fetchData(variables).then(r => {
      setMemberData(r.data.clubStatusUpdate.memberStats);
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
            <h3
              className={classnames(
                !hasLoaded ? 'bp3-skeleton d-inline' : null,
              )}
            >
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
                  !hasLoaded ? 'bp3-skeleton d-inline-block' : null,
                )}
              >
                Some Person's Name
              </h5>
            }
            description={
              <div
                className={classnames(
                  !hasLoaded ? 'bp3-skeleton d-inline-block' : null,
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

  const memberCard = members => (
    <List
      itemLayout="horizontal"
      dataSource={members}
      loading={!hasLoaded}
      renderItem={m => (
        <List.Item extra={<h3>{m.statusCount}</h3>}>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://avatars.githubusercontent.com/${m.user.avatar.githubUsername}`}
              />
            }
            title={
              <h4
                className={classnames(!hasLoaded ? 'bp3-skeleton mb-2' : 'mb-0')}
              >
                <a href={`/@${m.user.username}`}>
                  {m.user.firstName} {m.user.lastName}
                </a>
              </h4>
            }
          />
        </List.Item>
      )}
    />
  );

  return (
    <Card elevation={Elevation.TWO}>
      <h5
        className="mb-4 bp3-heading"
        style={{ color: Colors.BLUE3 }}
      >
        <Icon icon="crown" className="mr-2 mb-1" />
        Member Rankings
      </h5>
      <Tabs id="memberRankTabs">
        <Tab
          id="mostInLab"
          title={<h6>Top 5</h6>}
          panel={
            hasLoaded ? memberCard(memberData.slice(0, 5)) : loadingCards()
          }
        />
        <Tab
          id="worstInLab"
          title={<h6>Worst 5</h6>}
          panel={
            hasLoaded
              ? memberCard(memberData.slice().reverse().slice(0, 5))
              : loadingCards()
          }
        />
      </Tabs>
    </Card>
  );
};

export default Rankings;
