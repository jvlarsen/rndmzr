import React from 'react';
import Connector from '../../helpers/connector';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gameId: null, formLabel:"", loadedParticipants:[]};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({gameId: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    var loadedGame = Connector.loadGame(this.state.gameId);
    loadedGame.then(res => this.props.participantsWereLoaded(res));
    //loadedGame.dataSets.then(res => this.props.dataSetsWereLoaded(res));


    //Connector.loadDataSets(this.state.gameId).then(res =>
    //  this.props.dataSetsWereLoaded(res));
    //this.buildGameDataDTO(loadedParticipantNames, loadedDataSets);
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
          <input id='gameIdInput' type='text' onChange={this.handleChange} placeholder='Game ID' />
          <input type="submit" value="Load game ID" />
          <label id="formLabel">{this.state.formLabel}</label>
      </form>

      </div>
    );
  }
}
