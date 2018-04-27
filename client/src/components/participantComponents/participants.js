import React from 'react';
import ElementHelper from '../../helpers/elementsHelper';

export default class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {numberOfParticipants:2, participants:['Hans', 'Bob']}
  }
    render() {
      return(
        <div>
          <ParticipantsRadio participants={this.props.participantNames} />
        </div>
      );
    }
}

class ParticipantsRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state={selectedOption:this.props.selectedOption}
  }

  render() {
    var participantRadios = [];
    var selectedOption = this.state.selectedOption;
    var onOptionChange = this.onOptionChange.bind(this);
    var onAddBank = this.onAddBank.bind(this);
    var onDrink = this.onDrink.bind(this);
    this.props.participants.map(function(participantName, index) {
        participantRadios.push(<div className='radio' key={index}>
          <label>
            <input type='radio' value={participantName} key={index} checked={selectedOption === participantName} onChange={onOptionChange} />
            {participantName}
            <input type='text' key={'status'+index} id={'status'+index} ref={'status'+index} readOnly />
            <input type="button" key={'drink'+index} id={'drink'+index} value='Skål' onClick={onDrink}/>
            <input type='button' key={'addBank'+index} id={'addBank'+index} value='Sæt i banken' onClick={onAddBank}/>
            <input type="text" key={'bank'+index} id={'bank'+index} readOnly />
          </label>
        </div>);
        return participantRadios;
    });

    return (
      <form className='leftCol'>
        {participantRadios}
      </form>
    );
  }

  onOptionChange(e) {
    this.setState({selectedOption:e.target.value})
  }

  onAddBank(e) {
    var index = e.target.id.substring(7);
    var status = ElementHelper.getStatus(index);
    var currBank = ElementHelper.getBank(index);

    var statusValue = parseInt(status.value, 10) || 0;
    var currBankValue =  parseInt(currBank.value, 10) || 0;
    var newBank = statusValue + currBankValue;
    currBank.value = newBank;
    this.clearElementValue(status);
  }

  clearElementValue(element) {
    element.value = null;
  }

  onDrink(e) {
    var index = e.target.id.substring(5);
    var status = ElementHelper.getStatus(index);
    this.clearElementValue(status);
    status.value = '';
  }
}
