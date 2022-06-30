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
      <div className="graph">
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
      responsive: true,
      plugins: {
        legend: {
          labels: {
            // This more specific font property overrides the global property
            font: {
                size: 19,
                color: "red",
            }
        }
        },
        title: {
          display: true,
          text: 'Måltavlen',
        },
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