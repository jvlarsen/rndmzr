const getStatus = (index) => {
  var statusElement = document.getElementById('status'+index);
  return statusElement || null;
}

const getBank = (index) => {
  var bankElement = document.getElementById('bank'+index);
  return bankElement || null;
}

const getWalterCount = (index) => {
  var walterEle = document.getElementById('walterLabel' + index);
  return walterEle || null;
}

const getElementsByClassName = (id) => {
  return document.getElementById(id) || [];
}

const getReferee = () => {
  var refEle = document.getElementById('refereeName');
  var refName = refEle.value || '';
  var allocationKey = refEle.getAttribute('allocationkey');
  return {'Name':refName, 'AllocationKey':allocationKey};
}

const lockGame = () => {
  document.getElementById('allocateButton').disabled = true;
  document.getElementById('participantNameInput').disabled = true;
  document.getElementById('refereeCheckbox').disabled = true;
}

const clearElementValue = (eleId) => {
  var element = document.getElementById(eleId);
  if (element) {
    element.value = null;
  }
}

const updateLoadedPlayers = (playersJson) => {
  for (var player in playersJson) {
    var playerField = document.getElementById(player);
    playerField.value = playersJson[player].Name;
    playerField.setAttribute('allocationkey', playersJson[player].AllocationKey);
    var playerFieldRadio = document.getElementById(player+'Radio');
    playerFieldRadio.setAttribute('allocationKey', playersJson[player].AllocationKey);
  }
}

const setReferee = (referee) => {
  var refEle = document.getElementById('refereeName');
  refEle.value = referee.Name;
  refEle.setAttribute('allocationkey', referee.AllocationKey);
}

const updatePlayerStats = (playerStats, player) => {
  var playerOwn = null;
  var playerOther = null;
  if (player == 'referee') {
    playerOwn = document.getElementById('refereeStatOwn');
    playerOther = document.getElementById('refereeStatOther');
  }
  else {
    playerOwn = document.getElementById('playerStat' + player + 'Own');
    playerOther = document.getElementById('playerStat' + player + 'Other');
  }

  var newStatOwn = Number(playerOwn.innerText) + playerStats['Own'];
  var newStatOther = Number(playerOther.innerText) + playerStats['Other'];
  playerOwn.innerText = newStatOwn;
  playerOther.innerText = newStatOther;
}

export default {
  getStatus,
  getBank,
  getWalterCount,
  lockGame,
  clearElementValue,
  getElementsByClassName,
  getReferee,
  updateLoadedPlayers,
  setReferee,
  updatePlayerStats,
}
