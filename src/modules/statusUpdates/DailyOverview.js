import React, {useEffect, useState} from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';

import dataFetch from '../../utils/dataFetch';
const moment = extendMoment(Moment);

const DailyOverview = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [rangeLoaded, setRangeLoaded] = useState(false);

  const query = `
    query($startDate: Date!, $endDate: Date){
      clubStatusUpdates(startDate:$startDate, endDate:$endDate){
        dailyLog{
          date
          membersSend
          members{
            user{
              username
              avatar{
                githubUsername
              }
            }
          }  
        }
      }
    }`;

  const fetchData = async variables => dataFetch({ query, variables });

  useEffect(() => {
    if (!rangeLoaded) {
      setStartDate(
        new Date(
          moment()
            .format('YYYY-MM-DD'),
        ),
      );
      setRangeLoaded(true);
    }
    if (!isLoaded && rangeLoaded) {
      const variables = {
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      };
      fetchData(variables).then(r => {
        setData(r.data.clubStatusUpdates.dailyLog);
        console.log(r.data.clubStatusUpdates.dailyLog);
        setLoaded(true);
      });
    }
  });
  return (
    <h1>Hello</h1>
  )
};

export default DailyOverview
