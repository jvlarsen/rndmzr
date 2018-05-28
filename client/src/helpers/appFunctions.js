const onClickRandomize = (e) => {
  /*var selectedEvent = (this.state.selectedEvent) ? this.state.selectedEvent.value : null;

  var selectedPlayer = document.getElementById('refereeName');
  if (!this.state.refereeSelected) {
    selectedPlayer = this.state.selectedPlayer;
  }

  if (!selectedEvent || !selectedPlayer) {return;}

  this.setState(prevState => ({
    labels: [...prevState.labels, selectedEvent] //newLabel kan udskiftes med selectedEvent for at se hændelsen i bunden.
  }))
  var randomizerResult = Engine.randomize(selectedPlayer, this.state.selectedEvent, this.state.participantNames.length);
  this.updateWhatToDrink(randomizerResult);
  */
}

const getSelectedEvent = (state) => {
  return (state.selectedEvent) ? state.selectedEvent.value : null;
}

const getSelectedPlayer = (state) => {
  return state.refereeSelected ? document.getElementById('refereeName') : state.selectedPlayer;
}

export default {
  onClickRandomize,
  getSelectedEvent,
  getSelectedPlayer,
}