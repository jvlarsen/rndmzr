import React, { Component } from 'react';
import './App.css';
import Events from './events';
import TeamBox from './components/team/teamBox';
import Randomize from './components/randomize';
import ParticipantBox from './components/participantComponents/participantBox';
import Engine from './helpers/randomizer';
import ElementsHelper from './helpers/elementsHelper';
import LineSample from './components/graph/linesample';

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
      latestEvents:{},
      labels:[],
      dataSets:[],
      graphColors:[
          {color: 'rgba(255,0,0,0.4)', borderColor: 'rgba(255,0,0,1)'},
          {color: 'rgba(0,255,0,0.4)', borderColor: 'rgba(0,255,0,1)'},
          {color: 'rgba(0,0,255,0.4)', borderColor: 'rgba(0,0,255,1)'},
          {color: 'rgba(100,0,0,0.4)', borderColor: 'rgba(100,0,0,1)'},
          {color: 'rgba(0,100,0,0.4)', borderColor: 'rgba(0,100,0,1)'},
          {color: 'rgba(0,0,100,0.4)', borderColor: 'rgba(0,0,100,1)'},
          {color: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)'},
          {color: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)'},
          {color: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)'},
          {color: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)'},]
    }
  }

  render() {

    return (
      <div className="App">
      <label id='gameId'>Unique game ID: {this.state.gameId}</label>
      <br/>
      <div className="graph">
        <LineSample labels={this.state.labels} dataSets={this.state.dataSets}/>
      </div>
          <div className="flex-grid">
            <div className="col leftCol" >
              <Events onOptionChange={this.onEventChange.bind(this)} selectedOption={this.state.selectedEvent}/>
            </div>
            <div className="col">
              <TeamBox onChange={this.onPlayerChange.bind(this)} selectedPlayer={this.state.selectedPlayer} onRefereeSelect={this.onRefereeSelect.bind(this)} refereeSelected={this.state.refereeSelected}/>
            </div>
            <div className="col">
              <Randomize selectedEvent={this.state.selectedEvent} selectedPlayer={this.state.selectedPlayer} onClick={this.onClickRandomize.bind(this)}/>


            </div>
          </div>

          <div className="flex-grid">
            <ParticipantBox id='participantBox' addParticipantToGraph={this.addParticipantToGraph.bind(this)}/>
            <input type='button' id='allocateButton' onClick={this.allocatePlayers} value='Start spillet' tooltip='Der kan ikke tilføjes deltagere eller ændres på dommerdeltagelse efterfølgende.' />
          </div>
      </div>
    );
  }

  onClickRandomize(e) {
    var selectedEvent = this.state.selectedEvent;
    var d = new Date();
    var newLabel = '' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    this.setState(prevState => ({
      labels: [...prevState.labels, selectedEvent] //newLabel kan udskiftes med selectedEvent for at se hændelsen i bunden.
    }))

    var selectedPlayer = 'referee';
    if (!this.state.refereeSelected) {
      selectedPlayer = this.state.selectedPlayer;
    }

    var randomizerResult = Engine.randomize(selectedEvent, selectedPlayer, this.state.participantNames.length);
    this.updateWhatToDrink(randomizerResult);
    this.addRandomizerResultToGraph(randomizerResult);

  }

  addRandomizerResultToGraph = (result) => {

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
    console.log('parti added ' + participantName);
    console.log(this.state.graphColors[participants.length-1]);
    var color = this.state.graphColors[participants.length-1].color;
    var borderColor = this.state.graphColors[participants.length-1].borderColor;
    var newDataSetForParticipant = {
      dataset:{
        label:participantName,
        data:[],
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
      currDataSets[i].dataset.data.push(randomizerResult[i].value);
    }

    randomizerResult.map(result => {
      var currStatus = ElementsHelper.getStatus(result.status);
      if (currStatus !== undefined && currStatus !== null) {
        currStatus.value = result.value;
      }
      return 1;
    });
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
