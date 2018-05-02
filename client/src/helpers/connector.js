

const randomize = (selectedEvent, selectedPlayer, numberOfParticipants) => {
  //var participants = getParticipants();
  //console.log(parts);
  console.log(selectedEvent + ' - ' + selectedPlayer + ' printed from Connector.');

  var result = [];
  for (var i = 0; i < numberOfParticipants; i++) {
    var measure = Math.floor(Math.random() * 12);
    result.push({status:i, value:measure})
  }

  return result;
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

export default {
  randomize,
  getParticipants,
  getEvents,
  getMeasures,
}
