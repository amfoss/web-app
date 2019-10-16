import React from 'react';
import TitleBar from '../../components/titlebar';
import Base from '../Base';
import StreamList from '../../components/dashboard/StreamList';

const TasksDashboard = props => {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/',
      name: 'Tasks',
    },
  ];

  return (
    <Base title="Tasks Dashboard" {...props}>
      <TitleBar routes={routes} title="Tasks Dashboard" />
      <div className="container">
        <StreamList type="T" hasParent={false} />
      </div>
    </Base>
  );
};

export default TasksDashboard;
