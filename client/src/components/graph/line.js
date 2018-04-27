import React from 'react';
import {Line} from 'react-chartjs-2';



const data = {
  labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  datasets: [
    {
      data: [0, 5, 8, 13, 20, 25, 25, 25, 32, 33, 40, 40, 40, 40, 45],
      label: 'Participant 1',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    },
    {
      data: [0, 20, 20, 20, 40, 42, 48, 55, 62, 75],
      label: 'Participant 2',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(150,100,100,0.4)',
      borderColor: 'rgba(150,100,100,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(150,100,100,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(150,100,100,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    }
  ]
};

export default class MyLine extends React.Component {
  render() {
    return (
      <div>
        <Line data={data} />
      </div>
    );
  }
};
