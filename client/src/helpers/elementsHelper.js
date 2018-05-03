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

const lockGame = () => {
  document.getElementById('allocateButton').disabled = true;
  document.getElementById('participantNameInput').disabled = true;
}

export default {
  getStatus,
  getBank,
  getWalterCount,
  lockGame,
}
