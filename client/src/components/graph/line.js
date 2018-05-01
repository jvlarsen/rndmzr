import React from 'react';
import {Line} from 'react-chartjs-2';

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

  //Måske skal hele getDatas return værdi flyttes op i state.
  //Så kan der trækkes derfra, og pushed når der oprettes nye deltagere.
  getData = () => { return {
    labels: this.getLabels(),
    datasets: [
        this.getDataSet('Participant 1'),
        this.getDataSet('Participant 2'),
        this.createDataSet('Participant 3'),
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

  createNewData = (participant) => {
    var data = {};
    data.labels = [];
    data.dataSets = this.createDataSet(participant);

    return data;
  }

  createDataSet = (participant) => {
    var dataSet = {
          fill: false,
          lineTension: 0,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointRadius: 1,
          pointHitRadius: 10
        }
    dataSet.label = participant;
    dataSet.data = [1, 2, 3, 6];
    dataSet.borderColor = 'rgba(255, 100, 0, 1)';

    return dataSet;
  }

};
