import React, { useState } from 'react';
import classnames from 'classnames';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// antd components
import Card from 'antd/lib/card';

const TrendAttendanceGraph = ({ isLoaded, data }) => {
  const x2019 = [];
  const y2019 = [];
  const x2018 = [];
  const y2018 = [];
  const x2017 = [];
  const y2017 = [];
  const x2016 = [];
  const y2016 = [];

  data.map((d) => {
    if (d.user.admissionYear === 2019) {
      x2019.push(d.presentCount);
      y2019.push(d.user.username);
    } else if (d.user.admissionYear === 2018) {
      x2018.push(d.presentCount);
      y2018.push(d.user.username);
    } else if (d.user.admissionYear === 2017) {
      x2017.push(d.presentCount);
      y2017.push(d.user.username);
    } else {
      x2016.push(d.presentCount);
      y2016.push(d.user.username);
    }
  });
  const [year, setYear] = useState('2019');
  let graph = {
    data: (canvas) => {
      let ctx = canvas.getContext('2d');

      let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)');

      return {
        labels:
          year === '2019'
            ? y2019
            : year === '2018'
            ? y2018
            : year === '2017'
            ? y2017
            : y2016,
        datasets: [
          {
            label: 'Present Count',
            fill: true,
            backgroundColor: '#1f8ef1',
            hoverBackgroundColor: gradientStroke,
            borderColor: '#1f8ef1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data:
              year === '2019'
                ? x2019
                : year === '2018'
                ? x2018
                : year === '2017'
                ? x2017
                : x2016,
          },
        ],
      };
    },
    options: {
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
            gridLines: {
              drawBorder: false,
              color: 'rgba(225,78,202,0.1)',
              zeroLineColor: 'transparent',
            },
            ticks: {
              padding: 20,
              fontColor: '#9e9e9e',
            },
          },
        ],
      },
    },
  };
  return (
    <Card>
      <div className="row m-0">
        <div className="col-md-10">
          <h5 className="mb-4 bp3-heading">Member Attendance Trends</h5>
        </div>
        <div className="col text-right p-3">
          <select
            style={{ width: '100%', height: '4vh' }}
            onChange={(e) => setYear(e.currentTarget.value)}
          >
            <option value="2019" selected>
              2019
            </option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
          </select>
        </div>
      </div>
      <div
        className={classnames(!isLoaded ? 'bp3-skeleton' : null)}
        style={{ padding: '5px', width: '100%', height: '50vh' }}
      >
        {isLoaded ? <Bar data={graph.data} options={graph.options} /> : null}
      </div>
    </Card>
  );
};

TrendAttendanceGraph.propTypes = {
  isLoaded: PropTypes.bool,
  data: PropTypes.object,
};

export default TrendAttendanceGraph;
