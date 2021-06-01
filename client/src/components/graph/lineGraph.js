import React from 'react';
import {Line} from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'; 
import './graph.css';

export default class LineSample extends React.Component {
  render() {
    console.log(defaults.line);
    defaults.line.fontColor = "#FFF";
    var data = this.getData();
    return (
      <div className="graph">
        <Line data={data} />
      </div>
    );
}
    getData = () => {
      return {
        labels: this.props.labels,
        datasets: this.getDataSets()
      }
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
