import Randomize from '../components/randomize';
import Connector from './connector';
import Sounds from './soundsHelper';

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

  //Mangler at få bygget logik, der håndterer uafgjort eller manglende dataset.
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
  console.log(fullDataSet);
  /*det er hele App.js this.state, der kommer ind.
  Data skal itereres i de forskellige dataSets.
  Strukturen til at lave en graf:
  - Farvekode til hver deltager.
  - Event-labels i rækkefølge.
  - I Excel-termer: Events nedad, deltager henad, rullende total i cellerne.
  - CSV-format: Husk lige mange datafelter eller kommaer i hver række.
  - Deltagere øverst
  - Én event per række, efterfulgt af saldo for hver respektiv deltager
  - Se dataImport1.csv for et eksempel.

  */
  var participants = fullDataSet.participants;
  var events = fullDataSet.labels;
  var dataSets = fullDataSet.dataSets;

  var csvData = [];
  var counter = Object.keys(participants).length; //Easier than retrieving number of keys all the time for both Participants and Datasets.
  var participantsRow = "";
 
  for (let i=0;i<counter; i++) {
    if (i != counter) {
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
  downloadCsv(csvData);
}

const downloadCsv = (csv) => {
  var hiddenElement = document.createElement('a');  
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
  hiddenElement.target = '_blank';  
    
  //provide the name for the CSV file to be downloaded  
  hiddenElement.download = 'GameStats.csv';  
  hiddenElement.click();  
}

const downloadFile = ({ data, fileName, fileType }) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType })
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

const exportToJson = (dataForDownload, fileName) => {
  this.downloadFile({
    data: dataForDownload,
    fileName: fileName,
    fileType: 'text/json',
  })
}

export default {
  createDataSet,
  getSelectedEvent,
  getSelectedPlayer,
  resetGame,
  undoLatest,
  findWorms,
  findWinner,
  checkStatusesAreClear,
  playSound,
  downloadGameStats,
}
