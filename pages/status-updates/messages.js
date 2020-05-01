import React, { useEffect, useState } from 'react';
import { extendMoment } from 'moment-range';
import Moment from 'moment';

// antd components
import Card from 'antd/lib/card';
import DatePicker from 'antd/lib/date-picker';
import Avatar from 'antd/lib/avatar';

import Base from '../../components/base';
import dataFetch from '../../utils/dataFetch';
import TitleBar from '../../components/titlebar';

const moment = extendMoment(Moment);
const { Meta } = Card;

const Messages = (props) => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(
    moment().subtract(1, 'days').format('YYYY-MM-DD')
  );
  const [isLoaded, setLoaded] = useState(false);

  const query = `
    query($date: Date!){
      getStatusUpdates(date: $date){
        member{
          username
          fullName
          profile{
            profilePic
          }
          avatar{
            githubUsername
          }
        }
        timestamp
        message
      } 
    }`;

  const fetchData = async (variables) => dataFetch({ query, variables });

  useEffect(() => {
    if (!isLoaded) {
      fetchData({ date }).then((r) => {
        setData(r.data.getStatusUpdates);
        setLoaded(true);
      });
    }
  });

  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/status-updates/dashboard',
      name: 'Status Update',
    },
    {
      path: '/status-updates/messages',
      name: 'Messages',
    },
  ];

  return (
    <Base title="Messages | Status Updates " {...props}>
      <TitleBar
        routes={routes}
        title="Status Update"
        subTitle="View daily status update of club members"
      />
      <DatePicker
        className="mx-4"
        size="large"
        onChange={(e) => {
          setLoaded(false);
          setDate(e.format('YYYY-MM-DD'));
        }}
        format="DD-MM-YYYY"
        value={moment(date)}
      />
      <div className="m-0">
        {data.length > 0 ? (
          data.map((message) => (
            <div className="m-4" key={message}>
              <Card
                loading={!isLoaded}
                type="inner"
                title={
                  <Meta
                    avatar={
                      <Avatar
                        src={
                          message.member.profile.profilePic
                            ? `https://api.amfoss.in/${message.member.profile.profilePic}`
                            : `https://avatars.githubusercontent.com/${message.member.avatar.githubUsername}`
                        }
                      />
                    }
                    title={message.member.fullName}
                  />
                }
              >
                <div dangerouslySetInnerHTML={{ __html: message.message }} />
              </Card>
            </div>
          ))
        ) : (
          <h6 className="text-center ant-list-empty-text">
            Can't find any status updates
          </h6>
        )}
      </div>
    </Base>
  );
};

export default Messages;
