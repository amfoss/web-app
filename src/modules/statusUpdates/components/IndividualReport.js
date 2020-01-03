import React, {useEffect, useState} from 'react'

import dataFetch from '../../../utils/dataFetch';
import Base from "../../../pages/Base";
import TitleBar from "../../../components/titlebar";
import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta";
import { Input } from 'antd';

const { Search } = Input;

const IndividualReport = props => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("harshith");
  const [isLoaded, setLoaded] = useState(false);

  const query = `
    query getMemberStatusUpdates($username: String!){
      getMemberStatusUpdates(username:$username){
        message
        date
        member{
          fullName
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
    }
  ];

  const fetchData = async variables => dataFetch({ query, variables });

  const getMemberUpdates = (username) => {
    setUsername(username);
    const variables = {username};
    fetchData(variables).then(r => {
      setData(r.data.getMemberStatusUpdates);
      setLoaded(true)
    });
  };

  return (
    <Base title="Individual Report | Status Updates " {...props}>
      <TitleBar routes={routes} title="Individual Report" subTitle="Get individual report of every member" />
      <div className="row m-4">
        <div className="col-md-6 p-2">
          <Search
            placeholder="Search Members"
            size="large"
            style={{ display: 'inline', maxWidth: '320px' }}
            onChange={e => getMemberUpdates(e.target.value.toLowerCase())}
          />
        </div>
        <div className="col-md-3" />
        {data.length > 0 ? <div className="col-md-3 p-2"><b>No of status updates</b>: {data.length}</div>: null }
      </div>
      {data.length > 0 ? data.map(report => (
        <div className="m-4">
          <Card
            loading={!isLoaded}
            type="inner"
            title={<Meta
              avatar={
                <Avatar
                  src={`https://avatars.githubusercontent.com/${report.member.avatar.githubUsername}`}
                />
              }
              title={report.member.fullName}
            />}
            extra={report.date}
          >
            <div dangerouslySetInnerHTML={{__html: report.message}} />
          </Card>
        </div>
      )): <h6 className="text-center ant-list-empty-text" style={{marginTop: '30vh'}}>Type the username to get the report</h6> }
    </Base>
  )
};

export default IndividualReport
