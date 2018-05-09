
//2018-05-04: Problem: Own sætter slet ingenting på nogen. Other sætter på alle.
const randomize = (selectedPlayer, selectedEvent, numberOfParticipants) => {
  var measureType = selectedEvent.getAttribute("measure");
  var measure = getMeasures()[measureType];
  var result = [];
  var allocationKey = selectedPlayer.getAttribute("allocationKey");
  var isOwn = measureType.substring(0,3) === "Own";
  var randomNumber = Math.floor(Math.random() * 100);

  for (var i = 0; i < numberOfParticipants; i++) {
    if (isOwn && i == allocationKey) {
      result.push({status:i, value: getMeasureFromRandom(randomNumber, measure)});
    }
    if (isOwn && i != allocationKey) {
      result.push({status:i, value: getNoneMeasure()});
    }
    if (!isOwn && i == allocationKey) {
      result.push({status:i, value: getNoneMeasure()});
    }
    if (!isOwn && i != allocationKey) {
      result.push({status:i, value: getMeasureFromRandom(randomNumber, measure)});
    }
    randomNumber = Math.floor(Math.random() * 100);
  }

  return result;
}

const getMeasureFromRandom = (randomNumber, measure) => {
  var givenMeasure = null;

    if (randomNumber <= measure['Small']) {
      givenMeasure = {NumericMeasure: 1, StringMeasure:'Small'};
    }
    if (randomNumber > measure['Small'] && randomNumber <= measure['Medium']) {
      givenMeasure = {NumericMeasure: 3, StringMeasure:'Medium'};
    }
    if (randomNumber > measure['Medium'] && randomNumber <= measure['Large']) {
      givenMeasure = {NumericMeasure: 6, StringMeasure:'Large'};
    }
    if (randomNumber > measure['Large']) {
      givenMeasure = {NumericMeasure: 11, StringMeasure:'Walter'};
    }

  return givenMeasure;
}

const getNoneMeasure = () => {
  return {NumericMeasure: 0, StringMeasure: ''};
}

const getParticipants = () => {
  var participants = fetch('/participants')
    .then(res => res.json());
  return participants;
}

const getEvents = () => {
  var allEvents = fetch('api/events')
    .then(res => res.json());

  return allEvents;
}

const getMeasures = () => {
  var measures = {'Other1':{'Small':50, 'Medium':80, 'Large':95, 'Walter':100},
                'Other2':{'Small':30, 'Medium':60, 'Large':85, 'Walter':100},
                'Other3':{'Small':15, 'Medium':40, 'Large':75, 'Walter':100},
                'Own1':{'Small':40, 'Medium':70, 'Large':90, 'Walter':100},
                'Own2':{'Small':20, 'Medium':50, 'Large':85, 'Walter':100},
                'Own3':{'Small':15, 'Medium':40, 'Large':80, 'Walter':100},};

  return measures;
}

const getDrinkSizes = () => {
  var drinkSizes = {'Small':1, 'Medium':3, 'Large':6, 'Walter':11};
  return drinkSizes;
}

const getGraphColors = () => {
  return [
      {color: 'rgba(255,0,0,0.4)', borderColor: 'rgba(255,0,0,1)'},
      {color: 'rgba(0,255,0,0.4)', borderColor: 'rgba(0,255,0,1)'},
      {color: 'rgba(0,0,255,0.4)', borderColor: 'rgba(0,0,255,1)'},
      {color: 'rgba(100,0,0,0.4)', borderColor: 'rgba(100,0,0,1)'},
      {color: 'orange', borderColor: 'rgba(0,100,0,1)'},
      {color: 'green', borderColor: 'rgba(0,0,100,1)'},
      {color: 'navy', borderColor: 'rgba(255,100,100,1)'},
      {color: 'red', borderColor: 'rgba(75,192,192,1)'},
      {color: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)'},
      {color: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)'},
      {color: 'rgba(255,0,0,0.4)', borderColor: 'rgba(255,0,0,1)'},
      {color: 'rgba(0,255,0,0.4)', borderColor: 'rgba(0,255,0,1)'},
      {color: 'rgba(0,0,255,0.4)', borderColor: 'rgba(0,0,255,1)'},
      {color: 'rgba(100,0,0,0.4)', borderColor: 'rgba(100,0,0,1)'},
      {color: 'rgba(0,100,0,0.4)', borderColor: 'rgba(0,100,0,1)'},
      {color: 'rgba(0,0,100,0.4)', borderColor: 'rgba(0,0,100,1)'},
      {color: 'rgba(100,255,100,0.4)', borderColor: 'rgba(100,255,100,1)'},
      {color: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)'},
      {color: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)'},
      {color: 'rgba(75,192,192,0.4)', borderColor: 'rgba(75,192,192,1)'},
      {color: 'rgba(255,0,0,0.4)', borderColor: 'rgba(255,0,0,1)'}];
}

export default {
  randomize,
  getParticipants,
  getEvents,
  getMeasures,
  getDrinkSizes,
  getGraphColors,
}
