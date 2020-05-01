import React from 'react';
import classnames from 'classnames';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// antd components
import Card from 'antd/lib/card';

const StatusGraph = ({ isLoaded, dailyLogData }) => {
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

  const x = [];
  const y = [];
  dailyLogData.map((r) => {
    x.push(r.date);
    y.push(r.membersSentCount);
  });
  let statusGraph = {
    data: (canvas) => {
      let ctx = canvas.getContext('2d');

      let gradientStroke = ctx.createLinearGradient(0, 2300, 0, 50);

      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

      return {
        labels: x,
        datasets: [
          {
            label: 'Status Graph',
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
            data: y,
          },
        ],
      };
    },
  };

  return (
    <Card>
      <div className="row m-0">
        <div className="col-md-8">
          <h5 className="mb-4 bp3-heading">Status Trends</h5>
        </div>
      </div>
      <div
        className={classnames(!isLoaded ? 'bp3-skeleton' : null)}
        style={{ width: '100%', height: '50vh', padding: '5px' }}
      >
        {isLoaded ? <Line data={statusGraph.data} options={options} /> : null}
      </div>
    </Card>
  );
};

StatusGraph.propTypes = {
  isLoaded: PropTypes.bool,
  dailyLogData: PropTypes.array,
};

export default StatusGraph;
