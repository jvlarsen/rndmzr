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
          <ParticipantsRadio participants={this.props.participants} />
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
    var participants = [];
    var onDrink = this.onDrink.bind(this);
    var participantProps = this.props.participants;

      for (var i = 0; i < Object.keys(participantProps).length; i++) {
        participants.push(<div className='participant' participantnumber={i} key={i}>
            <span>{participantProps[i].Name}
            <input type='text' key={'status'+i} id={'status'+i} numericvalue='0' ref={'status'+i} allocationkey={participantProps[i].AllocationKey} readOnly />
            <input type="button" key={'drink'+i} id={'drink'+i} value='Skål' onClick={onDrink}/>
            <Bank index={i} className="right"/>
            </span>
        </div>);
    };

    return (
      <form className='leftCol'>
        {participants}
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
    this.clearElementValue(currBank);
  }
}
