import React from 'react';
import {Line} from 'react-chartjs-2';
import DataSetGenerator from './dataSetGenerator';

export default class MyLine extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      labels:[],
      participantNames: this.props.participants,
      participantsGraph: {'Participant 1': {data:[1, 3, 5, 6, 7, 9], graphColor:'rgba(0,0,255,1)'},
                  'Participant 2': {data:[2, 4, 6, 7, 8, 8, 10], graphColor:'rgba(0,255,0,1)'}},
      dataSets: [],
    }
  }

  componentDidUpdate() {
    var participantNames = this.props.participants;
    console.log(participantNames);
  }

  render() {
    var data = this.getData();
    return (
      <div>
        <Line data={data} id='graph2'/>
      </div>
    );
  }

  //Måske skal hele getData's return værdi flyttes op i state.
  //Så kan der trækkes derfra, og pushed når der oprettes nye deltagere.
  getData = () => {
    var graphs = this.state.participantsGraph;
    return {
    labels: this.getLabels(),
    datasets: [
        DataSetGenerator.get('Participant 1', graphs),
        DataSetGenerator.get('Participant 2', graphs),
        DataSetGenerator.create('Participant 3'),
    ]
  };
  }

  getLabels = () => {
    return [10, 20, 30, 40, 50, 60, 70, 80, 90, '90+'];
  }



  createNewData = (participant) => {
    var data = {};
    data.labels = [];
    data.dataSets = this.createDataSet(participant);

    return data;
  }



};
