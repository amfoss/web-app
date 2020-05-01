import React, { useState } from 'react';
import classnames from 'classnames';
import { Line } from 'react-chartjs-2';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import PropTypes from 'prop-types';

// antd components
import Card from 'antd/lib/card';

const moment = extendMoment(Moment);

const TrendGraph = ({ isLoaded, data }) => {
  const [type, setType] = useState('attendee');

  const x = [];
  const y = [];
  data.map((r) => {
    x.push(r.date);
    y.push(r.membersPresent);
  });

  const xdurr = [];
  const ydurr = [];
  data.map((r) => {
    xdurr.push(r.date);
    ydurr.push(moment.duration(r.avgDuration).asHours().toFixed(2));
  });
  let options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: '#f5f5f5',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 12,
      mode: 'nearest',
      intersect: 0,
      position: 'nearest',
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 5,
            padding: 20,
            fontColor: '#9a9a9a',
          },
        },
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#9a9a9a',
          },
        },
      ],
    },
  };

  let AttendanceGraph = {
    data: (canvas) => {
      let ctx = canvas.getContext('2d');

      let gradientStroke = ctx.createLinearGradient(0, 2300, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

      return {
        labels: type === 'attendee' ? x : xdurr,
        datasets: [
          {
            label: 'Attendance Graph',
            fill: true,
            backgroundColor: gradientStroke,
            borderColor: '#1f8ef1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#1f8ef1',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#1f8ef1',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: type === 'attendee' ? y : ydurr,
          },
        ],
      };
    },
  };

  return (
    <Card>
      <div className="row m-0">
        <div className="col-md-8">
          <h5 className="mb-4 bp3-heading">Attendance Trends</h5>
        </div>
        <div className="col text-right p-3">
          <select
            style={{ width: '100%', height: '5vh' }}
            onChange={(e) => setType(e.currentTarget.value)}
          >
            <option value="attendee" selected>
              By Members Present
            </option>
            <option value="duration">By Avg. Duration</option>
          </select>
        </div>
      </div>
      <div
        className={classnames(!isLoaded ? 'bp3-skeleton' : null)}
        style={{ width: '100%', height: '50vh', padding: '5px' }}
      >
        {isLoaded ? <Line data={AttendanceGraph.data} options={options} /> : null}
      </div>
    </Card>
  );
};

TrendGraph.propTypes = {
  data: PropTypes.object,
  isLoaded: PropTypes.bool,
};

export default TrendGraph;
