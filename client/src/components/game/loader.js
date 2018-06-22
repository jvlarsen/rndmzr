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

    var loadedDataSets = Connector.loadDataSets(this.state.gameId);
    var loadedParticipants = Connector.loadParticipants(this.state.gameId);
    var gameDataLoaded = this.props.gameDataLoaded;
    Promise.all([loadedDataSets, loadedParticipants]).then(function(values) {
      gameDataLoaded(values);
    })
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <input id='gameIdInput' type='text' onChange={this.handleChange} placeholder='Game ID' />
            <input type="submit" value="Load game ID" />
            <label id="formLabel">{this.state.formLabel}</label>
        </form>

    );
  }
}
