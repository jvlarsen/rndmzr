import Connector from "./connector";
import React from "react";
import ReactDOM from "react-dom";
import CountdownTimer from "../components/game/countdown";
import LineGraph from '../components/graph/lineGraph';
import AppFunc from "./appFunctions";
import { Bar } from "react-chartjs-2";

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
  var refEle = document.getElementById('referee');
  var refName = refEle.value || '';
  var allocationKey = refEle.getAttribute('allocationkey');
  return {'Name':refName, 'AllocationKey':allocationKey};
}

const lockGame = () => {
  document.getElementById('allocateButton').disabled = true;
  document.getElementById('participantNameInput').disabled = true;
  document.getElementById('refereeCheckbox').disabled = true;
  document.getElementById('participantNameSubmit').disabled = true;
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

    document.getElementById(player+'Own').innerText = playersJson[player].Own;
    document.getElementById(player+'Other').innerText = playersJson[player].Other;
  }
}

const setReferee = (referee) => {
  var refEle = document.getElementById('referee');
  refEle.value = referee.Name;
  refEle.setAttribute('allocationkey', referee.AllocationKey);
}

const updatePlayerStats = (playerStats, player) => {
  var playerOwn = null;
  var playerOther = null;

  if (player.id === 'referee') {
    playerOwn = document.getElementById('refereeOwn');
    playerOther = document.getElementById('refereeOther');
  }
  else {
    playerOwn = document.getElementById('player' + player.defaultValue + 'Own');
    playerOther = document.getElementById('player' + player.defaultValue + 'Other');
  }

  var newStatOwn = Number(playerOwn.innerText) + playerStats['Own'];
  var newStatOther = Number(playerOther.innerText) + playerStats['Other'];
  playerOwn.innerText = newStatOwn;
  playerOther.innerText = newStatOther;

  return {Stats: {Own: newStatOwn, Other: newStatOther}};
}

const addClassToElement = (elementId, classToAdd) => {
  document.getElementById(elementId).classList.add(classToAdd);
}

const hideElement = (elementId) => {
  document.getElementById(elementId).setAttribute('hidden', true);
}

const showHiddenElement = (elementId) => {
  document.getElementById(elementId).removeAttribute('hidden');
}

const setRefereeIncluded = () => {
  var referee = Connector.loadFromLocal('referee');
  if (referee) {
    setReferee(referee);
  }
}

const showCountdown = (milliseconds) => {
  ReactDOM.render(
    <CountdownTimer date={Date.now() + 10000} />,
    document.getElementById('countdownDiv')
      );
}

const toggleGraphs = (showParticipantGraph, state) => {
  if (showParticipantGraph) {
    ReactDOM.render(<LineGraph id="participantGraph" labels={state.labels} dataSets={state.dataSets} />, document.getElementById('graphDiv') );
  }
  else {
    var allPlayers = state.players;

    var playerLabels = [];
    Object.keys(allPlayers).forEach(function(k){
      playerLabels.push(allPlayers[k].Name);
  });
   var allPlayerData = AppFunc.getBarChartData(allPlayers);

    var data = {
      labels:  playerLabels,
      datasets: [
        {
          label: "Egen",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: allPlayerData.own
        },

        {
          label: "Andre",
          backgroundColor: "rgba(155,231,91,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: allPlayerData.other
        }
      ],
    };
    var options = {
      responsive: true,
      legend: {
        display: false
      },
      type: "bar"
    };

    ReactDOM.render(<Bar data={data} options={options} />, document.getElementById('graphDiv'));
  }
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
  addClassToElement,
  hideElement,
  showHiddenElement,
  setRefereeIncluded,
  showCountdown,
  toggleGraphs,
}
