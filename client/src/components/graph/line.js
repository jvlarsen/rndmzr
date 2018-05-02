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
    var events = this.props.events; //json {'Participant 1': 3, 'Participant 2': 4}
    for (var key in events) {
      if (events.hasOwnProperty(key)) {
        console.log(key + ' must drink ' + events[key]);
      }
    }
    console.log(participantNames);
  }

  render() {
    var data = this.getData(this.props.events);
    return (
      <div>
        <Line data={data} id='graph2'/>
      </div>
    );
  }

  //Måske skal hele getData's return værdi flyttes op i state.
  //Så kan der trækkes derfra, og pushed når der oprettes nye deltagere.
  getData = (results) => {
    var allGraphs = this.state.participantsGraph;
        var dataSetsUpdated = [];
    for (var key in results) {
      if (results.hasOwnProperty(key)) {
        var graph = DataSetGenerator.get(key, allGraphs);
        if (graph.data) graph.data.push(results[key]);
        dataSetsUpdated.push(graph);
      }
    }




    var graphs = this.state.participantsGraph;
    //var p1 = DataSetGenerator.get('Participant 1', graphs);
    //p1.data.push(13);
    //console.log(p1);
    return {
    labels: this.getLabels(),
    datasets: dataSetsUpdated
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
