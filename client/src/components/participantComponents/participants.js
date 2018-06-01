import React from 'react';
import ElementHelper from '../../helpers/elementsHelper';
import Bank from '../bankComponents/bank';

export default class Participants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {numberOfParticipants:2, participants:['Hans', 'Bob']}
  }
    render() {
      return(
        <div className='bank' id="participantsGrid">
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
    var onDrink = this.onDrink.bind(this);
    this.props.participants.map(function(participantName, index) {
        participantRadios.push(<div className='participant' participantNumber={index} key={index}>
          <label>
            {participantName}
            <input type='text' key={'status'+index} id={'status'+index} numericvalue='0' ref={'status'+index} readOnly />
            <input type="button" key={'drink'+index} id={'drink'+index} value='Skål' onClick={onDrink}/>
            <Bank index={index}/>
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
    this.setState({selectedOption:e.target.value});
  }

  onAddBank(e) {

    var index = e.target.id.substring(7);
    var status = ElementHelper.getStatus(index);
    var currBank = ElementHelper.getBank(index);
    var statusValue = parseInt(status.numericvalue, 10) || 0;
    var currBankValue =  parseInt(currBank.value, 10) || 0;
    var newBank = statusValue + currBankValue;
    currBank.value = newBank;
    this.clearElementValue(status);
  }

  clearElementValue(element) {
    element.value = null;
    element.numericvalue = null;
  }

  onDrink(e) {
    var index = e.target.id.substring(5);
    var status = ElementHelper.getStatus(index);
    this.clearElementValue(status);
    status.value = '';
  }

  onDrinkBank(e) {
    var index = e.target.id.substring(9);
    var currBank = ElementHelper.getBank(index);
    var walterCount = ElementHelper.getWalterCount(index);
    this.clearElementValue(currBank);
  }
}
