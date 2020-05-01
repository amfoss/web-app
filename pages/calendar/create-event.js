import React from 'react';

import TitleBar from '../../components/titlebar';
import Base from '../../components/base';
import EventForm from '../../components/event/eventForm';

const CreateEvent = (props) => {
  const routes = [
    {
      path: '/',
      name: 'Home',
    },
    {
      path: '/calendar',
      name: 'Calendar',
    },
    {
      path: '/calendar/create-event',
      name: 'Create Event',
    },
  ];
  return (
    <Base title="Create Event | Calendar" {...props}>
      <TitleBar routes={routes} title="Event" subTitle="Create Event" />
      <EventForm />
    </Base>
  );
};

export default CreateEvent;
