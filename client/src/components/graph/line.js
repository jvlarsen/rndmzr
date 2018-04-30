import React from 'react';
import {Line} from 'react-chartjs-2';

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      if (dataset.label === 'Participant 1') {
        dataset.data.push(data);
      }
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

export default class MyLine extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      labels:[],
      participantGraph: {'Participant 1': {data:[1, 3, 5, 6, 7, 9], graphColor:'rgba(0,0,255,1)'},
                  'Participant 2': {data:[2, 4, 6, 7, 8, 8, 10], graphColor:'rgba(0,255,0,1)'}},
    }
  }

  render() {
    var data = this.getData();
    return (
      <div>
        <Line data={data} id='graph2'/>
      </div>
    );
  }

  getData = () => { return {
    labels: this.getLabels(),
    datasets: [
        this.getDataSet('Participant 1'),
        this.getDataSet('Participant 2'),
    ]
  };
  }

  getLabels = () => {
    return [10, 20, 30, 40, 50, 60, 70, 80, 90, '90+'];
  }

  getDataSet = (participant) => {
    var participantGraph = this.getParticipantGraph(participant);
    return {
      data: participantGraph.data,
      label: 'Participant 1',
      borderColor: participantGraph.graphColor,
      fill: false,
      lineTension: 0,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointRadius: 1,
      pointHitRadius: 10,
    }
  }

  getParticipantGraph = (participant) => {
      var participantGraph = this.state.participantGraph;
      console.log(participantGraph);
      return participantGraph[participant];
  }

};
