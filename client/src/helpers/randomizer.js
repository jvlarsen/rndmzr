import Connector from './connector';

const allocatePlayers = (numberOfParticipants, includeReferee) => {
  console.log(numberOfParticipants + ' deltagere i denne omgang.');

  //så det ikke er de den samme deltager, der starter med at få tildelt spillere
  var indexStart = Math.floor(Math.random() * numberOfParticipants) +1;

  var playersToAllocate = includeReferee ? 21 : 20;
  for (var i = 0; i < playersToAllocate; i++) {
    var playerIndex = i%10;
    var participantIndex = indexStart%numberOfParticipants;
    console.log('participantIndex is: ' + participantIndex + ', and player index is: ' + playerIndex);
    indexStart++;
//    document.getElementById('playerHome' + i).setAttribute('allocationKey',indexStart);
  }

}

//vil gerne have hele elementet med.
const randomize = (selectedPlayer, selectedEvent) => {
  console.log(selectedPlayer + selectedEvent);
  return Connector.randomize(selectedPlayer, selectedEvent);
}

export default {
  allocatePlayers,
  randomize,
}
