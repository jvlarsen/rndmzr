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
import GameMenu from './components/game/gameMenu';
import Undo from './components/game/undo';
import Sounds from './helpers/soundsHelper';

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
    this.loadGame();
  }

  componentDidMount() {
    var players = JSON.parse(localStorage.getItem('players'));
    if (players) {
      this.playersWereLoaded(players);
    }
    document.getElementById('refereeCheckbox').checked = this.state.refereeIncluded;
    if (this.state.refereeIncluded) {
      var referee = Connector.loadFromLocal('referee');
      if (referee) {
        ElementsHelper.setReferee(referee);
      }
    }

    var dataSetsLocal = Connector.loadFromLocal('dataSets');
    if (dataSetsLocal) {
      var currDataSets = this.state.dataSets;
      for (var i = 0; i < Object.keys(currDataSets).length; i++) {
        currDataSets[i].dataset.data = dataSetsLocal[i];
      }
      this.setState({dataSets: currDataSets});
    }

    var gameStarted = this.state.gameStarted;
    if (gameStarted == true) {
      ElementsHelper.lockGame();
    }
  }

  componentDidUpdate() {
    this.saveGame();
  }

  loadGame() {
    var localLabels = Connector.loadFromLocal('labels');
    if (localLabels) {
      this.labelsWereLoaded(localLabels);
    }

    var participants = Connector.loadFromLocal('participants');
    if (participants) {
      this.participantsWereLoaded(participants);
    }

    var refereeIncluded = Connector.loadFromLocal('refereeIncluded');
    if (refereeIncluded && refereeIncluded == true) {
      this.setState({refereeIncluded:true});
    }

    var gameStarted = Connector.loadFromLocal('gameStarted');
    if (gameStarted && gameStarted === true) {
      this.setState({gameStarted:true});
    }

  }

  saveGame() {
    var dataSetsToSave = [];
    var dataSets = this.state.dataSets;
    for (var i = 0; i < Object.keys(dataSets).length; i++) {
      dataSetsToSave.push(dataSets[i].dataset.data);
    }
    Connector.saveToLocal(dataSetsToSave, 'dataSets');

    Connector.saveToLocal(this.state.labels, 'labels');
    Connector.saveToLocal(this.state.participants, 'participants');
    var refEle = ElementsHelper.getReferee();
    Connector.saveToLocal(refEle, 'referee');
    Connector.saveToLocal(this.state.players, 'players');
    Connector.saveToLocal(this.state.refereeIncluded, 'refereeIncluded');
  }

  render() {

    return (
      <div className="App">

        <div className="wipediv">         
            <GameMenu wipe={AppFunc.resetGame.bind(this)} gameDataLoaded={this.gameDataLoaded.bind(this)}/>
        </div>
        <div className="flex-grid topgrid">
          <div className="flex-grid teamsandevents">
            <div className="flex-grid teamsgrid" id="teamsDiv">
              <TeamBox onChange={this.onPlayerChange.bind(this)} selectedPlayer={this.state.selectedPlayer} onRefereeSelect={this.onRefereeRadioSelect.bind(this)} refereeSelected={this.state.refereeSelected} toggleReferee={this.onRefereeCheckboxToggle.bind(this)} addPlayerName={this.addPlayerName.bind(this)}/>
            </div>
            <div className="events" id="eventsDiv">
              <Events onOptionChange={this.onEventChange.bind(this)} selectedOption={this.state.selectedEvent} refereeSelected={this.state.refereeSelected}/>
              <Randomize onClick={this.onClickRandomize.bind(this)} />
            </div>
          </div>
          <div className="colwide" id="graphDiv">
            <LineGraph labels={this.state.labels} dataSets={this.state.dataSets} />
          </div>
        </div>
        <div className="flex-grid participantslist">
          <div className="participantslist" id="participantsListId">
            <ParticipantBox id='participantBox' addParticipant={this.addParticipant.bind(this)} allocatePlayers={this.allocatePlayers.bind(this)} participants={this.state.participants} />
          </div>
          <div className="inline">
            <Undo className="rightCol"/>
            <input type='button' className='bottom' id='gameEnded' value="Kampen er slut" onClick={this.toggleGameEnded.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  toggleGameEnded() {
//Måske flyttes ud i ElementsHelper.
    var toggle = document.getElementById('event15').hidden;

    if (toggle) {
      document.getElementById('event15').removeAttribute('hidden');
      document.getElementById('event16').removeAttribute('hidden');
    }
    else {
      document.getElementById('event15').setAttribute('hidden', toggle);
      document.getElementById('event16').setAttribute('hidden', toggle);
    }

    var maxOther = AppFunc.findWorms('other');
    var maxOwn = AppFunc.findWorms('own');
    var maxParticipant = AppFunc.findWinner(this.state.dataSets);

    document.getElementById(maxOther.player).classList.add('highlight');
    document.getElementById(maxOwn.player).classList.add('highlight');
  }

  playAudio(selectedEvent) {
    var allSounds = Sounds.loadSounds();

    let currentSound = allSounds.sounds.find(sound => sound.id == selectedEvent);
    new Audio(currentSound.sound).play(); 
  }

  onClickRandomize(e) {
    //tryk på alle BANK automatisk som det første.

    var selectedEvent = AppFunc.getSelectedEvent(this.state);
    var selectedPlayer = AppFunc.getSelectedPlayer(this.state);

    this.playAudio(selectedEvent);

    if (!selectedEvent || !selectedPlayer) {return;}

    this.addLabelToGraph(selectedEvent);
    var randomizerResult = Engine.randomize(selectedPlayer, this.state.selectedEvent, Object.keys(this.state.participants).length);

    this.updateWhatToDrink(JSON.parse(randomizerResult.result));

    var currentPlayers = this.state.players;

    if (selectedPlayer.id == 'referee') {
      currentPlayers['referee'].Own = randomizerResult.stats.Stats.Own;
      currentPlayers['referee'].Other = randomizerResult.stats.Stats.Other;
    }
    else {
      currentPlayers['player'+selectedPlayer.value].Own = randomizerResult.stats.Stats.Own;
      currentPlayers['player'+selectedPlayer.value].Other = randomizerResult.stats.Stats.Other;
    }
    this.setState({players:currentPlayers});
  }

  allocatePlayers = (e) => {
    this.playAudio('Start');
    var refereeCheckbox = document.getElementById('refereeCheckbox');
    Engine.allocatePlayers(Object.keys(this.state.participants).length, refereeCheckbox.checked);
    this.updatePlayerAllocationKeys();
    this.updateParticipantAllocationKeys();
    this.setState({gameId:123456, gameStarted: true});
    ElementsHelper.lockGame();

    Connector.saveToLocal(true, 'gameStarted');
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
    var newDataSetForParticipant = AppFunc.createDataSet(participantName, color, borderColor);

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

  gameWasLoaded(loadedGameData) {
    this.dataSetsWereLoaded(loadedGameData.dataSets);
    this.labelsWereLoaded(loadedGameData.labels);
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
    this.playersWereLoaded(gameData[0].players);
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
    var players = this.state.players;
    var nameInput = e.target.value;
    if (Object.keys(this.state.players).includes(e.target.id)) {
      players[e.target.id].Name = nameInput;
    }
    else {
      players[e.target.id] = {'Name': nameInput, AllocationKey:null, Own:0, Other:0};
    }
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

  updateParticipantAllocationKeys() {
    var currParticipants = this.state.participants;
    for (var i = 0; i < Object.keys(currParticipants).length; i++) {
      currParticipants[i].AllocationKey = i;
    }
  }

  onEventChange(e) {
    this.setState({selectedEvent:e.target});
  }

  onPlayerChange(e) {
    this.setState({selectedPlayer:e.target, refereeSelected:false});
  }

  onRefereeRadioSelect(e) {
    this.setState({selectedPlayer:e.target, refereeSelected:true});
  }

  onRefereeCheckboxToggle(e) {
    const newState = !this.state.refereeIncluded;
    this.setState({refereeIncluded:newState})
  }
}

export default App;
