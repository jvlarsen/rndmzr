import React from 'react';
import {Line} from 'react-chartjs-2';



export default class LineSample extends React.Component {

  render() {
    var data = this.getData();

    return (
      <div>
        <h2>Game Progress</h2>
        <Line data={data} />
      </div>
    );
}
    getData = () => {

      var fromState = this.props.dataSets;
      console.log(fromState);
      return {
        labels: this.props.labels,
        datasets: this.getDataSets()
      }
    }

    getDataSets = () => {
      var dataSetsProps = this.props.dataSets;
      var newDataSets = [];
      for (var i = 0; i < dataSetsProps.length; i++) {
        newDataSets.push({
          label: dataSetsProps[i].dataset.label,
          fill: false,
          lineTension: 0.1,
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
          data: dataSetsProps[i].dataset.data
        })
      }
      return newDataSets;
    }
  }
