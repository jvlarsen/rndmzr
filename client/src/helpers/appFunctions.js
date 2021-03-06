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
  return state.refereeSelected ? document.getElementById('refereeName') : state.selectedPlayer;
}

const resetGame = () => {
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

export default {
  createDataSet,
  getSelectedEvent,
  getSelectedPlayer,
  resetGame,
  undoLatest,
}
