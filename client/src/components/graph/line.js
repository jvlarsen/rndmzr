import React from 'react';
import {Line} from 'react-chartjs-2';

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

const data = {
  labels: [10, 20, 30, 40, 50, 60, 70, 80, 90, '90+'],
  datasets: [
    {
      data: [0, 5, 8, 13, 20, 25, 25, 25, 32, 33, 40, 40, 40, 40, 45],
      label: 'Participant 1',
      fill: false,
      lineTension: 0,
      borderColor: 'rgba(75,192,192,1)',
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointRadius: 1,
      pointHitRadius: 10,
    },
    {
      data: [0, 20, 20, 20, 40, 42, 48, 55, 62, 75],
      label: 'Participant 2',
      fill: false,
      lineTension: 0,
      borderColor: 'rgba(150,100,100,1)',
      pointHoverBackgroundColor: 'rgba(150,100,100,1)',
      pointRadius: 1,
      pointHitRadius: 10,
    }
  ]
};

export default class MyLine extends React.Component {
  render() {
    return (
      <div>
        <Line data={this.props.data} id='graph2'/>
      </div>
    );
  }
};
