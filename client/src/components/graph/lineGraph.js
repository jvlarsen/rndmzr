import React from 'react';
import {Line} from 'react-chartjs-2';
import './graph.css';

export default class LineSample extends React.Component {
  render() {
    var data = this.getData();
    return (
      <div className="graph">
        <Line data={data} className="graphInternal" />
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
