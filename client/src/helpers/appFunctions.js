import Connector from './connector';
import Sounds from './soundsHelper';
import Engine from './randomizer';

const createDataSet = (name, color, borderColor) => {
  return {
    dataset:{
      label:name,
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
}

const getSelectedEvent = (state) => {
  return (state.selectedEvent) ? state.selectedEvent.value : null;
}

const getSelectedPlayer = (state) => {
  return state.refereeSelected ? document.getElementById('referee') : state.selectedPlayer;
}

const startTheGame = (participantCount) => {
  playSound('Start');
  var refereeCheckbox =  document.getElementById('refereeCheckbox');;
  if (participantCount === 0) { return; }
  Engine.allocatePlayers(participantCount, refereeCheckbox.checked);
}

const resetGame = () => {
  var wipe = window.confirm('Er du sikker?');
  if (!wipe) {
    return;
  }
  localStorage.setItem('participants', null);
  localStorage.setItem('labels', null);
  localStorage.setItem('players', null);
  localStorage.setItem('referee', null);
  localStorage.setItem('refereeIncluded', null);
  localStorage.setItem('gameStarted', null);
  localStorage.setItem('allCounters', null);
  window.location.reload(false);
}

const undoLatest = () => {
  var dataSets = Connector.loadFromLocal('dataSets');
  var labels = Connector.loadFromLocal('labels');
  for (var i = 0; i < Object.keys(dataSets).length; i++) {
    dataSets[i].pop();
  }
  labels.pop();
  Connector.saveToLocal(dataSets, 'dataSets');
  Connector.saveToLocal(labels, 'labels');
  window.location.reload();
}

const findWorms = (ownOther) => {
    var allValues = document.getElementsByClassName(ownOther);
    var maxValue = 0;
    var maxPlayer = '';
    for (var i = allValues.length - 1; i >= 0; i--) {
      if (Number.parseInt(allValues[i].innerText) > maxValue) {
        maxValue = Number.parseInt(allValues[i].innerText);
        maxPlayer = allValues[i].id;
      }
    }
    if (maxPlayer === '') {
      return findRandomMaxPlayerAndValue(allValues);
    }
    return {player:maxPlayer, value:maxValue};
  }

const findRandomMaxPlayerAndValue = (allValues) => {
  var selectedPlayerIndex = Math.floor(Math.random() * allValues.length);
  let maxPlayer = allValues[selectedPlayerIndex].id;
  let maxValue = Number.parseInt(allValues[selectedPlayerIndex].innerText);

  return {player:maxPlayer, value:maxValue};
}

const findWinner = (allDataSets) => {
    var maxValue = 0;
    var winnerPlayer = '';

    for (var i = allDataSets.length - 1; i >= 0; i--) {
      var last = allDataSets[i].dataset.data['length']-1;
      var value = allDataSets[i].dataset.data[last];
      if (value > maxValue) {
        winnerPlayer = allDataSets[i].dataset.label;
        maxValue = value;
      }
    }
       return winnerPlayer;
  }

const checkStatusesAreClear = () => {
  var allStatuses = document.getElementsByClassName('status');
  for (var i = allStatuses.length - 1; i >= 0; i--) {
    if (allStatuses[i].value !== "") {
      return false;
    }
  }
  return true;
}

const playSound = (selectedEvent) => {
  Sounds.playSound(selectedEvent);
}

const downloadGameStats = (fullDataSet) => {
  var homeTeam = fullDataSet.hometeamname;
  var awayTeam = fullDataSet.awayteamname;
  var participants = fullDataSet.participants;
  var events = fullDataSet.labels;
  var dataSets = fullDataSet.dataSets;

  var csvData = [];
  var counter = Object.keys(participants).length; //Easier than retrieving number of keys all the time for both Participants and Datasets.
  var participantsRow = "";
 
  for (let i=0;i<counter; i++) {
    if (i !== counter) {
      participantsRow += ",";
    }
    participantsRow += participants[i].Name;
  }
 
  participantsRow = participantsRow + '\n';
  var eventCounter = Object.keys(events).length;
  var eventAndDataRow = "";
  for (let i = 0; i < eventCounter; i++) {
    eventAndDataRow = events[i] + ",";
    for (let j = 0; j < counter; j++) {
      eventAndDataRow += dataSets[j].dataset.data[i];
      if (j < counter-1) {
        eventAndDataRow += ",";
      }
    }
    eventAndDataRow += '\n';
    participantsRow += eventAndDataRow;
  }
  csvData.push(participantsRow);
  downloadCsv(homeTeam, awayTeam, csvData);
}

const downloadCsv = (home, away, csv) => {
  var hiddenElement = document.createElement('a');  
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
  hiddenElement.target = '_blank';  
 
  var gameDate = formatGameDate();
  hiddenElement.download = 'GameStats ' + home + ' vs. ' + away + ' on ' + gameDate + '.csv';  
  hiddenElement.click();  
}

const formatGameDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const gameDate = [year, month, day].join('-');

  return gameDate;
}

export default {
  createDataSet,
  getSelectedEvent,
  getSelectedPlayer,
  startTheGame,
  resetGame,
  undoLatest,
  findWorms,
  findWinner,
  checkStatusesAreClear,
  playSound,
  downloadGameStats,
}
