import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import Cookies from 'universal-cookie';
import dataFetch from '../../utils/dataFetch';

const cookies = new Cookies();

// antd components
import Card from 'antd/lib/card';

import Base from '../../components/base';
import TitleBar from '../../components/titlebar';

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/bucketlist',
    name: 'Bucketlist',
  },
  {
    path: '/bucketlist/view-list',
    name: 'View Bucketlist',
  },
];

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

const Viewlist = (props) => {
  const [data, setData] = useState([]);
  const [batch, setBatch] = useState(0);
  const [isLoaded, setLoaded] = useState(false);
  const usernameCookie = cookies.get('username');
  const variables = { username: usernameCookie };

  const fetchData = async (variables) => dataFetch({ query, variables });

  fetchData(variables).then((r) => {
    if (!Object.prototype.hasOwnProperty.call(r, 'errors')) {
      setBatch(r.data.user.profile.batch ? r.data.user.profile.batch : null);
      setLoaded(true);
    }
  });

  useEffect(() => {
    fetch(
      `https://gitlab.com/api/v4/projects/20528933/repository/files/${batch}%2f${usernameCookie}.md/raw?private_token=glpat-TA_ZW_66kKtazaexHVCu&ref=master`
    )
      .then((response) => response.text())
      .then((data) => setData(marked.parse(data)));
  }, [batch]);

  return (
    <Base title="View list" {...props}>
      <TitleBar routes={routes} title="View Bucketlist" />
      <div className="m-4">
        <Card loading={!isLoaded} type="inner">
          <div dangerouslySetInnerHTML={{ __html: data }}></div>
        </Card>
      </div>
    </Base>
  );
};

export default Viewlist;
