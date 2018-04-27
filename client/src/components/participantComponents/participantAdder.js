import React from 'react';

export default class ParticipantAdder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      var newName = this.state.value;
      event.preventDefault();
      this.props.addParticipant(newName);
      this.setState({value:''});
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <input type='text' value={this.state.value} onChange={this.handleChange} placeholder='Deltagernavn'/>
            <input type="submit" value="Opret ny deltager" />
        </form>
      );
    }
  }
