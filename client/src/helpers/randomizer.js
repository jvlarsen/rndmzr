import Connector from './connector';

const allocatePlayers = (numberOfParticipants, includeReferee) => {

  var indexStart = Math.floor(Math.random() * numberOfParticipants) +1;

  var playersToAllocate = getPlayersArrayForAllocation(includeReferee);
  while (playersToAllocate.length > 0)
  {
    var playerIndex = Math.floor(Math.random() * playersToAllocate.length);
    var participantIndex = indexStart%numberOfParticipants;
    var playerToAllocate = playersToAllocate[playerIndex];
    var playerRadioToAllocate = playerToAllocate + 'Radio';

    document.getElementById(playerToAllocate).setAttribute('allocationKey', participantIndex);

    document.getElementById(playerRadioToAllocate).setAttribute('allocationKey', participantIndex);

    document.getElementById('status'+participantIndex).setAttribute('allocationKey', participantIndex);

    indexStart++;
    var deleteIndex = playersToAllocate.indexOf(playerToAllocate);
    playersToAllocate.splice(deleteIndex, 1);
  }
  if (!includeReferee) {
    document.getElementById('refereeName').removeAttribute('allocationKey');
  }
}

const getPlayersArrayForAllocation = (includeReferee) => {
  var players = ['playerHome0','playerHome1', 'playerHome2', 'playerHome3', 'playerHome4', 'playerHome5', 'playerHome6', 'playerHome7', 'playerHome8', 'playerHome9', 'playerAway0', 'playerAway1', 'playerAway2', 'playerAway3', 'playerAway4', 'playerAway5', 'playerAway6', 'playerAway7', 'playerAway8', 'playerAway9'];
  if (includeReferee) {
    players.push('refereeName');
  }
  return players;
}

const randomize = (selectedPlayer, selectedEvent, numberOfParticipants) => {
  if (!selectedPlayer || !selectedEvent) {return [];}
  return Connector.randomize(selectedPlayer, selectedEvent, numberOfParticipants);
}

export default {
  allocatePlayers,
  randomize,
}
