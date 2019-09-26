import React, {useEffect, useState} from 'react';
import { Card } from '@blueprintjs/core';

import { ResponsiveCalendar } from '@nivo/calendar';
import dataFetch from "../../utils/dataFetch";
import {userAttendance as query} from "../../utils/queries";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const HeatMap = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [data, setData] = useState('');
  const array = [];

  const userAttendance = async() => {
    const username = cookies.get('username');
    const variables = { username };
    const response = await dataFetch({ query, variables });
    if (!Object.prototype.hasOwnProperty.call(response, 'errors')) {
      response.data.user.attendance.dailyLog.map(user => {
        const userObj = {day: user.date, value: user.duration};
        array.push(userObj);
        setData(array);
      });
      setLoaded(true);
    }else {
      console.log('error');
    }
  };

  useEffect(() => {
    if (!isLoaded) userAttendance();
  });

  return isLoaded ?(
    <Card elevation="2" style={{ margin: 0 }}>
      <h1>Activity Heatmap</h1>
      <div className="Calendar" style={{ height: 400 }}>
        <ResponsiveCalendar
          data={data}
          from="2019-01-01"
          to="2019-12-31"
          emptyColor="#eeeeee"
          colors={['#c6e48b','#7bc96f','#239a3b', '#196127']}
          margin={{
            top: 0,
            right: 30,
            bottom: 60,
            left: 30,
          }}
          yearSpacing={60}
          monthBorderColor="#ffffff"
          monthLegendOffset={10}
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 36,
              itemCount: 4,
              itemWidth: 34,
              itemHeight: 36,
              itemDirection: 'top-to-bottom',
            },
          ]}
        />
      </div>
    </Card>
  ):null
};

export default HeatMap
