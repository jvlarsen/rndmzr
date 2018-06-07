import React, { Component } from 'react';
import './App.css';
import Events from './events';
import TeamBox from './components/team/teamBox';
import Randomize from './components/randomize';
import ParticipantBox from './components/participantComponents/participantBox';
import Engine from './helpers/randomizer';
import ElementsHelper from './helpers/elementsHelper';
import LineGraph from './components/graph/lineGraph';
import Connector from './helpers/connector'
import AppFunc from './helpers/appFunctions';
import Loader from './components/game/loader';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      //Defaults when loading and reloading
      selectedEvent: null,
      selectedPlayer:null,
      graphColors: Connector.getGraphColors(),
      refereeIncluded: false,
      refereeSelected:false,

      //Variables when loading and reloading
      participants:{},
      players: {},
      gameId: null,
      dataSet:{},
      labels:['Kick off'],
      dataSets:[],
      loadedParticipants:[],
      gameStarted: false,
    }
  }

  componentWillMount() {
    var localLabels = JSON.parse(localStorage.getItem('labels'));
    if (localLabels) {
      this.labelsWereLoaded(localLabels);
    }

    var participants = JSON.parse(localStorage.getItem('participants'));
    if (participants) {
      this.participantsWereLoaded(participants);
    }

/*
    var localDataSets = localStorage.getItem('dataSets');
    if (localDataSets) {
      console.log(localDataSets);
      this.setState({dataSets: localDataSets});
      this.dataSetsWereLoaded(localDataSets);
    }
    //var loadedParticipants = Connector.getParticipantsFromGameId(1);
*/
  }

  componentDidMount() {
    var players = JSON.parse(localStorage.getItem('players'));
    if (players) {
      this.playersWereLoaded(players);
    }
  }

  componentDidUpdate() {
    Connector.saveToLocal(this.state.labels, 'labels');
    Connector.saveToLocal(this.state.participants, 'participants');
    Connector.saveToLocal(this.state.players, 'players');
  }

  render() {

    return (
      <div className="App">
        <label id='gameId'>Unique game ID: {this.state.gameId}</label>
        <br/>
        <span>
        <div className="left">
        <Loader gameDataLoaded={this.gameDataLoaded.bind(this)}/>
        </div>
        <div className="right warning">
        <input type="button" onClick={AppFunc.resetGame.bind(this)} value="Click here to wipe existing game." />
        </div>
        </span>
        <div >
          <LineGraph labels={this.state.labels} dataSets={this.state.dataSets}/>
        </div>
        <div className="flex-grid">
          <div className="colwide">
            <ParticipantBox id='participantBox'
            addParticipant={this.addParticipant.bind(this)}
            participants={this.state.participants} />
            <input type='button' id='allocateButton' onClick={this.allocatePlayers} value='Start spillet' />
          </div>
          <div className="colmedium">
            <TeamBox onChange={this.onPlayerChange.bind(this)} selectedPlayer={this.state.selectedPlayer} onRefereeSelect={this.onRefereeSelect.bind(this)} refereeSelected={this.state.refereeSelected} addPlayerName={this.addPlayerName.bind(this)}/>
          </div>
          <div className="leftCol">
            <Events onOptionChange={this.onEventChange.bind(this)} selectedOption={this.state.selectedEvent} refereeSelected={this.state.refereeSelected}/>
          </div>
          <div>
            <Randomize onClick={this.onClickRandomize.bind(this)} />
          </div>
        </div>
      </div>
    );
  }

  onClickRandomize(e) {
    var selectedEvent = AppFunc.getSelectedEvent(this.state);
    var selectedPlayer = AppFunc.getSelectedPlayer(this.state);

    if (!selectedEvent || !selectedPlayer) {return;}

    this.addLabelToGraph(selectedEvent);

    var randomizerResult = Engine.randomize(selectedPlayer, this.state.selectedEvent, Object.keys(this.state.participants).length);
    this.updateWhatToDrink(randomizerResult);

    //Removed from Connector, since I'm currently using StoreLabels and StoreParticipants from App.js.
    //Should definitely be refactored to a backend-facing handler.
    //Connector.saveGame();
  }

  allocatePlayers = (e) => {
    var refereeCheckbox = document.getElementById('refereeCheckbox');
    Engine.allocatePlayers(Object.keys(this.state.participants).length, refereeCheckbox.checked);
    this.updatePlayerAllocationKeys();
    this.setState({gameId:123456, gameStarted: true});
    ElementsHelper.lockGame();
  }

  addParticipant(participant) {
      if (participant.Name.length === 0 || Object.keys(this.state.participants).includes(participant.Name)) {
        return;
      }

      var currentParticipants = this.state.participants;
      var currCount = Object.keys(currentParticipants).length;
      currentParticipants[currCount] = participant;
      this.setState({participants: currentParticipants});
      this.addParticipantToGraph(participant.Name);
  }

  addParticipantToGraph = (participantName) => {
    var index = Object.keys(this.state.participants).length-1;
    var color = this.state.graphColors[index].color;
    var borderColor = this.state.graphColors[index].borderColor;
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

    for (var i = 0; i < randomizerResult.length; i++) {
      this.addEventToGraph(i, randomizerResult[i].value.NumericMeasure);
      var currStatus = ElementsHelper.getStatus(randomizerResult[i].status);

      currStatus.value = randomizerResult[i].value.StringMeasure;
      currStatus.numericvalue = randomizerResult[i].value.NumericMeasure;
    }
  }

  addLabelToGraph(selectedEvent) {
    if (selectedEvent == 'Kick off') { return; }
    this.setState(prevState => ({
      labels: [...prevState.labels, selectedEvent]
    }))
  }

  addEventToGraph(allocationKey, numericMeasure) {
    var currDataSets = this.state.dataSets;
    var endIndex = currDataSets[allocationKey].dataset.data.length-1;
    var latestTotal = currDataSets[allocationKey].dataset.data[endIndex];
    var newTotal = latestTotal + numericMeasure;
    currDataSets[allocationKey].dataset.data.push(newTotal);
  }

  participantsWereLoaded(participantsJson) {
    //Omskriv alle loops til map-functions.
    for (var i = 0; i < Object.keys(participantsJson).length; i++) {
      this.addParticipant(participantsJson[i]);
    }
  }

  playersWereLoaded(playersJson) {
    ElementsHelper.updateLoadedPlayers(playersJson);
    this.setState({players:playersJson});
  }

  gameWasLoaded(loadedDataSets) {
    this.dataSetsWereLoaded(loadedDataSets.dataSets);

    this.labelsWereLoaded(loadedDataSets.labels);
  }

  dataSetsWereLoaded(dataSets) {
    for (var dataArrayIndex in dataSets) {
      this.addEventArrayToGraph(dataArrayIndex, dataSets[dataArrayIndex]);
    }
  }

  labelsWereLoaded(labels) {
    for (var i = 0; i < labels.length; i++) {
      this.addLabelToGraph(labels[i]);
    }
  }

  gameDataLoaded(gameData) {
    this.participantsWereLoaded(gameData[1]);
    this.gameWasLoaded(gameData[0]);
  }

  addEventArrayToGraph(allocationKey, eventArray) {
    for (var i = 0; i < eventArray.length; i++) {
      this.addEventToGraph(allocationKey, eventArray[i]);
    }
  }

  addPlayerName(e) {
    if (e.target.value.length === 0) {
      return;
    }
    var nameInput = e.target.value;
    if (Object.keys(this.state.players).includes(e.target.id)) {
      return;
    }
    var players = this.state.players;
    players[e.target.id] = {'Name': nameInput, AllocationKey:null};
    this.setState({players: players});
  }

  updatePlayerAllocationKeys() {
    var currPlayers = this.state.players;
    for (var player in currPlayers) {
      var playerField = document.getElementById(player);
      currPlayers[player].AllocationKey = playerField.getAttribute('allocationkey');
    }
    this.setState({players: currPlayers});
  }

  onEventChange(e) {
    this.setState({selectedEvent:e.target});
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
