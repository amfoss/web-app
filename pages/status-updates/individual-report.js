import React, { useState } from 'react';

// antd components
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Avatar from 'antd/lib/avatar';

import dataFetch from '../../utils/dataFetch';
import Base from '../../components/base';
import TitleBar from '../../components/titlebar';

const { Search } = Input;
const { Meta } = Card;

const IndividualReport = (props) => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  const query = `
    query getMemberStatusUpdates($username: String!){
      getMemberStatusUpdates(username:$username){
        message
        date
        member{
          fullName
          profile{
            profilePic
          }
          avatar{
            githubUsername
          }
        }
      }
    }`;

  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/status-updates/individual-report',
      name: 'Status Update',
    },
  ];

  const fetchData = async (variables) => dataFetch({ query, variables });

  const getMemberUpdates = (username) => {
    setUsername(username);
    const variables = { username };
    fetchData(variables).then((r) => {
      setData(r.data.getMemberStatusUpdates);
      setLoaded(true);
    });
  };

  return (
    <Base title="Individual Report | Status Updates " {...props}>
      <TitleBar
        routes={routes}
        title="Individual Report"
        subTitle="Get individual report of every member"
      />
      <div className="row m-4">
        <div className="col-md-6 p-2">
          <Search
            placeholder="Search Member"
            onSearch={(value) => getMemberUpdates(value.toLowerCase())}
            style={{ width: 350 }}
            enterButton
          />
        </div>
        <div className="col-md-3" />
        {data.length > 0 ? (
          <div className="col-md-3 p-2">
            <b>No of status updates</b>: {data.length}
          </div>
        ) : null}
      </div>
      {data.length > 0 ? (
        data.map((report) => (
          <div className="m-4" key={report}>
            <Card
              loading={!isLoaded}
              type="inner"
              title={
                <Meta
                  avatar={
                    <Avatar
                      src={
                        report.member.profile.profilePic
                          ? `https://api.amfoss.in/${report.member.profile.profilePic}`
                          : `https://avatars.githubusercontent.com/${report.member.avatar.githubUsername}`
                      }
                    />
                  }
                  title={report.member.fullName}
                />
              }
              extra={report.date}
            >
              <div dangerouslySetInnerHTML={{ __html: report.message }} />
            </Card>
          </div>
        ))
      ) : (
        <h6
          className="text-center ant-list-empty-text"
          style={{ marginTop: '30vh' }}
        >
          Type the username to get the report
        </h6>
      )}
    </Base>
  );
};

export default IndividualReport;
