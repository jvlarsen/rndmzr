import React from 'react';
import {Line} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'; 
import './graph.css';



export default class LineSample extends React.Component {
  render() {
    defaults.line.fontColor = "#FFF";
    var data = this.getData();
    var options = this.getOptions();
    return (
      <div className="graph" >
        <Line data={data} options={options} />
      </div>
    );
}
    getData = () => {
      return {
        labels: this.props.labels,
        datasets: this.getDataSets()
      }
    }

    getOptions = () => {
    return {
      legend: {
        labels: {
            fontColor: "black",
            fontSize: 18
        }
    },
      responsive: true,
        scales: {
          yAxes: [{
              ticks: {
                  fontColor: "black",
                  fontSize: 18,
                  stepSize: 1,
                  beginAtZero: true,
              }
          }],
          xAxes: [{
              ticks: {
                  fontColor: "black",
                  fontSize: 14,
                  stepSize: 1,
                  beginAtZero: true,
              }
          }]
      },
        title: {
          display: true,
          text: 'MÅLTAVLEN',
          fontColor: "red",
          fontSize: 24,
        },
    };
  }

    getDataSets = () => {
      var dataSetsProps = this.props.dataSets;
      var newDataSets = [];
      for (var i = 0; i < dataSetsProps.length; i++) {
        newDataSets.push(dataSetsProps[i].dataset)
      }
      return newDataSets;
    }
  }