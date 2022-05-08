import React, { useState } from 'react';

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
  const [current, setCurrent] = useState('basic');
  return (
    <Base title="View list" {...props}>
      <TitleBar
        routes={routes}
        title="View Bucketlist"
      />
Hi
    </Base>
  );
};

export default Viewlist;
