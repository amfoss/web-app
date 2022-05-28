import React, { useState } from 'react';
import { marked } from "marked";

// antd components
import Card from 'antd/lib/card';
import Input from 'antd/lib/input';
import Avatar from 'antd/lib/avatar';

import dataFetch from '../../utils/dataFetch';
import Base from '../../components/base';
import TitleBar from '../../components/titlebar';

const { Search } = Input;
const { Meta } = Card;

const Report = (props) => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState('');
  const [batch, setBatch] = useState(0);
  const [isLoaded, setLoaded] = useState(false);

  const query = `
  query user($username: String!){
    user(username:$username){
      username
      firstName
      lastName
      email
      profile{
        profilePic
        phone
        about
        roll
        batch
        githubUsername
        gitlabUsername
        telegramUsername
        twitterUsername
        languages{
          name
        }
        links{
          link
          portal{
            name
          }
        }
      }
    }
  }
  `;

  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/bucketlist-tracker/-report',
      name: 'Bucketlist Tracker',
    },
  ];

  const fetchData = async (variables) => dataFetch({ query, variables });

  const getBucketlist = (username) => {
    setUsername(username);
    const variables = { 'username': username };
    fetchData(variables).then((r) => {
      if (!Object.prototype.hasOwnProperty.call(r, 'errors')) {
        setBatch(r.data.user.profile.batch ? r.data.user.profile.batch : null);
        setLoaded(true);
        console.log(batch)
        console.log(username)
      }
    });
    console.log(batch)
    console.log(username)
    fetch(`https://gitlab.com/api/v4/projects/20528933/repository/files/2020%2f${username}.md/raw?private_token=glpat-TA_ZW_66kKtazaexHVCu&ref=master`)
    .then(response => response.text())
    .then(data => setData(marked.parse(data)));
    console.log(data)
  };

  return (
    <Base title=" Report | Bucketlist " {...props}>
      <TitleBar
        routes={routes}
        title=" Bucketlist Tracker"
        subTitle="Get bucketlist and corresponding stats of every member"
      />
        <div className="col-md-6 p-2">
          <Search
            placeholder="Search Member"
            onSearch={(value) => getBucketlist(value)}
            style={{ width: 350 }}
            enterButton
          />
        </div>
        <Card
            loading={!isLoaded}
            type="inner"
          >
            <div dangerouslySetInnerHTML={{__html: data}}></div>
        </Card>
    </Base>
  );
};

export default Report;
