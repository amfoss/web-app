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
    path: '/bucketlist/update-list',
    name: 'Update Bucketlist',
  },
];
const Updatelist = (props) => {
  const [current, setCurrent] = useState('basic');
  return (
    <Base title="Update list" {...props}>
      <TitleBar
        routes={routes}
        title="Update Bucketlist"
      />
Update
    </Base>
  );
};

export default Updatelist;
