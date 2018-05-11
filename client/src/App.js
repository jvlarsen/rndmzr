import React, { Component } from 'react';
import './App.css';
import Events from './events';
import TeamBox from './components/team/teamBox';
import Randomize from './components/randomize';
import ParticipantBox from './components/participantComponents/participantBox';
import Engine from './helpers/randomizer';
import ElementsHelper from './helpers/elementsHelper';
import LineSample from './components/graph/linesample';
import Bank from './components/bankComponents/bank';
import Connector from './helpers/connector'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      //Defaults when loading and reloading
      selectedEvent: null,
      selectedParticipant: null,
      selectedPlayer:null,
      graphColors: Connector.getGraphColors(),
      refereeIncluded: false,
      refereeSelected:false,

      //Variables when loading and reloading
      participantNames:[],
      gameId: null,
      dataSet:{},
      labels:['Kick off'],
      dataSets:[],

    }
  }

  render() {

    return (
      <div className="App">
        <label id='gameId'>Unique game ID: {this.state.gameId}</label>
        <br/>
        <div className="graph row">
          <LineSample labels={this.state.labels} dataSets={this.state.dataSets}/>
        </div>
        <div className="flex-grid">
          <div className="colwide">
            <ParticipantBox id='participantBox' addParticipantToGraph={this.addParticipantToGraph.bind(this)}/>
            <input type='button' id='allocateButton' onClick={this.allocatePlayers} value='Start spillet' />
          </div>
          <div className="colmedium">
            <TeamBox onChange={this.onPlayerChange.bind(this)} selectedPlayer={this.state.selectedPlayer} onRefereeSelect={this.onRefereeSelect.bind(this)} refereeSelected={this.state.refereeSelected}/>
          </div>
          <div className="leftCol">
            <Events onOptionChange={this.onEventChange.bind(this)} selectedOption={this.state.selectedEvent} refereeSelected={this.state.refereeSelected}/>
          </div>
          <div >
            <Randomize onClick={this.onClickRandomize.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  onClickRandomize(e) {
    var selectedEvent = (this.state.selectedEvent) ? this.state.selectedEvent.value : null;

    var selectedPlayer = document.getElementById('refereeName');
    if (!this.state.refereeSelected) {
      selectedPlayer = this.state.selectedPlayer;
    }

    if (!selectedEvent || !selectedPlayer) {return;}

    this.setState(prevState => ({
      labels: [...prevState.labels, selectedEvent] //newLabel kan udskiftes med selectedEvent for at se hændelsen i bunden.
    }))
    var randomizerResult = Engine.randomize(selectedPlayer, this.state.selectedEvent, this.state.participantNames.length);
    this.updateWhatToDrink(randomizerResult);
  }

  allocatePlayers = (e) => {
    var refereeCheckbox = document.getElementById('refereeCheckbox');
    Engine.allocatePlayers(this.state.participantNames.length, refereeCheckbox.checked);
    this.setState({gameId:123456});
    ElementsHelper.lockGame();
  }

  addParticipantToGraph = (participantName) => {
    var participants = this.state.participantNames;
    participants.push(participantName);
    this.setState({participantNames:participants});
    var color = this.state.graphColors[participants.length-1].color;
    var borderColor = this.state.graphColors[participants.length-1].borderColor;
    var newDataSetForParticipant = {
      dataset:{
        label:participantName,
        data:[0],
        fill: false,
        lineTension: 0.1,
        backgroundColor: color,
        borderColor: borderColor,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: color,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10}
      }

      this.setState(prevState => ({dataSets:[...prevState.dataSets, newDataSetForParticipant]}));
  }

  updateWhatToDrink(randomizerResult) {
    var currDataSets = this.state.dataSets;

    for (var i = 0; i < randomizerResult.length; i++) {
      var endIndex = currDataSets[i].dataset.data.length-1;
      var latestTotal = currDataSets[i].dataset.data[endIndex];
      var newTotal = latestTotal + randomizerResult[i].value.NumericMeasure;
      currDataSets[i].dataset.data.push(newTotal);
      var currStatus = ElementsHelper.getStatus(randomizerResult[i].status);

      currStatus.value = randomizerResult[i].value.StringMeasure;
      currStatus.numericvalue = randomizerResult[i].value.NumericMeasure;
    }
  }

  onEventChange(e) {
    this.setState({selectedEvent:e.target});
  }

  onParticipantChange(e) {
    this.setState({selectedParticipant:e.target.value});
  }

  onPlayerChange(e) {
    this.setState({selectedPlayer:e.target, refereeSelected:false});
  }

  onRefereeSelect(e) {
    this.setState({selectedPlayer:e.target, refereeSelected:true});
  }

  onRefereeToggle(e) {
    const newState = !this.state.refereeIncluded;
    this.setState({refereeIncluded:newState})
  }
}

export default App;
