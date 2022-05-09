import React, { useState, useEffect } from 'react';
import { marked } from "marked";

// antd components
import Card from 'antd/lib/card';
import Menu from 'antd/lib/menu';

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
const Viewlist = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://gitlab.com/api/v4/projects/20528933/repository/files/2020%2fadvaith.md/raw?private_token=glpat-TA_ZW_66kKtazaexHVCu&ref=master')
    .then(response => response.text())
    .then(data => setData(marked.parse(data)))
  },[])

  return (
    <Base title="View list" {...props}>
      <TitleBar
        routes={routes}
        title="View Bucketlist"
      />
      <article dangerouslySetInnerHTML={{__html: data}}></article>
    </Base>
  );
};

export default Viewlist;
