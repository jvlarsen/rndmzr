import React from 'react';

export default class ParticipantAdder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: '',};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      var newName = this.state.value;
      event.preventDefault();

      var participant = {'Name': newName, 'AllocationKey': null};

      this.props.addParticipant(participant);
      this.setState({value:''});
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <input id='participantNameInput' type='text' value={this.state.value} onChange={this.handleChange} placeholder='Deltagernavn' />
            <input type="submit" value="Opret ny deltager" />
        </form>
      );
    }
  }
