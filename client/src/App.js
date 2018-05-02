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
      refereeSelected:false,
      refereeIncluded: false,
      minute: 0,
      includeReferee: false,
      participantNames:[],
      passwords: [],
      gameId: null,
      dataSet:{},
      latestEvents:{}
    }
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
              <TeamBox onChange={this.onPlayerChange.bind(this)} selectedPlayer={this.state.selectedPlayer} onRefereeSelect={this.onRefereeSelect.bind(this)} refereeSelected={this.state.refereeSelected}/>
            </div>
            <div className="col">
              <Randomize selectedEvent={this.state.selectedEvent} selectedPlayer={this.state.selectedPlayer} onClick={this.onClickRandomize.bind(this)}/>

              <Line participants={this.state.participantNames} data={this.state.dataSet} events={this.state.latestEvents}/>
            </div>
          </div>

          <div className="flex-grid">
            <ParticipantBox id='participantBox' addParticipantToGraph={this.addParticipantToGraph.bind(this)}/>
            <input type='button' id='allocateButton' onClick={this.allocatePlayers} value='Start spillet' toolTip='Der kan ikke tilføjes deltagere eller ændres på dommerdeltagelse efterfølgende.' />
          </div>
      </div>
    );
  }

  onClickRandomize(e) {
    this.setState({latestEvents:{}});
    var selectedPlayer = 'referee';
    if (!this.state.refereeSelected) {
      selectedPlayer = this.state.selectedPlayer;
    }
    var selectedEvent = this.state.selectedEvent;

    var randomizerResult = Engine.randomize(selectedEvent, selectedPlayer);
    this.updateWhatToDrink(randomizerResult);
    this.addRandomizerResultToGraph(randomizerResult);

  }

  addRandomizerResultToGraph = (result) => {
      var events = {};
      var i = 1;
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          var index = result[key].status;
          var participant = 'Participant ' + i;
          var measure = result[key].value;
          events[participant] = measure;
          i++;
        }
      }
      this.setState({latestEvents:events});
  }

  allocatePlayers = (e) => {
    var refereeCheckbox = document.getElementById('refereeCheckbox');
    Engine.allocatePlayers(this.state.participantNames.length, refereeCheckbox.checked);
    this.setState({gameId:123456});
    //ElementsHelper.lockGame();
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
    this.setState({selectedPlayer:e.target.value, refereeSelected:false});
  }

  onRefereeSelect(e) {
    this.setState({selectedPlayer:null, refereeSelected:true});
  }

  onRefereeToggle(e) {
    const newState = !this.state.refereeIncluded;
    this.setState({refereeIncluded:newState})
  }


}

export default App;
