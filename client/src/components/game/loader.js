import React from 'react';
import Connector from '../../helpers/connector';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {gameId: null,};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({gameId: event.target.value});
  }

  handleSubmit(e) {
    //var gameId = this.state.gameId;
    e.preventDefault();
    console.log(this.state.gameId);
    var bum = Connector.loadGame(this.state.gameId); //.then(res => console.log(res));
    console.log(bum);
    //this.props.addParticipant(newName);
    //this.setState({value:''});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <input id='gameIdInput' type='text' onChange={this.handleChange} placeholder='Game ID' />
          <input type="submit" value="Load game ID" />
      </form>
    );
  }
}
