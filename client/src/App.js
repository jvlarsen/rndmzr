import React, { Component } from 'react';
import './App.css';
import Participant from './participants/participant';
import Events from './events';
import TeamBox from './components/team/teamBox';
import Randomize from './components/randomize';
import Line from './components/graph/line';
import ParticipantBox from './components/participantComponents/participantBox';
import Engine from './helpers/randomizer';
import ElementsHelper from './helpers/elementsHelper';

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
      passwords: []
    }
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
          <div className="flex-grid">
            <div className="col leftCol" >
              <Events onOptionChange={this.onEventChange.bind(this)} selectedOption={this.state.selectedEvent}/>
            </div>
            <div className="col">
              <TeamBox onChange={this.onPlayerChange.bind(this)} selectedPlayer={this.state.selectedPlayer}/>
            </div>
            <div className="col">
              <Randomize selectedEvent={this.state.selectedEvent} selectedPlayer={this.state.selectedPlayer} onClick={this.onClickRandomize.bind(this)}/>

              <Line participants={this.state.participantNames}/>
            </div>
          </div>
          <div className="flex-grid">
            <br/>
          </div>

          <div className="flex-grid">
            <ParticipantBox participantAdded={this.addParticipantToGraph.bind(this)} addParticipantToGraph={this.addParticipantToGraph.bind(this)}/>
            <input type='button' onClick={this.allocatePlayers} value='Fordel holdene' />
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

  allocatePlayers = () => {
    Engine.allocatePlayers(this.state.participantNames.length, this.state.includeReferee);
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
