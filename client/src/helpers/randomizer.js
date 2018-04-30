import Connector from './connector';

const allocatePlayers = (numberOfParticipants, includeReferee) => {
  console.log(numberOfParticipants + ' deltagere i denne omgang.');

  //så det ikke er de den samme deltager, der starter med at få tildelt spillere
  var indexStart = Math.floor(Math.random() * numberOfParticipants) +1;

  var playersToAllocate = getPlayersArrayForAllocation(includeReferee);
  while (playersToAllocate.length > 0)
  //for (var i = 0; i < playersToAllocate.length; i++)
  {
    var playerIndex = Math.floor(Math.random() * playersToAllocate.length);
    var participantIndex = indexStart%numberOfParticipants;
    var playerToAllocate = playersToAllocate[playerIndex];

    document.getElementById(playerToAllocate).setAttribute('allocationKey', participantIndex);
    document.getElementById('status'+participantIndex).setAttribute('allocationKey', participantIndex);
    indexStart++;
    var deleteIndex = playersToAllocate.indexOf(playerToAllocate);
    playersToAllocate.splice(deleteIndex, 1);
  }

}

const getPlayersArrayForAllocation = (includeReferee) => {
  var players = ['playerHome0','playerHome1', 'playerHome2', 'playerHome3', 'playerHome4', 'playerHome5', 'playerHome6', 'playerHome7', 'playerHome8', 'playerHome9', 'playerAway0', 'playerAway1', 'playerAway2', 'playerAway3', 'playerAway4', 'playerAway5', 'playerAway6', 'playerAway7', 'playerAway8', 'playerAway9'];
  if (includeReferee) {
    players.push('referee');
  }
  return players;
}

//vil gerne have hele elementet med.
const randomize = (selectedPlayer, selectedEvent) => {
  console.log(selectedPlayer + selectedEvent);

  var ele = document.getElementById('graph');
  console.log(ele);

  return Connector.randomize(selectedPlayer, selectedEvent);
}

export default {
  allocatePlayers,
  randomize,
}
