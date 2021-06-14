import Connector from './connector';

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

export default {
  createDataSet,
  getSelectedEvent,
  getSelectedPlayer,
  resetGame,
  undoLatest,
  findWorms,
  findWinner,
}
