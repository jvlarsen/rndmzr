import React, { Component } from 'react';
import './App.css';
import Events from './events';
import TeamBox from './components/team/teamBox';
import Randomize from './components/randomize';
import Line from './components/graph/line';
import ParticipantBox from './components/participantComponents/participantBox';
import Engine from './helpers/randomizer';
import ElementsHelper from './helpers/elementsHelper';
import DataSetGenerator from './components/graph/dataSetGenerator';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedEvent: null,
      selectedParticipant: null,
      selectedPlayer:null,
      refereeIncluded: false,
      minute: 0,
      includeReferee: false,
      participantNames:[],
      passwords: [],
      gameId: null,
      dataSet:null,
    }
  }

  componentWillMount() {
    this.setState({dataSet: DataSetGenerator.getDataSet()})
  }

  render() {

    return (
      <div className="App">
      <label id='gameId'>Unique game ID: {this.state.gameId}</label>
      <br/>
          <div className="flex-grid">
            <div className="col leftCol" >
              <Events onOptionChange={this.onEventChange.bind(this)} selectedOption={this.state.selectedEvent}/>
            </div>
            <div className="col">
              <TeamBox onChange={this.onPlayerChange.bind(this)} selectedPlayer={this.state.selectedPlayer}/>
            </div>
            <div className="col">
              <Randomize selectedEvent={this.state.selectedEvent} selectedPlayer={this.state.selectedPlayer} onClick={this.onClickRandomize.bind(this)}/>

              <Line participants={this.state.participantNames} data={this.state.dataSet}/>
            </div>
          </div>

          <div className="flex-grid">
            <ParticipantBox id='participantBox' addParticipantToGraph={this.addParticipantToGraph.bind(this)}/>
            <input type='button' id='allocateButton' onClick={this.allocatePlayers} value='Fordel holdene' />
          </div>
      </div>
    );
  }

  onClickRandomize(e) {
    var selectedEvent = this.state.selectedEvent;
    var selectedPlayer = this.state.selectedPlayer;
    var randomizerResult = Engine.randomize(selectedEvent, selectedPlayer);
    this.updateWhatToDrink(randomizerResult);
  }

  allocatePlayers = (e) => {
    Engine.allocatePlayers(this.state.participantNames.length, this.state.includeReferee);
    this.setState({gameId:123456});
    ElementsHelper.lockGame();
    /*Lav noget med en property på hhv. Participants og Players, der mapper mellem
    de to.
    Eksempelvis <Participant allocationKey=1 ... />
    <Player allocationKey=1 ... />
    Så kan der kobles mellem de to, og det giver en foreign key til databasen.
    */
  }

  addParticipantToGraph = (participantName) => {
    var participants = this.state.participantNames;
    participants.push(participantName);
    this.setState({participantNames:participants});
  }

  updateWhatToDrink(randomizerResult) {
    randomizerResult.map(result => {
      var currStatus = ElementsHelper.getStatus(result.status);
      if (currStatus !== undefined && currStatus !== null) {
        currStatus.value = result.value;
      }
      return 1;
    })
  }

  onEventChange(e) {
    this.setState({selectedEvent:e.target.value});
  }

  onParticipantChange(e) {
    this.setState({selectedParticipant:e.target.value});
  }

  onPlayerChange(e) {
    this.setState({selectedPlayer:e.target.value});
  }

  onRefereeToggle(e) {
    const newState = !this.state.refereeIncluded;
    this.setState({refereeIncluded:newState})
  }


}

export default App;
