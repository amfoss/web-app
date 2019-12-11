import React, { useEffect, useState, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import '../../styles/calendar.sass';
import moment from 'moment';

import Base from '../Base';
import TitleBar from '../../components/titlebar';
import dataFetch from '../../utils/dataFetch';

const localizer = momentLocalizer(moment);

const ViewCalendar = props => {
  const start = new moment().startOf('month');
  const end = new moment().endOf('month');
  const [data, setData] = useState('');
  const [isLoaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);

  const query = `query getEvent($startDate: Date!, $endDate: Date!){
    viewEvents(startDate: $startDate, endDate: $endDate)
    {
      name
      startTimestamp
      endTimestamp
      isAllDay
    }
  }`;

  const fetchData = async variables => dataFetch({ query, variables });

  const loadData = () => {
    const variables = {
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    };
    fetchData(variables).then(r => {
      setData(r.data.viewEvents);
      setLoaded(true);
    });
  };

  useEffect(() => {
    if (!isLoaded) {
      loadData();
    }
  });

  const events = isLoaded
    ? data.map(o => ({
        title: o.name,
        start: o.startTimestamp,
        end: o.endTimestamp !== null ? o.endTimestamp : o.startTimestamp,
      }))
    : null;

  console.log(events);

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
      path: '/calendar/view-calendar',
      name: 'View Calendar',
    },
  ];

  return (
    <Base title="View Calendar | Calendar" {...props}>
      <TitleBar routes={routes} title="My Calendar" subTitle="View calendar" />
      <div className="p-4">
        {isLoaded ? (
          <Calendar
            localizer={localizer}
            style={{ height: '70vh' }}
            events={events}
            className="event-scheduler"
            onRangeChange={e => console.log(e)}
          />
        ) : null}
      </div>
    </Base>
  );
};

export default ViewCalendar;
